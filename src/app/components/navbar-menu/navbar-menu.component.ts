import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar-menu',
  imports: [NgIf],
  templateUrl: './navbar-menu.component.html',
  styleUrl: './navbar-menu.component.css'
})
export class NavbarMenuComponent {
  @Input() isMenuVisible: boolean = false; 
  @Output() menuClosed = new EventEmitter<void>(); 

  constructor(private router: Router) {}

  goToSettings(): void {
    this.menuClosed.emit();
    this.router.navigate(['/settings']);
  }

  goToProfile(): void {
    this.menuClosed.emit();
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.menuClosed.emit(); 
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    console.log('User logged out');
    this.router.navigate(['/']); 
  }
}
