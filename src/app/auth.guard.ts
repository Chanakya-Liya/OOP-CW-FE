import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');

    if (token && (role === 'Customer' || role === 'Vendor' || role === 'Admin')) {
      return true; // Allow access
    } else {
      this.router.navigate(['']); // Redirect to login
      return false; // Block access
    }
  }
}