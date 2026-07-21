import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';

import {
  LeaveService
} from '../../services/leave.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './leave.html',
  styleUrl: './leave.scss'
})
export class Leave implements OnInit {

  // ==========================================
  // Constructor
  // ==========================================

  constructor(
    private leaveService: LeaveService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  // ==========================================
  // Filters
  // ==========================================

  selectedStatus = 'ALL';

  loading = false;

  selectedManager = 'ALL';

  managers: any[] = [];

  // ==========================================
  // Modal Controls
  // ==========================================

  showViewModal = false;

  showApproveModal = false;

  showRejectModal = false;

  showDeleteModal = false;

  rejectReason = '';

  // ==========================================
  // Leave Data
  // ==========================================

  leaves: any[] = [];

  selectedLeave: any = null;

  deleteMessage = '';

  // ==========================================
  // Init
  // ==========================================

  ngOnInit(): void {

    this.loadManagers();

    this.loadAllLeaves();

}


  // ==========================================
// Load All Leaves (Admin)
// ==========================================

loadAllLeaves(): void {

  this.loading = true;

  this.leaveService.getAllLeaves().subscribe({

    next: (response: any) => {

      this.leaves = response.data || [];

     

      this.loading = false;

      this.cdr.detectChanges();

      console.log(this.leaves);

    },

    error: (error) => {

      console.error(error);

      this.loading = false;

    }

  });

}

loadManagers(): void {

    this.userService.getManagers().subscribe({

        next: (response: any) => {

            this.managers = response.data || [];

        },

        error: (error) => {

            console.error(error);

        }

    });

}

  // ==========================================
  // Load Pending Leaves
  // ==========================================

  loadPendingLeaves(): void {

    this.loading = true;

    this.leaveService.getPendingLeaves().subscribe({

      next: (response: any) => {

        this.leaves = response.data || [];

        this.loading = false;

        console.log(this.leaves);

      },

      error: (error) => {

        console.error(error);

        this.loading = false;

      }

    });

  }

  // ==========================================
  // Filtered Leaves
  // ==========================================

  get filteredLeaves() {

    return this.leaves.filter((leave: any) => {

        const statusMatch =
            this.selectedStatus === 'ALL' ||
            leave.status === this.selectedStatus;

        const managerMatch =
            this.selectedManager === 'ALL' ||
            leave.assignedManager?.fullName === this.selectedManager;

        return statusMatch && managerMatch;

    });

}

  // ==========================================
  // View
  // ==========================================

  viewLeave(leave: any): void {

    this.selectedLeave = { ...leave };

    this.showViewModal = true;

  }

  closeViewModal(): void {

    this.showViewModal = false;

    this.selectedLeave = null;

  }

  // ==========================================
  // Approve
  // ==========================================

  approveLeave(leave: any): void {

    this.selectedLeave = leave;

    this.showApproveModal = true;

  }

  cancelApprove(): void {

    this.showApproveModal = false;

    this.selectedLeave = null;

  }

  confirmApprove(): void {

    if (!this.selectedLeave) return;

    this.leaveService
      .approveLeave(this.selectedLeave._id)
      .subscribe({

        next: () => {

          this.showApproveModal = false;

          this.selectedLeave = null;

          this.loadAllLeaves();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  // ==========================================
  // Reject
  // ==========================================

  rejectLeave(leave: any): void {

    this.selectedLeave = leave;

    this.rejectReason = '';

    this.showRejectModal = true;

  }

  cancelReject(): void {

    this.showRejectModal = false;

    this.selectedLeave = null;

    this.rejectReason = '';

  }

  deleteLeave(leave: any): void {

  this.selectedLeave = leave;

  this.showDeleteModal = true;

}

cancelDelete(): void {

  this.showDeleteModal = false;

  this.selectedLeave = null;

}

confirmDelete(): void {

  if (!this.selectedLeave) return;

  this.leaveService
    .deleteLeaveByAdmin(
      this.selectedLeave._id
    )
    .subscribe({

      next: () => {

        this.showDeleteModal = false;

        this.selectedLeave = null;

        this.loadAllLeaves();

      },

      error: (error: any) => {

        console.error(error);

      }

    });

}

  confirmReject(): void {

    if (!this.selectedLeave) return;

    this.leaveService
      .rejectLeave(
        this.selectedLeave._id,
        this.rejectReason
      )
      .subscribe({

        next: () => {

          this.showRejectModal = false;

          this.selectedLeave = null;

          this.rejectReason = '';

          this.loadAllLeaves();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

}