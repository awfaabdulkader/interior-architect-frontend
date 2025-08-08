import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../../../model/skills.model';
import { ApiService } from '../../../../services/api.service';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-all-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-skills.component.html',
  styleUrl: './all-skills.component.css'
})
export class AllSkillsComponent implements OnInit {
  skills: Skill[] = [];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getSkills();
  }

  getSkills(): void {
    this.api.getSkills().subscribe({
      next: (res: any) => {
        console.log('API response:', res);
        this.skills = res.skills ?? []; // ✅ اسحب skills من داخل الـ object
      },
      error: (err) => {
        console.error('Failed to load skills', err);
      }
    });

  }




  editskill(id: number) {
    this.router.navigate(['admin', 'edit', 'skill', id]);
  }

  deleteSkill(id: number) {
    Swal.fire
      ({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
        focusCancel: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.deleteSkill(id).subscribe({
            next: () => {
              Swal.fire('Deleted!', 'Your skill has been deleted.', 'success');
              this.loadskills();
            },
            error: (err) => {
              Swal.fire('Error!', 'There was an error deleting the skill.', 'error');
              console.error('Error deleting skill:', err);
            }
          });
        }
      });
  }

  loadskills() {
    this.api.getSkills().subscribe({
      next: (res: any) => {
        this.skills = res.skills; // ✅ matches the Laravel key
      },
      error: (err) => {
        console.error('Error fetching skills data:', err);
      }
    });
  }

  createSkill(): void {
    this.router.navigate(['/admin/add/skills']);
  }
}
