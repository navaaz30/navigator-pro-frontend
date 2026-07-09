import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface LeaveRequest {

  id: string;

  employee: string;

  department: string;

  leaveType: string;

  fromDate: string;

  toDate: string;

  totalDays: number;

  reason: string;

  appliedDate: string;

  status: 'Pending' | 'Approved' | 'Rejected';

}

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
export class Leave {

  // ==========================================
  // Filter
  // ==========================================

  selectedStatus = '';

  // ==========================================
  // Modal Controls
  // ==========================================

  showViewModal = false;

  showApproveModal = false;

  showRejectModal = false;

  rejectReason = '';

  // ==========================================
  // Selected Leave
  // ==========================================

  selectedLeave: LeaveRequest | null = null;

  // ==========================================
  // Dummy Data
  // ==========================================

  leaves: LeaveRequest[] = [

    {
      id: 'LV-101',
      employee: 'Abhishek Singh',
      department: 'Electrical',
      leaveType: 'Casual Leave',
      fromDate: '10 Jul 2026',
      toDate: '12 Jul 2026',
      totalDays: 3,
      reason: 'Family Function',
      appliedDate: '05 Jul 2026',
      status: 'Pending'
    },

    {
      id: 'LV-102',
      employee: 'Rohit Sharma',
      department: 'Civil',
      leaveType: 'Sick Leave',
      fromDate: '05 Jul 2026',
      toDate: '06 Jul 2026',
      totalDays: 2,
      reason: 'High Fever',
      appliedDate: '03 Jul 2026',
      status: 'Approved'
    },

    {
      id: 'LV-103',
      employee: 'Sanjeev Kumar',
      department: 'Electrical',
      leaveType: 'Earned Leave',
      fromDate: '15 Jul 2026',
      toDate: '18 Jul 2026',
      totalDays: 4,
      reason: 'Personal Work',
      appliedDate: '08 Jul 2026',
      status: 'Pending'
    },

    {
      id: 'LV-104',
      employee: 'Pankaj Mehta',
      department: 'Mechanical',
      leaveType: 'Emergency Leave',
      fromDate: '20 Jul 2026',
      toDate: '20 Jul 2026',
      totalDays: 1,
      reason: 'Medical Emergency',
      appliedDate: '18 Jul 2026',
      status: 'Rejected'
    },

    {
      id: 'LV-105',
      employee: 'Deepak Verma',
      department: 'Safety',
      leaveType: 'Casual Leave',
      fromDate: '25 Jul 2026',
      toDate: '27 Jul 2026',
      totalDays: 3,
      reason: 'Family Trip',
      appliedDate: '20 Jul 2026',
      status: 'Approved'
    }

  ];

  // ==========================================
  // Filtered Leave Requests
  // ==========================================

  get filteredLeaves(): LeaveRequest[] {

    return this.leaves.filter(leave => {

      return this.selectedStatus === '' ||

      leave.status === this.selectedStatus;

    });

  }

    // ==========================================
  // View Leave
  // ==========================================

  viewLeave(leave: LeaveRequest): void {

    this.selectedLeave = {
      ...leave
    };

    this.showViewModal = true;

  }

  closeViewModal(): void {

    this.showViewModal = false;

    this.selectedLeave = null;

  }

  // ==========================================
  // Approve Leave
  // ==========================================

  approveLeave(leave: LeaveRequest): void {

    this.selectedLeave = leave;

    this.showApproveModal = true;

  }

  // ==========================================
  // Reject Leave
  // ==========================================

  rejectLeave(leave: LeaveRequest): void {

    this.selectedLeave = leave;

    this.rejectReason = '';

    this.showRejectModal = true;

  }

  // ==========================================
  // Cancel Approve
  // ==========================================

  cancelApprove(): void {

    this.showApproveModal = false;

    this.selectedLeave = null;

  }

  // ==========================================
  // Cancel Reject
  // ==========================================

  cancelReject(): void {

    this.showRejectModal = false;

    this.selectedLeave = null;

    this.rejectReason = '';

  }
    // ==========================================
  // Confirm Approve
  // ==========================================

  confirmApprove(): void {

    if (!this.selectedLeave) return;

    const index = this.leaves.findIndex(
      leave => leave.id === this.selectedLeave!.id
    );

    if (index !== -1) {

      this.leaves[index].status = 'Approved';

    }

    this.showApproveModal = false;

    this.selectedLeave = null;

  }

  // ==========================================
  // Confirm Reject
  // ==========================================

  confirmReject(): void {

    if (!this.selectedLeave) return;

    const index = this.leaves.findIndex(
      leave => leave.id === this.selectedLeave!.id
    );

    if (index !== -1) {

      this.leaves[index].status = 'Rejected';

      // Save rejection reason for future backend integration

      console.log(
        'Rejection Reason:',
        this.rejectReason
      );

    }

    this.showRejectModal = false;

    this.selectedLeave = null;

    this.rejectReason = '';

  }

}