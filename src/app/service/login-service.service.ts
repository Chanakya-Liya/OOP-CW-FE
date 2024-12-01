import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { loginUser } from '../models/loginUser.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  
  constructor(private http: HttpClient, private router: Router) {}
    apiUrl = 'http://localhost:8030/user';


    getLogin(loginUser: loginUser) {
      return this.http.post(this.apiUrl+'/login' , loginUser, {responseType: 'text'});
    }

    handleLoginResponse(response: any): any {
      if (response === 'Customer') {
        this.router.navigate(['/customer']);  // Redirect to Customer route
      } else if (response === 'Vendor') {
        this.router.navigate(['/vendor']);    // Redirect to Vendor route
      } else {
        this.router.navigate(['']);   // Redirect to Invalid route
      }
    }
}
