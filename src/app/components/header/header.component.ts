import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarMenuComponent } from '../navbar-menu/navbar-menu.component';

@Component({
  selector: 'app-header',
  imports: [NgIf, NavbarMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  LogoUrl : string = '../../static/images/logo.png';
  isCustomerOrVendor: boolean = false;
  isMenuVisible: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.isCustomerOrVendor = currentRoute === '/customer' || currentRoute === '/vendor';
    });
  }

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
    console.log('Menu visibility:', this.isMenuVisible);
  }

  closeMenu(): void {
    this.isMenuVisible = false; // Close menu when child emits an event
  }
}
