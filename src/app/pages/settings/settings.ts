import {
  Component,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings implements OnInit {

  constructor(
  private cdr: ChangeDetectorRef,
  private userService: UserService,
  private router: Router
) {}

  // ==========================================
  // Toast Notification
  // ==========================================

  showToast = false;

  showLogoutPopup = false;

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

  // ==========================================
  // Profile
  // ==========================================

  fullName = '';

  email = '';

  phone = '';

  designation = '';

  // ==========================================
  // Security
  // ==========================================

  currentPassword = '';

  newPassword = '';

  confirmPassword = '';

  // ==========================================
  // Init
  // ==========================================

  ngOnInit(): void {

    this.loadProfile();
    

  }

  // ==========================================
  // Load Profile
  // ==========================================

  loadProfile(): void {

    this.userService.getProfile().subscribe({

      next: (response: any) => {

        const user = response.data;

        this.fullName = user.fullName;

        this.email = user.email;

        this.phone = user.phone;

        this.designation = user.role;

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error(error);

        this.openToast(
          'Failed to load profile.',
          'error'
        );

      }

    });

  }

  // ==========================================
  // Save Profile
  // ==========================================

  saveProfile(): void {

    const payload = {

      fullName: this.fullName,

      email: this.email,

      phone: this.phone

    };

    this.userService.updateProfile(payload).subscribe({

      next: (response: any) => {

        const user = response.data;

        this.fullName = user.fullName;

        this.email = user.email;

        this.phone = user.phone;

        this.designation = user.role;

        this.openToast(
          'Profile updated successfully.',
          'success'
        );

      },

      error: (error) => {

        console.error(error);

        this.openToast(
          error.error?.message ||
          'Failed to update profile.',
          'error'
        );

      }

    });

  }

  // ==========================================
  // Change Photo
  // ==========================================

  changePhoto(): void {

    this.openToast(
      'Profile photo upload will be added soon.',
      'success'
    );

  }

    // ==========================================
// Update Password
// ==========================================

updatePassword(): void {

  if (!this.currentPassword.trim()) {

    this.openToast(
      'Please enter your current password.',
      'error'
    );

    return;

  }

  if (!this.newPassword.trim()) {

    this.openToast(
      'Please enter a new password.',
      'error'
    );

    return;

  }

  if (!this.confirmPassword.trim()) {

    this.openToast(
      'Please confirm your password.',
      'error'
    );

    return;

  }

  if (this.newPassword !== this.confirmPassword) {

    this.openToast(
      'Passwords do not match.',
      'error'
    );

    return;

  }

  if (this.currentPassword === this.newPassword) {

    this.openToast(
      'New password cannot be the same as the current password.',
      'error'
    );

    return;

  }

  this.userService.changePassword({

    currentPassword: this.currentPassword,

    newPassword: this.newPassword

  }).subscribe({

    next: () => {

      this.currentPassword = '';

      this.newPassword = '';

      this.confirmPassword = '';

      this.openToast(
        'Password changed successfully.',
        'success'
      );

    },

    error: (error) => {

      this.openToast(
        error.error?.message ||
        'Failed to change password.',
        'error'
      );

    }

  });

}


  // ==========================================
// Logout
// ==========================================

logout(): void {

  this.showLogoutPopup = true;

}

cancelLogout(): void {

  this.showLogoutPopup = false;

}

confirmLogout(): void {

  localStorage.removeItem('token');
  localStorage.removeItem('user');

  this.showLogoutPopup = false;

  this.router.navigate(['/login']);

}

}