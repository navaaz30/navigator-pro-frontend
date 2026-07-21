import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';

import { EmployeeExpensesService }
from '../../../services/employee-expenses.service';

@Component({
  selector: 'app-employee-expenses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './employee-expenses.html',
  styleUrl: './employee-expenses.scss'
})
export class EmployeeExpenses implements OnInit {

  constructor(
    private expenseService: EmployeeExpensesService,
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

  showReceiptModal = false;

  selectedReceipt = '';

  showDeleteModal = false;

  isEditMode = false;

  validationError = '';

  

  isSubmitting = false;

  // ==========================================
  // Data
  // ==========================================

  expenses: any[] = [];

  filteredExpensesList: any[] = [];

  selectedExpense: any = null;

  expenseToDelete: any = null;

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
  // Expense Form
  // ==========================================

  newExpense: any = {

    _id: '',

    title: '',

    category: '',

    amount: null,

    expenseDate: '',

    description: '',

    receipt: null,

    status: 'PENDING'

  };

  receiptPreview: string | ArrayBuffer | null = null;

  // ==========================================
  // Init
  // ==========================================

  ngOnInit(): void {

    this.loadExpenses();

  }

  // ==========================================
  // Load Expenses
  // ==========================================

  loadExpenses(): void {

    this.expenseService
      .getMyExpenses()
      .subscribe({

        next: (response: any) => {

          this.expenses = response.data || [];

          this.filteredExpenses();

          this.calculateSummary();

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  // ==========================================
  // Summary Cards
  // ==========================================

  calculateSummary(): void {

    this.summary.total = this.expenses.length;

    this.summary.pending = this.expenses.filter(

      expense => expense.status === 'PENDING'

    ).length;

    this.summary.approved = this.expenses.filter(

      expense => expense.status === 'APPROVED'

    ).length;

    this.summary.rejected = this.expenses.filter(

      expense => expense.status === 'REJECTED'

    ).length;

  }

  // ==========================================
  // Search & Filter
  // ==========================================

  filteredExpenses(): void {

    this.filteredExpensesList = this.expenses.filter(expense => {

      const matchesSearch =

        expense.title
          ?.toLowerCase()
          .includes(this.searchText.toLowerCase())

        ||

        expense.category
          ?.toLowerCase()
          .includes(this.searchText.toLowerCase());

      const matchesStatus =

        this.selectedStatus === ''

        ||

        expense.status === this.selectedStatus;

      return matchesSearch && matchesStatus;

    });

  }

  onSearch(): void {

    this.filteredExpenses();

  }

  onStatusChange(): void {

    this.filteredExpenses();

  }

  // ==========================================
  // Receipt Upload
  // ==========================================

  onReceiptSelected(event: any): void {

    const file = event.target.files[0];

    if (!file) return;

    this.newExpense.receipt = file;

    const reader = new FileReader();

    reader.onload = () => {

      this.receiptPreview = reader.result;

    };

    reader.readAsDataURL(file);

  }

  // ==========================================
  // Add Expense
  // ==========================================

  openAddExpense(): void {

    this.isEditMode = false;

    this.validationError = '';

    this.receiptPreview = null;

    this.newExpense = {

      _id: '',

      title: '',

      category: '',

      amount: null,

      expenseDate: '',

      description: '',

      receipt: null,

      status: 'PENDING'

    };

    this.showForm = true;

  }

  // ==========================================
  // Edit Expense
  // ==========================================

  editExpense(expense: any): void {

    if (expense.status !== 'PENDING') {

      return;

    }

    this.isEditMode = true;

    this.validationError = '';

    this.receiptPreview = expense.receiptUrl || null;

    this.newExpense = {

      ...expense,

      expenseDate: expense.expenseDate
        ? expense.expenseDate.split('T')[0]
        : ''

    };

    this.showForm = true;

  }

  // ==========================================
  // View Expense
  // ==========================================

  viewExpense(expense: any): void {

    this.selectedExpense = expense;

    this.showViewModal = true;

  }

  closeViewModal(): void {

    this.selectedExpense = null;

    this.showViewModal = false;

  }

  viewReceipt(expense: any): void {

  this.selectedReceipt = expense.receiptUrl;

  this.showReceiptModal = true;

}

closeReceiptModal(): void {

  this.selectedReceipt = '';

  this.showReceiptModal = false;

}

  // ==========================================
  // Save Expense
  // ==========================================

  saveExpense(): void {

    console.log("1. saveExpense called");

    this.validationError = '';

    if (this.isSubmitting) {
      this.isSubmitting = false;
  return;
}

this.isSubmitting = true;

    if (

      !this.newExpense.title ||

      !this.newExpense.category ||

      !this.newExpense.amount ||

      !this.newExpense.expenseDate ||

    !this.newExpense.description

    ) {

      this.validationError =
        'Please fill all required fields.';

      return;

    }

    const formData = new FormData();

    formData.append(
      'title',
      this.newExpense.title
    );

    formData.append(
      'category',
      this.newExpense.category
    );

    formData.append(
      'amount',
      this.newExpense.amount
    );

    formData.append(
      'expenseDate',
      this.newExpense.expenseDate
    );

    formData.append(
      'description',
      this.newExpense.description || ''
    );

    formData.append(
      'status',
      'PENDING'
    );

    if (this.newExpense.receipt) {

      formData.append(
        'receipt',
        this.newExpense.receipt
      );

    }

    if (this.isEditMode) {

      this.expenseService
        .updateExpense(
          this.newExpense._id,
          formData
        )
        .subscribe({

          next: () => {

            this.closeForm();

            this.loadExpenses();

          },

          error: console.error

        });

    }

    else {

      this.expenseService
        .createExpense(formData)
        .subscribe({

          next: () => {

            console.log("2. API Success");

    this.isSubmitting = false;

    this.closeForm();

    console.log("3. closeForm called");

    this.loadExpenses();

          },

          error: console.error

        });

    }

  }

  // ==========================================
  // Delete Expense
  // ==========================================

  deleteExpense(expense: any): void {

    if (expense.status !== 'PENDING') {

      return;

    }

    this.expenseToDelete = expense;

    this.showDeleteModal = true;

  }

  confirmDelete(): void {

    if (!this.expenseToDelete) {

      return;

    }

    this.expenseService
      .deleteExpense(
        this.expenseToDelete._id
      )
      .subscribe({

        next: () => {

          this.cancelDelete();

          this.loadExpenses();

        },

        error: console.error

      });

  }

  cancelDelete(): void {

    this.expenseToDelete = null;

    this.showDeleteModal = false;

  }

  // ==========================================
  // Close Form
  // ==========================================

  closeForm(): void {

    console.log("4. closeForm executed");

    this.showForm = false;

    this.validationError = '';

    this.isEditMode = false;

    this.receiptPreview = null;

  }

}