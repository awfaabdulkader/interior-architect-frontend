import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../model/project.model';
import { CommonModule, SlicePipe } from '@angular/common';
import { ApiService } from '../../../../services/api.service';
import { category } from '../../../../model/category.model';
import { ConfirmDeleteComponent } from '../../../shared/confirm-delete/confirm-delete.component';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-all-projects',
  standalone: true,
  imports: [CommonModule, ConfirmDeleteComponent, RouterModule],
  templateUrl: './all-projects.component.html',
  styleUrl: './all-projects.component.css'
})
export class AllProjectsComponent implements OnInit {
  projects: Project[] = [];
  selectedImages: string[] = [];
  expandedDescriptions: Set<number> = new Set();
  // Modal properties
  showModal: boolean = false;
  modalImages: string[] = [];
  currentImageIndex: number = 0;
  showModalDelete: boolean = false;


  categories: category[] = [];
  deleteId: number | null = null;

  constructor(private apiservice: ApiService, private router: Router
  ) { }
  editProject(projectId: number) {
    this.router.navigate(['/admin/edit/project', projectId]);
  }

  ngOnInit(): void {
    this.apiservice.getCategories().subscribe
      ({
        next: (response) => {
          this.categories = response.categories; // Assuming API returns {categories: Category[]}
        },
        error: (error) => console.error('Error loading categories:', error)
      });

    this.loadProjects();
  }

  loadProjects() {
    this.apiservice.getProjects().subscribe({
      next: (response) => {
        // Transform the data to match your interface
        this.projects = response.projects.map((project: any) => ({
          ...project,
          image_url: project.images ? project.images.map((img: any) => img.image_url) : []
        }));

        console.log('Transformed projects:', this.projects); // Debug
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
      }
    });
  }
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Catégorie inconnue';
  }
  showImages(images: { image_url: File }[]) {
    this.modalImages = images.map(img => `https://interior-architect-backend-main-36p6qz.laravel.cloud/api/images/${img.image_url}`);
    this.currentImageIndex = 0;
    this.showModal = true;
    console.log('Modal images:', this.modalImages);
  }
  isDescriptionExpanded(index: number): boolean {
    return this.expandedDescriptions.has(index);
  }

  // Modal control methods
  closeModal() {
    this.showModal = false;
    this.modalImages = [];
    this.currentImageIndex = 0;
  }
  nextImage() {
    if (this.currentImageIndex < this.modalImages.length - 1) {
      this.currentImageIndex++;
    }
  }
  toggleDescription(index: number): void {
    if (this.expandedDescriptions.has(index)) {
      this.expandedDescriptions.delete(index);
    } else {
      this.expandedDescriptions.add(index);
    }
  }
  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  goToImage(index: number) {
    this.currentImageIndex = index;
  }

  getShortDescription(desc: string): string {
    if (desc.length > 100) {
      return desc.slice(0, 100) + '...';
    }
    return desc;
  }

  getImageUrl(imageFile: File): string {
    return URL.createObjectURL(imageFile);
  }

  openDeleteModal(id: number) {
    this.deleteId = id;
    this.showModalDelete = true;
  }

  confirmDelete() {
    if (this.deleteId !== null) {
      this.apiservice.deleteProject(this.deleteId).subscribe
        ({
          next: () => {
            this.projects = this.projects.filter(p => p.id !== this.deleteId);
            this.showModalDelete = false
            this.deleteId = null;


            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Projet supprimé avec succès!"
            });

          },
          error: (err) => {
            console.error('Error deleting project:', err);
            this.showModalDelete = false;
            this.deleteId = null;
          }
        });

    }
  }

  cancelDelete() {
    this.showModalDelete = false;
    this.deleteId = null
  }

}
