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
        import('./pages/login/login.component').then((m) => m.LoginComponent),
      canActivate: [AuthGuard], // Protect the route
    },
    {
      path: 'invalid',
      loadComponent: () =>
        import('./pages/login/login.component').then((m) => m.LoginComponent),
    },
  ];
