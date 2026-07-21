import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './employee-profile.html',
  styleUrl: './employee-profile.scss'
})
export class EmployeeProfile implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  // =====================================================
  // Toast
  // =====================================================

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

  // =====================================================
  // Logout Popup
  // =====================================================

  showLogoutPopup = false;

  // =====================================================
  // Editable Fields
  // =====================================================

  fullName = '';

  email = '';

  phone = '';

  // =====================================================
  // Read Only Fields
  // =====================================================

  employeeId = '';

  department = '';

  designation = '';

  manager = '';

  role = '';

  status = '';

  profileImage = '';

  // =====================================================
  // Password
  // =====================================================

  currentPassword = '';

  newPassword = '';

  confirmPassword = '';

  // =====================================================
  // Loading
  // =====================================================

  loading = false;

  saving = false;

  changingPassword = false;

  // =====================================================
  // Init
  // =====================================================

  ngOnInit(): void {

    this.loadProfile();

  }

  // =====================================================
  // Load Profile
  // =====================================================

  loadProfile(): void {

    this.loading = true;

    this.userService.getProfile().subscribe({

      next: (response: any) => {

        const user = response.data;

        this.fullName = user.fullName || '';

        this.email = user.email || '';

        this.phone = user.phone || '';

        this.employeeId = user.employeeId || '';

        this.department = user.department || '';

        this.designation = user.designation || '';

        this.role = user.role || '';

        this.status = user.isActive
          ? 'Active'
          : 'Inactive';

        this.manager = user.manager?.fullName || 'Not Assigned';

        this.profileImage =
          user.profileImage?.url || '';

        this.loading = false;

        this.cdr.detectChanges();

      },

      error: (error: any) => {

        console.error(error);

        this.loading = false;

        this.openToast(
          'Failed to load profile.',
          'error'
        );

      }

    });

  }

  // =====================================================
  // Save Profile
  // =====================================================

  saveProfile(): void {

    this.saving = true;

    const payload = {

      fullName: this.fullName,

      email: this.email,

      phone: this.phone

    };

    this.userService.updateProfile(payload)
      .subscribe({

        next: (response: any) => {

          const user = response.data;

          this.fullName = user.fullName;

          this.email = user.email;

          this.phone = user.phone;

          this.saving = false;

          this.openToast(
            'Profile updated successfully.',
            'success'
          );

        },

        error: (error: any) => {

          this.saving = false;

          this.openToast(

            error.error?.message ||

            'Failed to update profile.',

            'error'

          );

        }

      });

  }

  // =====================================================
  // Change Photo
  // =====================================================

  changePhoto(): void {

    this.openToast(
      'Profile photo upload will be available soon.',
      'success'
    );

  }

  // =====================================================
  // Update Password
  // =====================================================

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
        'Please enter your new password.',
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
        'New password cannot be same as current password.',
        'error'
      );

      return;

    }

    this.changingPassword = true;

    this.userService.changePassword({

      currentPassword: this.currentPassword,

      newPassword: this.newPassword

    }).subscribe({

      next: () => {

        this.currentPassword = '';

        this.newPassword = '';

        this.confirmPassword = '';

        this.changingPassword = false;

        this.openToast(
          'Password changed successfully.',
          'success'
        );

      },

      error: (error: any) => {

        this.changingPassword = false;

        this.openToast(

          error.error?.message ||

          'Failed to change password.',

          'error'

        );

      }

    });

  }

  // =====================================================
  // Logout
  // =====================================================

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