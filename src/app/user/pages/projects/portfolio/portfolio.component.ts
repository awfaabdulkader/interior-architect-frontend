import { Component, OnInit } from '@angular/core';
import { category } from '../../../../model/category.model';
import { ApiService } from '../../../../services/api.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {
  categories: category[] = [];
  baseStorageUrl = 'https://interior-architect-backend-main-36p6qz.laravel.cloud/storage/'; // Fixed storage URL


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.api.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.categories;
      },
      error: (err: any) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  // Get full image URL
  getImageUrl(coverPath: string): string {
    if (!coverPath) return '';
    return this.baseStorageUrl + coverPath;
  }

}
