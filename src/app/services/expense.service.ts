import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Expense {

  _id?: string;

  expenseId?: string;

  employee: any;

  assignedManager?: any;

  category:
    | 'TRAVEL'
    | 'FUEL'
    | 'FOOD'
    | 'ACCOMMODATION'
    | 'OFFICE'
    | 'OTHER';

  amount: number;

  expenseDate: string;

  description: string;

  receipt?: string;

  status?: 'PENDING' | 'APPROVED' | 'REJECTED';

  approvedBy?: any;

  managerRemarks?: string;

  createdAt?: string;

  updatedAt?: string;

}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'https://navigator-pro-backend.onrender.com/api/expenses';

  constructor(
    private http: HttpClient
  ) {}

  // ==========================================
  // Get All Expenses (Admin/Manager)
  // ==========================================

  getAllExpenses(): Observable<any> {

    return this.http.get<any>(this.apiUrl);

  }

  // ==========================================
  // Get Pending Expenses
  // ==========================================

  getPendingExpenses(): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/pending`
    );

  }

  // ==========================================
  // Get Single Expense
  // ==========================================

  getExpense(expenseId: string): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/${expenseId}`
    );

  }

  // ==========================================
  // Approve Expense
  // ==========================================

  approveExpense(
    expenseId: string,
    managerRemarks: string = 'Approved'
  ): Observable<any> {

    return this.http.patch<any>(
      `${this.apiUrl}/${expenseId}/approve`,
      {
        managerRemarks
      }
    );

  }

  // ==========================================
  // Reject Expense
  // ==========================================

  rejectExpense(
    expenseId: string,
    managerRemarks: string
  ): Observable<any> {

    return this.http.patch<any>(
      `${this.apiUrl}/${expenseId}/reject`,
      {
        managerRemarks
      }
    );

  }

  // ==========================================
  // Delete Expense
  // ==========================================

  deleteExpense(expenseId: string): Observable<any> {

    return this.http.delete<any>(
      `${this.apiUrl}/${expenseId}`
    );

  }

  // ==========================================
  // Expense Statistics
  // ==========================================

  getExpenseStats(): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/stats`
    );

  }

  // ==========================================
  // Monthly Expense Statistics
  // ==========================================

  getMonthlyExpenseStats(): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/monthly`
    );

  }

}