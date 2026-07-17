import {
  Component,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
  CommonModule,
  ReactiveFormsModule,
  MatIconModule
],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  hidePassword = true;

  loginForm!: FormGroup;

  // ==========================================
// Toast Notification
// ==========================================

showToast = false;

toastMessage = '';

toastType: 'success' | 'error' = 'success';

private toastTimeout: any;

openToast(
  message: string,
  type: 'success' | 'error'
): void {

  this.toastMessage = message;

  this.toastType = type;

  this.showToast = true;

  if (this.toastTimeout) {

    clearTimeout(this.toastTimeout);

  }

  this.toastTimeout = setTimeout(() => {

    this.showToast = false;

    this.cdr.detectChanges();

  }, 3000);

}

  constructor(
  private fb: FormBuilder,
  private authService: AuthService,
  private router: Router,
  private cdr: ChangeDetectorRef
) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  const { email, password } = this.loginForm.value;

  this.authService.login(email, password).subscribe({

    next: (response) => {

  console.log(response);

  // Save JWT Token
  localStorage.setItem(
    'token',
    response.data.token
  );

  // Save User Details
  localStorage.setItem(
    'user',
    JSON.stringify(response.data.user)
  );

  const role = response.data.user.role;

switch (role) {

  case 'ADMIN':
  case 'MANAGER':
    this.router.navigate(['/dashboard']);
    break;

  case 'EMPLOYEE':
    this.router.navigate(['/employee/dashboard']);
    break;

  default:
    this.openToast('Unknown user role.', 'error');
}

},

    error: (err) => {

  console.error(err);

  this.openToast(
    err.error?.message ||
    'Invalid email or password.',
    'error'
  );

}

  });

}

}