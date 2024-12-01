import { Routes } from '@angular/router';


export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    loadComponent:() => {
        return import('./pages/login/login.component').then(m => m.LoginComponent);
    },
    },{
    path: 'customer',
    loadComponent:() => {
        return import('./pages/customer/customer.component').then(m => m.CustomerComponent);
    }
    },{
        path: 'vendor',
        loadComponent:() => {
            return import('./pages/login/login.component').then(m => m.LoginComponent);
        }
    },{
        path: 'invalid',
        loadComponent:() => {
            return import('./pages/login/login.component').then(m => m.LoginComponent);
        }
        }
];
