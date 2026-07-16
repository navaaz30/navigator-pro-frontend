import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { UserService } from '../../services/user.service';

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
export class Users implements OnInit {

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  // ==========================================
  // Search
  // ==========================================

  searchText = '';

  // ==========================================
  // Popup Controls
  // ==========================================

  showForm = false;
  showDeletePopup = false;
  isViewMode = false;
  isEditMode = false;
  isManagerMode = false;

  validationError = '';

  selectedUser: any = null;

  userToDelete: any = null;

  showViewModal = false;

  // ==========================================
  // Users List
  // ==========================================

  users: any[] = [];
managers: any[] = [];

departments: string[] = [
  'Electrical',
  'Mechanical',
  'Civil',
  'Safety'
];

  // ==========================================
  // Form Model
  // ==========================================

  newUser: any = {
    fullName: '',
    email: '',
    phone: '',
    employeeId: '',
    department: '',
    designation: '',
    role: 'EMPLOYEE',
    manager: '',
    isActive: true,
    password: ''
  };

  // ==========================================
  // Init
  // ==========================================

  ngOnInit(): void {

    this.loadUsers();

  }

  // ==========================================
  // Load Users
  // ==========================================

  loadUsers(): void {

  this.userService.getUsers().subscribe({

    next: (response: any) => {

      this.users = response.data;

      // Keep only managers for the dropdown
      this.managers = this.users.filter(
        (user: any) => user.role === 'MANAGER'
      );

      this.cdr.detectChanges();

    },

    error: (error) => {

      console.error(error);

    }

  });

  

}
  // ==========================================
  // Search Filter
  // ==========================================

  get filteredUsers(): any[] {

    return this.users.filter((user: any) => {

      const keyword = this.searchText.toLowerCase();

      return (

        user.fullName?.toLowerCase().includes(keyword) ||

        user.employeeId?.toLowerCase().includes(keyword) ||

        user.email?.toLowerCase().includes(keyword) ||

        user.role?.toLowerCase().includes(keyword) ||

        user.department?.toLowerCase().includes(keyword)

      );

    });

  }

  // ==========================================
  // Open Add User
  // ==========================================

  openAddForm(role: 'EMPLOYEE' | 'MANAGER'): void {

    this.isEditMode = false;
    this.isViewMode = false;
    this.validationError = '';

    this.isManagerMode = role === 'MANAGER';

    this.newUser = {

      fullName: '',
      email: '',
      phone: '',
      employeeId: '',
      department: '',
      designation: '',
      role: role,
      manager: '',
      isActive: true,
      password: ''

    };

    this.showForm = true;

}

    // ==========================================
  // Save User
  // ==========================================

  saveUser(): void {

    this.validationError = '';

    if (
      !this.newUser.fullName ||
      !this.newUser.email ||
      !this.newUser.phone ||
      !this.newUser.department ||
      !this.newUser.designation ||
      !this.newUser.employeeId
    ) {

      this.validationError = 'Please fill all required fields.';

      return;

    }

    if (
    this.newUser.role === 'EMPLOYEE' &&
    !this.newUser.manager
) {
    this.validationError = 'Please select a manager.';
    return;
}

    if (this.isEditMode) {

  // Managers and Admins should never have a manager
  if (this.newUser.role !== 'EMPLOYEE') {
    this.newUser.manager = null;
  }

  this.userService.updateUser(

    this.newUser._id,

    this.newUser

  ).subscribe({

        next: () => {

          this.closeForm();

          this.loadUsers();

        },

        error: (error) => {

          console.error(error);

        }

      });

    }

    else {

    if (this.newUser.role !== 'EMPLOYEE') {

        this.newUser.manager = null;

    }

    this.userService.createUser(
        this.newUser
    

      ).subscribe({

        next: () => {

          this.closeForm();

          this.loadUsers();

        },

        error: (error) => {

          console.error(error);

        }

      });

    }

    

  }

  // ==========================================
  // View User
  // ==========================================

  viewUser(user: any): void {

  this.selectedUser = user;

  this.showViewModal = true;

}

closeViewModal(): void {

  this.showViewModal = false;

  this.selectedUser = null;

}

  // ==========================================
  // Edit User
  // ==========================================

  editUser(user: any): void {

    this.isViewMode = false;

    this.isEditMode = true;

    this.validationError = '';

    this.selectedUser = user;

    this.newUser = {

    ...user,

    manager: user.manager?._id || ''

};

    this.showForm = true;

  }

  // ==========================================
  // Delete User
  // ==========================================

  deleteUser(user: any): void {

    this.selectedUser = user;
    this.showDeletePopup = true;

  }

  // ==========================================
  // Confirm Delete
  // ==========================================

  confirmDelete(): void {

  if (!this.selectedUser) return;

  this.userService.deleteUser(this.selectedUser._id).subscribe({

    next: () => {

      this.cancelDelete();

      this.loadUsers();

    },

    error: (error) => {

      console.error(error);

    }

  });

}

  // ==========================================
  // Change Status
  // ==========================================

  changeStatus(user: any): void {

    this.userService.changeStatus(

      user._id,

      !user.isActive

    ).subscribe({

      next: () => {

        this.loadUsers();

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  // ==========================================
  // Cancel Delete
  // ==========================================

  cancelDelete(): void {

    this.showDeletePopup = false;

    this.userToDelete = null;

    this.selectedUser = null;

  }

  // ==========================================
  // Close Form
  // ==========================================

  closeForm(): void {

    this.showForm = false;

    this.validationError = '';

    this.isEditMode = false;

    this.isViewMode = false;

    this.selectedUser = null;

    this.newUser = {

      fullName: '',
      email: '',
      phone: '',
      employeeId: '',
      department: '',
      designation: '',
      role: 'EMPLOYEE',
      manager:'',
      isActive: true,
      password: ''

    };

  }

}