import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit {
   categoryForm!: FormGroup;
  categoryId!: number;
  loading = false;

  constructor(
    private fb: FormBuilder, 
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.categoryId = this.route.snapshot.params['id'];
    this.loadCategoryData();
  }

  loadCategoryData(): void {
    this.loading = true;
    this.api.getCategoryById(this.categoryId).subscribe({
      next: (res: any) => {
        console.log('API Response:', res); // Debug log
        
        // Handle different possible response structures
        let categoryData = null;
        
        if (res && res.category) {
          // Structure: {message: '...', category: {id: x, name: 'name'}}
          categoryData = res.category;
        } else if (res && res.name) {
          // Structure: {id: x, name: 'name'}
          categoryData = res;
        } else if (res && res.data && res.data.name) {
          // Structure: {data: {id: x, name: 'name'}}
          categoryData = res.data;
        }
        
        if (categoryData && categoryData.name) {
          // Use patchValue to populate form with existing data
          this.categoryForm.patchValue({
            name: categoryData.name
          });
        } else {
          console.error('Invalid response structure:', res);
          Swal.fire({
            title: 'Error',
            text: 'Invalid data format received.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading category:', error);
        this.loading = false;
        Swal.fire({
          title: 'Error',
          text: 'Failed to load category data.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const data = this.categoryForm.value;
    this.loading = true;
    
    // Call update API - matches your Laravel controller update method
    this.api.updateCategory(this.categoryId, { name: data.name }).subscribe({
      next: (res) => {
        console.log('Category updated successfully:', res);
        this.loading = false;
        Swal.fire({
          title: 'Success',
          text: 'Category updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/admin/list/categories']);
        });
      },
      error: (error: any) => {
        console.error('Error updating category:', error);
        this.loading = false;
        Swal.fire({
          title: 'Error',
          text: 'Failed to update category. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  // Reset form to original values using patchValue
  resetForm(): void {
    this.loadCategoryData();
  }

  // Cancel and go back
  onCancel(): void {
    this.router.navigate(['/categories']);
  }
}
