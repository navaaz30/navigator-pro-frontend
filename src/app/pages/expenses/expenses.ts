import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface Expense {
  id: string;
  employee: string;
  department: string;
  category: string;
  amount: number;
  date: string;
  from: string;
  to: string;
  description: string;
  receipt: string;
  receiptType: 'image' | 'pdf';
  status: 'Pending' | 'Approved' | 'Rejected';
}
@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './expenses.html',
  styleUrl: './expenses.scss'
})
export class Expenses {

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

  showReceiptModal = false;

  rejectReason = '';

  // ==========================================
  // Selected Expense
  // ==========================================

  selectedExpense: Expense | null = null;

  // ==========================================
  // Dummy Data
  // ==========================================

  expenses: Expense[] = [

  {
    id: 'EXP-101',
    employee: 'Abhishek Singh',
    department: 'Electrical',
    category: 'Travel',
    amount: 2450,
    date: '30 Jun 2026',
    from: 'Chennai',
    to: 'Bangalore',
    description: 'Travel expense for client visit.',
    receipt: 'travel_receipt.pdf',
    receiptType: 'pdf',
    status: 'Pending'
  },

  {
    id: 'EXP-102',
    employee: 'Rohit Sharma',
    department: 'Civil',
    category: 'Fuel',
    amount: 820,
    date: '29 Jun 2026',
    from: 'Delhi',
    to: 'Noida',
    description: 'Fuel reimbursement.',
    receipt: 'fuel_receipt.jpg',
    receiptType: 'image',
    status: 'Approved'
  },

  {
    id: 'EXP-103',
    employee: 'Sanjeev Kumar',
    department: 'Electrical',
    category: 'Food',
    amount: 650,
    date: '28 Jun 2026',
    from: 'Mumbai',
    to: 'Mumbai',
    description: 'Client meeting lunch.',
    receipt: 'food_bill.jpg',
    receiptType: 'image',
    status: 'Pending'
  },

  {
    id: 'EXP-104',
    employee: 'Pankaj Mehta',
    department: 'Mechanical',
    category: 'Accommodation',
    amount: 5200,
    date: '27 Jun 2026',
    from: 'Hyderabad',
    to: 'Pune',
    description: 'Hotel stay during site visit.',
    receipt: 'hotel_invoice.pdf',
    receiptType: 'pdf',
    status: 'Rejected'
  },

  {
    id: 'EXP-105',
    employee: 'Deepak Verma',
    department: 'Safety',
    category: 'Equipment',
    amount: 1800,
    date: '26 Jun 2026',
    from: 'Kolkata',
    to: 'Kolkata',
    description: 'Purchased safety equipment.',
    receipt: 'equipment_bill.pdf',
    receiptType: 'pdf',
    status: 'Approved'
  }



  ];

  // ==========================================
  // Filtered Expenses
  // ==========================================

  get filteredExpenses(): Expense[] {

    return this.expenses.filter(expense => {

      return this.selectedStatus === '' ||

      expense.status === this.selectedStatus;

    });

  }
    // ==========================================
  // View Expense
  // ==========================================

  viewExpense(expense: Expense): void {

    this.selectedExpense = {
      ...expense
    };

    this.showViewModal = true;

  }

  closeViewModal(): void {

    this.showViewModal = false;

    this.selectedExpense = null;

  }

  // ==========================================
  // Approve Expense
  // ==========================================

  approveExpense(expense: Expense): void {

    this.selectedExpense = expense;

    this.showApproveModal = true;

  }

  // ==========================================
  // Reject Expense
  // ==========================================

  rejectExpense(expense: Expense): void {

    this.selectedExpense = expense;

    this.rejectReason = '';

    this.showRejectModal = true;

  }

  // ==========================================
  // Cancel Approve
  // ==========================================

  cancelApprove(): void {

    this.showApproveModal = false;

    this.selectedExpense = null;

  }

  // ==========================================
  // Cancel Reject
  // ==========================================

  cancelReject(): void {

    this.showRejectModal = false;

    this.selectedExpense = null;

    this.rejectReason = '';

  }
    // ==========================================
  // Confirm Approve
  // ==========================================

  confirmApprove(): void {

    if (!this.selectedExpense) return;

    const index = this.expenses.findIndex(
      expense => expense.id === this.selectedExpense!.id
    );

    if (index !== -1) {

      this.expenses[index].status = 'Approved';

    }

    this.showApproveModal = false;

    this.selectedExpense = null;

  }

  // ==========================================
  // Confirm Reject
  // ==========================================

  confirmReject(): void {

    if (!this.selectedExpense) return;

    const index = this.expenses.findIndex(
      expense => expense.id === this.selectedExpense!.id
    );

    if (index !== -1) {

      this.expenses[index].status = 'Rejected';

      // Save rejection reason if you
      // later add it to the interface/database

      console.log(
        'Rejection Reason :',
        this.rejectReason
      );

    }

    this.showRejectModal = false;

    this.selectedExpense = null;

    this.rejectReason = '';

  }

  viewReceipt(expense: Expense): void {

  this.selectedExpense = {
    ...expense
  };

  this.showReceiptModal = true;

}

closeReceiptModal(): void {

  this.showReceiptModal = false;

  this.selectedExpense = null;

}

}