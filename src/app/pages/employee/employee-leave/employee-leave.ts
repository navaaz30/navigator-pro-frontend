import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';

import {
  EmployeeLeaveService
} from '../../../services/employee-leave.service';

@Component({
  selector: 'app-employee-leave',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './employee-leave.html',
  styleUrl: './employee-leave.scss'
})
export class EmployeeLeave implements OnInit {

  constructor(
    private leaveService: EmployeeLeaveService,
    private cdr: ChangeDetectorRef
  ) {}

  // ==========================================
  // Search & Filters
  // ==========================================

  searchText = '';

  selectedStatus = '';

  // ==========================================
  // Popup Controls
  // ==========================================

  showForm = false;

  showViewModal = false;

  showDeleteModal = false;

  isEditMode = false;

  validationError = '';

  isSubmitting = false;

  // ==========================================
  // Data
  // ==========================================

  leaves: any[] = [];

  filteredLeavesList: any[] = [];

  selectedLeave: any = null;

  leaveToDelete: any = null;

  // ==========================================
  // Summary Cards
  // ==========================================

  summary = {

    total: 0,

    pending: 0,

    approved: 0,

    rejected: 0

  };

  // ==========================================
  // Leave Form
  // ==========================================

  newLeave: any = {

    _id: '',

    leaveType: '',

    startDate: '',

    endDate: '',

    reason: '',

    status: 'PENDING'

  };

  // ==========================================
  // Init
  // ==========================================

  ngOnInit(): void {

    this.loadLeaves();

  }

  // ==========================================
  // Load My Leaves
  // ==========================================

  loadLeaves(): void {

    this.leaveService
      .getMyLeaves()
      .subscribe({

        next: (response: any) => {

          this.leaves = response.data || [];

          this.filteredLeaves();

          this.calculateSummary();

          this.cdr.detectChanges();

        },

        error: (error: any) => {

          console.error(error);

        }

      });

  }

  // ==========================================
  // Summary Cards
  // ==========================================

  calculateSummary(): void {

    this.summary.total = this.leaves.length;

    this.summary.pending = this.leaves.filter(

      leave => leave.status === 'PENDING'

    ).length;

    this.summary.approved = this.leaves.filter(

      leave => leave.status === 'APPROVED'

    ).length;

    this.summary.rejected = this.leaves.filter(

      leave => leave.status === 'REJECTED'

    ).length;

  }

  // ==========================================
  // Search & Filter
  // ==========================================

  filteredLeaves(): void {

    this.filteredLeavesList = this.leaves.filter(leave => {

      const matchesSearch =

        leave.leaveId
          ?.toLowerCase()
          .includes(this.searchText.toLowerCase())

        ||

        leave.leaveType
          ?.toLowerCase()
          .includes(this.searchText.toLowerCase());

      const matchesStatus =

        this.selectedStatus === ''

        ||

        leave.status === this.selectedStatus;

      return matchesSearch && matchesStatus;

    });

  }

  onSearch(): void {

    this.filteredLeaves();

  }

  onStatusChange(): void {

    this.filteredLeaves();

  }

  // ==========================================
  // Open Apply Leave
  // ==========================================

  openApplyLeave(): void {

    this.isEditMode = false;

    this.validationError = '';

    this.newLeave = {

      _id: '',

      leaveType: '',

      startDate: '',

      endDate: '',

      reason: '',

      status: 'PENDING'

    };

    this.showForm = true;

  }

  // ==========================================
  // Edit Leave
  // ==========================================

  editLeave(leave: any): void {

    if (leave.status !== 'PENDING') {

      return;

    }

    this.isEditMode = true;

    this.validationError = '';

    this.newLeave = {

      ...leave,

      startDate: leave.startDate
        ? leave.startDate.split('T')[0]
        : '',

      endDate: leave.endDate
        ? leave.endDate.split('T')[0]
        : ''

    };

    this.showForm = true;

  }

  // ==========================================
  // View Leave
  // ==========================================

  viewLeave(leave: any): void {

    this.selectedLeave = leave;

    this.showViewModal = true;

  }

  closeViewModal(): void {

    this.selectedLeave = null;

    this.showViewModal = false;

  }

  // ==========================================
  // Continue in Part 2
  // ==========================================

    // ==========================================
  // Save Leave
  // ==========================================

  saveLeave(): void {

    this.validationError = '';

    if (this.isSubmitting) {

      return;

    }

    this.isSubmitting = true;

    if (

      !this.newLeave.leaveType ||

      !this.newLeave.startDate ||

      !this.newLeave.endDate ||

      !this.newLeave.reason

    ) {

      this.validationError =
        'Please fill all required fields.';

      this.isSubmitting = false;

      return;

    }

    const payload = {

      leaveType: this.newLeave.leaveType,

      startDate: this.newLeave.startDate,

      endDate: this.newLeave.endDate,

      reason: this.newLeave.reason

    };

    if (this.isEditMode) {

      this.leaveService
        .updateLeave(
          this.newLeave._id,
          payload
        )
        .subscribe({

          next: () => {

            this.isSubmitting = false;

            this.closeForm();

            this.loadLeaves();

          },

          error: (error: any) => {

            console.error(error);

            this.isSubmitting = false;

          }

        });

    }

    else {

      this.leaveService
        .applyLeave(payload)
        .subscribe({

          next: () => {

            this.isSubmitting = false;

            this.closeForm();

            this.loadLeaves();

          },

          error: (error: any) => {

            console.error(error);

            this.isSubmitting = false;

          }

        });

    }

  }

  // ==========================================
  // Delete Leave
  // ==========================================

  deleteLeave(leave: any): void {

    if (leave.status !== 'PENDING') {

      return;

    }

    this.leaveToDelete = leave;

    this.showDeleteModal = true;

  }

  confirmDelete(): void {

    if (!this.leaveToDelete) {

      return;

    }

    this.leaveService
      .deleteLeave(
        this.leaveToDelete._id
      )
      .subscribe({

        next: () => {

          this.cancelDelete();

          this.loadLeaves();

        },

        error: (error: any) => {

          console.error(error);

        }

      });

  }

  cancelDelete(): void {

    this.leaveToDelete = null;

    this.showDeleteModal = false;

  }

  // ==========================================
  // Close Form
  // ==========================================

  closeForm(): void {

    this.showForm = false;

    this.validationError = '';

    this.isEditMode = false;

    this.isSubmitting = false;

    this.newLeave = {

      _id: '',

      leaveType: '',

      startDate: '',

      endDate: '',

      reason: '',

      status: 'PENDING'

    };

  }

}