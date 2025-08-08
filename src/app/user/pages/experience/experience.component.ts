import { Component, OnInit } from '@angular/core';
import { Experience } from '../../../model/experience.model';
import { Education } from '../../../model/education.model';
import { ApiService } from '../../../services/api.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  educations: Education[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadExperiences();
    this.loadEducations();
  }

loadExperiences(): void {
  this.api.getExperiences().subscribe((res: any) => {
    this.experiences = res.experiences.sort((a: { currently_working: any; year_end: any; year_start: any; }, b: { currently_working: any; year_end: any; year_start: any; }) => {
      if (a.currently_working && !b.currently_working) return -1;
      if (!a.currently_working && b.currently_working) return 1;

      const dateA = new Date(a.year_end || a.year_start).getTime();
      const dateB = new Date(b.year_end || b.year_start).getTime();
      return dateB - dateA;
    });
  });
}


loadEducations(): void {
  this.api.getEducations().subscribe((res: any) => {
    console.log('Educations API response:', res);
    this.educations = (res.educations || res.education || []).sort((a: Education, b: Education) => {
      const endA = new Date(a.year_end || a.year_start).getTime();
      const endB = new Date(b.year_end || b.year_start).getTime();
      return endB - endA;
    });
  });
}

}
