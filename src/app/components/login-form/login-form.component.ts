import { NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { loginUser } from '../../models/loginUser.model';
import { LoginServiceService } from '../../service/login-service.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxSpinner, NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, FormsModule, NgStyle, NgIf, MatProgressSpinnerModule, NgxSpinnerComponent],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  isSignIn: boolean = true; // Tracks the active tab
  signInForm: FormGroup;
  signUpForm: FormGroup;
  incorrect: boolean = false;


  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const form = control.parent;  
      if (!form) return null;  
      const password = form.get('password');  
      const confirmPassword = control;  
  
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { passwordMismatch: true };  
      }
      return null;  // Return null if passwords match
    };
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  isConfirmPasswordInvalid(): boolean {
    return (
      (this.confirmPassword?.invalid ?? false) && 
      ((this.confirmPassword?.touched ?? false) || (this.confirmPassword?.dirty ?? false))
    );
  }

  constructor(private fb: FormBuilder, private loginService: LoginServiceService, private spinner: NgxSpinnerService) {
    // Initialize forms
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator()]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  toggleTab(isSignInTab: boolean): void {
    this.isSignIn = isSignInTab;
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  onSignInSubmit(): void {
    if (this.signInForm.valid) {
      this.showSpinner(); // Show spinner
      const loginuser: loginUser = {
        email: this.signInForm.value.email,
        password: this.signInForm.value.password,
      };
      this.loginService.getLogin(loginuser).subscribe({
        next: (response) => {
          this.loginService.handleLoginResponse(response);
        },
        error: (error) => {
          console.log('Login failed', error);
          this.incorrect = true;
        },
      });
    } else {
      console.log('Sign In Form is invalid');
    }
  }

  onSignUpSubmit(): void {
    if (this.signUpForm.valid) {
      if (this.signUpForm.value.password === this.signUpForm.value.confirmPassword) {
        console.log('Sign Up Data:', this.signUpForm.value);
        // Add logic for sign-up process here
      } else {
        console.log('Passwords do not match');
      }
    } else {
      console.log('Sign Up Form is invalid');
    }
  }

  getInvalid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return control ? (control.invalid && control.touched) : false
    
  }

  getUsernameError(): string | null {
    const userName = this.signUpForm.get('username');
    if (userName?.hasError('minlength')) {
      return 'Username must be at least 3 characters long';
    }
    return null;
  }

  getPasswordError(form: FormGroup): string | null {
    const control = form.get('password');
    if (control?.hasError('minlength')) {
      return 'Password must be at least 6 characters long';
    }
    return null;
  }

  getConfirmPasswordError(): string | null {
    const confirmPassword = this.signUpForm.get('confirmPassword');
    if (confirmPassword?.value !== this.signUpForm.get('password')?.value && confirmPassword?.dirty) {
      return 'Passwords do not match';
    }
    return null;
  }

  getEmailError(form: FormGroup): string | null {
    const control = form.get('email');
    if (control?.hasError('email')) {
      return 'Please enter a valid email';
    }
    return null;
  }
}