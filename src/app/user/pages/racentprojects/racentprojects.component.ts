import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-racentprojects',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './racentprojects.component.html',
  styleUrl: './racentprojects.component.css'
})
export class RacentprojectsComponent implements OnInit {
  recentProjects: any[] = [];
  loading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadRecentProjects();
  }

  loadRecentProjects(): void {
    this.apiService.getProjects().subscribe({
      next: (data) => {
        // Get the 4 most recent projects
        this.recentProjects = data.projects.slice(0, 4);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading recent projects:', error);
        this.loading = false;
      }
    });
  }

  getImageUrl(imagePath: string): string {
    return `https://interior-architect-backend-main-36p6qz.laravel.cloud/api/images/${imagePath}`;
  }

  getFirstImage(project: any): string {
    if (project.images && project.images.length > 0) {
      return this.getImageUrl(project.images[0].image_url);
    }
    return ''; // Return empty string if no images
  }
}
