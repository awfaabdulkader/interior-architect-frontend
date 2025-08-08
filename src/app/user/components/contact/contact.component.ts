import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    website: '',
    message: ''
  };

  constructor(private http: HttpClient) { }

  onSubmit() {
    this.http.post('https://interior-architect-backend-main-36p6qz.laravel.cloud/api/contact', this.formData).subscribe({
      next: () => alert('Message sent successfully!'),
      error: () => alert('Failed to send message.')
    });
  }
}
