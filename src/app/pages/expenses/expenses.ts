import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';

import {
  ExpenseService,
  Expense
} from '../../services/expense.service';

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
export class Expenses implements OnInit {

  constructor(
  private expenseService: ExpenseService,
  private cdr: ChangeDetectorRef
) {}

  // ==========================================
  // Loading
  // ==========================================

  loading = false;

  // ==========================================
  // Expense Data
  // ==========================================

  expenses: Expense[] = [];

  selectedExpense: Expense | null = null;

  // ==========================================
  // Filters
  // ==========================================

  selectedStatus = '';

  // ==========================================
  // Modal Controls
  // ==========================================

  showViewModal = false;

  showReceiptModal = false;

  showApproveModal = false;

  showRejectModal = false;

  rejectReason = '';

  showDeleteModal = false;

expenseToDelete: Expense | null = null;

  // ==========================================
  // Lifecycle
  // ==========================================

  ngOnInit(): void {

    this.loadExpenses();

  }

  // ==========================================
  // Load Expenses
  // ==========================================

  loadExpenses(): void {

    this.loading = true;

    this.expenseService.getAllExpenses().subscribe({

      next: (response: any) => {

  this.expenses = [...(response.data || [])];

  this.loading = false;

  this.cdr.detectChanges();

},

      error: (err) => {

        console.error('Failed to load expenses', err);

        this.loading = false;

      }

    });

  }

  // ==========================================
  // Filtered Expenses
  // ==========================================

  get filteredExpenses(): Expense[] {

  console.log('========== FILTERED GETTER ==========');
  console.log('selectedStatus:', this.selectedStatus);
  console.log('expenses length:', this.expenses.length);
  console.log(this.expenses);

  if (!this.selectedStatus) {
    return this.expenses;
  }

  return this.expenses.filter(expense =>
    expense.status === this.selectedStatus
  );

}

  // ==========================================
  // View Expense
  // ==========================================

  viewExpense(expense: Expense): void {

    this.selectedExpense = expense;

    this.showViewModal = true;

  }

  closeViewModal(): void {

    this.showViewModal = false;

    this.selectedExpense = null;

  }

  // ==========================================
  // Receipt Modal
  // ==========================================

  viewReceipt(expense: Expense): void {

    this.selectedExpense = expense;

    this.showReceiptModal = true;

  }

  closeReceiptModal(): void {

    this.showReceiptModal = false;

    this.selectedExpense = null;

  }

    // ==========================================
  // Approve Expense
  // ==========================================

  approveExpense(expense: Expense): void {

    this.selectedExpense = expense;

    this.showApproveModal = true;

  }

  cancelApprove(): void {

    this.showApproveModal = false;

    this.selectedExpense = null;

  }

  confirmApprove(): void {

    if (!this.selectedExpense?._id) {
      return;
    }

    this.expenseService
      .approveExpense(
        this.selectedExpense._id,
        'Approved'
      )
      .subscribe({

        next: () => {

          this.showApproveModal = false;

          this.selectedExpense = null;

          this.loadExpenses();

        },

        error: (err) => {

          console.error('Approve failed', err);

        }

      });

  }

  // ==========================================
  // Reject Expense
  // ==========================================

  rejectExpense(expense: Expense): void {

    this.selectedExpense = expense;

    this.rejectReason = '';

    this.showRejectModal = true;

  }

  cancelReject(): void {

    this.showRejectModal = false;

    this.selectedExpense = null;

    this.rejectReason = '';

  }

  confirmReject(): void {

    if (!this.selectedExpense?._id) {
      return;
    }

    this.expenseService
      .rejectExpense(
        this.selectedExpense._id,
        this.rejectReason
      )
      .subscribe({

        next: () => {

          this.showRejectModal = false;

          this.selectedExpense = null;

          this.rejectReason = '';

          this.loadExpenses();

        },

        error: (err) => {

          console.error('Reject failed', err);

        }

      });

  }

  // ==========================================
  // Delete Expense
  // ==========================================

  deleteExpense(expense: Expense): void {

    this.expenseToDelete = expense;

    this.showDeleteModal = true;

}

cancelDelete(): void {

    this.showDeleteModal = false;

    this.expenseToDelete = null;

}

confirmDelete(): void {

    if (!this.expenseToDelete?._id) return;

    this.expenseService
        .deleteExpense(this.expenseToDelete._id)
        .subscribe({

            next: () => {

                this.showDeleteModal = false;

                this.expenseToDelete = null;

                this.loadExpenses();

            },

            error: err => {

                console.error(err);

            }

        });

}

  // ==========================================
  // Refresh Expenses
  // ==========================================

  refreshExpenses(): void {

    this.loadExpenses();

  }

    // ==========================================
  // Status Badge Class
  // ==========================================

  getStatusClass(status?: string): string {

    switch (status) {

      case 'APPROVED':
        return 'approved';

      case 'REJECTED':
        return 'rejected';

      case 'PENDING':
      default:
        return 'pending';

    }

  }

  // ==========================================
  // Receipt URL
  // ==========================================

  getReceiptUrl(): string {

    if (!this.selectedExpense) {
      return '';
    }

    const expense: any = this.selectedExpense;

    if (expense.receiptUrl) {
      return expense.receiptUrl;
    }

    if (expense.receipt) {
      return `http://localhost:5000/uploads/expense-receipts/${expense.receipt}`;
    }

    return '';

  }

  // ==========================================
  // Helpers
  // ==========================================

  hasReceipt(expense: Expense): boolean {

    const data: any = expense;

    return !!(data.receipt || data.receiptUrl);

  }

  getEmployeeName(expense: Expense): string {

    const data: any = expense;

    return data.employee?.fullName || '-';

  }

  getEmployeeId(expense: Expense): string {

    const data: any = expense;

    return data.employee?.employeeId || '-';

  }

  getManagerRemarks(expense: Expense): string {

    const data: any = expense;

    return data.managerRemarks || '-';

  }

}