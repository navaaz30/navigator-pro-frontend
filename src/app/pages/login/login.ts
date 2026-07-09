import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  hidePassword = true;

  loginForm!: FormGroup;

  constructor(
  private fb: FormBuilder,
  private authService: AuthService,
  private router: Router
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

this.router.navigate(['/dashboard']);

    },

    error: (err) => {

      console.error(err);

      alert(
        err.error?.message || 'Invalid email or password'
      );

    }

  });

}

}