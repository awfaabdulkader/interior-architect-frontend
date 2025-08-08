import { Component , OnInit, signal, Signal} from '@angular/core';
import { Skill } from '../../model/skills.model';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
skills = signal<Skill[]>([]); // 🟢 Signal that holds all skills

constructor(private api: ApiService) { }

ngOnInit()
{
  this.loadSkills();
}

loadSkills(): void {
    this.api.getSkills().subscribe((res: any) => {
      this.skills.set(res.skills || []);
    });
  }
}
