import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { loginUser, registerUser } from '../models/user.model';
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

    getRegister(registerUser: registerUser) {
      return this.http.post(this.apiUrl+'/register' , registerUser, {responseType: 'text'});
    }

    handleLoginResponse(response: any): void {
      const responseObj = JSON.parse(response); // Parse the JSON response
      const role = responseObj.role;
      const token = responseObj.token;
      const id = responseObj.id;
    
      if (role && token) {
        // Store token in localStorage or sessionStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userId', id);
        // Redirect based on role
        if (role === 'Customer') {
          this.router.navigate(['/customer']);
        } else if (role === 'Vendor') {
          this.router.navigate(['/vendor']);
        }else if (role === 'Admin') {
          this.router.navigate(['/admin']);
        }
      } else {
        this.router.navigate(['']);
      }
    }
}
