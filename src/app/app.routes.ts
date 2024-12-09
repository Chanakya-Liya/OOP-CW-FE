import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      loadComponent: () =>
        import('./pages/login/login.component').then((m) => m.LoginComponent),
    },
    {
      path: 'customer',
      loadComponent: () =>
        import('./pages/customer/customer.component').then((m) => m.CustomerComponent),
      canActivate: [AuthGuard], // Protect the route
    },
    {
      path: 'vendor',
      loadComponent: () =>
        import('./pages/vendor/vendor.component').then((m) => m.VendorComponent),
      canActivate: [AuthGuard], // Protect the route
    },
    {
      path: 'admin',
      loadComponent: () =>
        import('./pages/admin/admin.component').then((m) => m.AdminComponent),
      canActivate: [AuthGuard], // Protect the route
    },
    {
      path: 'event',
      loadComponent: () =>
        import('./pages/events/events.component').then((m) => m.EventsComponent),
      canActivate: [AuthGuard], // Protect the route
    },
    {
      path: 'profile',
      loadComponent: () =>
        import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
      canActivate: [AuthGuard], // Protect the route
    },
    {
      path: 'invalid',
      loadComponent: () =>
        import('./pages/login/login.component').then((m) => m.LoginComponent),
    },
  ];
