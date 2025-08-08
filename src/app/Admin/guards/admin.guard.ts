import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    console.log('Admin Guard - Checking authentication...');

    // Only check authentication for admin routes, not public routes
    const currentUrl = this.router.url;
    console.log('Current URL:', currentUrl);

    // If it's a public route, don't redirect
    if (!currentUrl.startsWith('/admin/') || currentUrl === '/admin/login') {
      console.log('Admin Guard - Public route, allowing access');
      return true;
    }

    if (this.auth.isLoggedIn()) {
      console.log('Admin Guard - User is authenticated, allowing access');
      return true;
    }

    console.log('Admin Guard - User not authenticated, redirecting to login');
    this.router.navigate(['/admin/login']);
    return false;
  }
}