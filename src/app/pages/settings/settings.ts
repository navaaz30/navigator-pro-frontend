import {
  Component,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

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
export class Settings {

  constructor(private cdr: ChangeDetectorRef) {}

  // ==========================================
  // Toast Notification
  // ==========================================

  showToast = false;

  toastMessage = '';

  toastType: 'success' | 'error' = 'success';

private toastTimeout: any;

openToast(message: string, type: 'success' | 'error'): void {

  console.log('Toast Open');

  this.toastMessage = message;
  this.toastType = type;
  this.showToast = true;

  if (this.toastTimeout) {
    clearTimeout(this.toastTimeout);
  }

 this.toastTimeout = setTimeout(() => {

  console.log('Toast Close');

  this.showToast = false;

  this.cdr.detectChanges();

}, 3000);

}

  // ==========================================
  // Profile
  // ==========================================

  fullName = 'Abhishek Singh';

  email = 'admin@navigatorpro.com';

  phone = '+91 9876543210';

  designation = 'Super Admin';

  // ==========================================
  // Security
  // ==========================================

  currentPassword = '';

  newPassword = '';

  confirmPassword = '';

  // ==========================================
  // Company
  // ==========================================

  companyName = 'Navigator Pro Pvt Ltd';

  companyEmail = 'contact@navigatorpro.com';

  companyPhone = '+91 9876543210';

  website = 'www.navigatorpro.com';

  address = 'Chennai, Tamil Nadu, India';

  // ==========================================
  // Profile
  // ==========================================

  saveProfile(): void {

    console.log('Profile Updated');

    this.openToast(
      'Profile updated successfully.',
      'success'
    );

  }

  // ==========================================
  // Change Photo
  // ==========================================

  changePhoto(): void {

    this.openToast(
      'Photo upload will be connected to the backend later.',
      'success'
    );

  }

  // ==========================================
  // Password
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

    console.log('Password Updated');

    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';

    this.openToast(
      'Password updated successfully.',
      'success'
    );

  }

  // ==========================================
  // Company
  // ==========================================

  saveCompany(): void {

    console.log('Company Updated');

    this.openToast(
      'Company details updated successfully.',
      'success'
    );

  }

}