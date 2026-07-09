import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface User {
  id: number;
  name: string;
  phone: string;
  department: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {

  // ==========================
  // Search
  // ==========================

  searchText = '';

  // ==========================
  // Popup Controls
  // ==========================

  showForm = false;
  showDeletePopup = false;
  isViewMode = false;
  isEditMode = false;

  validationError = '';

  selectedUserId: number | null = null;

  // ==========================
  // User List
  // ==========================

  users: User[] = [

    {
      id: 1,
      name: 'Abhishek Singh',
      phone: '9876543210',
      department: 'Electrical',
      status: 'Active'
    },

    {
      id: 2,
      name: 'Rohit Sharma',
      phone: '9876501234',
      department: 'Mechanical',
      status: 'Active'
    },

    {
      id: 3,
      name: 'Sanjeev Kumar',
      phone: '9898989898',
      department: 'Civil',
      status: 'Inactive'
    }

  ];

  // ==========================
  // Form Model
  // ==========================

  newUser: User = {
    id: 0,
    name: '',
    phone: '',
    department: '',
    status: 'Active'
  };

  // ==========================
  // Search Filter
  // ==========================

  get filteredUsers(): User[] {

    return this.users.filter(user =>

      user.name.toLowerCase().includes(this.searchText.toLowerCase()) ||

      user.phone.includes(this.searchText) ||

      user.department.toLowerCase().includes(this.searchText.toLowerCase())

    );

  }

  // ==========================
  // Open Add Form
  // ==========================

  openAddForm(): void {

    this.isEditMode = false;
    this.isViewMode = false;

    this.validationError = '';

    this.newUser = {

      id: this.users.length + 1,

      name: '',

      phone: '',

      department: '',

      status: 'Active'

    };

    this.showForm = true;

  }

  // ==========================
  // Save User
  // ==========================

  saveUser(): void {

   if (
  !this.newUser.name.trim() ||
  !this.newUser.phone.trim() ||
  !this.newUser.department.trim()
) {
  this.validationError = 'Please fill all required fields.';
  return;
}

// Phone number validation
const phonePattern = /^[0-9]{10}$/;

if (!phonePattern.test(this.newUser.phone)) {
  this.validationError = 'Phone number must contain exactly 10 digits.';
  return;
}

// Clear validation if everything is correct
this.validationError = '';

    this.validationError = '';

    if (this.isEditMode) {

      const index = this.users.findIndex(
        u => u.id === this.newUser.id
      );

      if (index !== -1) {

        this.users[index] = { ...this.newUser };

      }

    }

    else {

      this.users.push({ ...this.newUser });

    }

    this.closeForm();

  }

  // ==========================
  // View User
  // ==========================

  viewUser(user: User): void {

    this.isViewMode = true;

    this.isEditMode = false;

    this.validationError = '';

    this.newUser = { ...user };

    this.showForm = true;

  }

  // ==========================
  // Edit User
  // ==========================

  editUser(user: User): void {

    this.isViewMode = false;

    this.isEditMode = true;

    this.validationError = '';

    this.newUser = { ...user };

    this.showForm = true;

  }

  // ==========================
  // Delete Popup
  // ==========================

  deleteUser(user: User): void {

    this.selectedUserId = user.id;

    this.showDeletePopup = true;

  }

  confirmDelete(): void {

    if (this.selectedUserId !== null) {

      this.users = this.users.filter(
        user => user.id !== this.selectedUserId
      );

    }

    this.cancelDelete();

  }

  cancelDelete(): void {

    this.showDeletePopup = false;

    this.selectedUserId = null;

  }

  // ==========================
  // Close Form
  // ==========================

  closeForm(): void {

    this.showForm = false;

    this.validationError = '';

  }

}