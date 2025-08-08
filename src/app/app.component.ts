import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./user/components/header/header.component";
import { ProfileComponent } from "./user/components/profile/profile.component";
import { ServicesPageComponent } from "./user/pages/services-page/services-page.component";
import { ExperienceComponent } from "./user/pages/experience/experience.component";
import { SkillsComponent } from './user/skills/skills.component';
import { RacentprojectsComponent } from "./user/pages/racentprojects/racentprojects.component";
import { WorkwithusComponent } from "./user/pages/workwithus/workwithus.component";
import { ContactComponent } from "./user/components/contact/contact.component";
import { FooterComponent } from './user/components/footer/footer.component';
import { HomeComponent } from "./user/pages/home/home.component";
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule, HeaderComponent, ProfileComponent, ServicesPageComponent, ExperienceComponent, SkillsComponent, RacentprojectsComponent, WorkwithusComponent, ContactComponent, FooterComponent, HomeComponent],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
}
