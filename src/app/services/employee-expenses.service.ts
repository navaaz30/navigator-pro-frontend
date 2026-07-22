import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeExpensesService {

  private apiUrl = 'https://navigator-pro-backend.onrender.com/api/expenses';

  constructor(
    private http: HttpClient
  ) {}

  // ==========================================
  // Get Logged-in Employee Expenses
  // ==========================================

  getMyExpenses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my-expenses`);
  }

  // ==========================================
  // Get Expense By ID
  // ==========================================

  getExpenseById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // ==========================================
  // Create Expense
  // ==========================================

  createExpense(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  // ==========================================
  // Update Expense
  // ==========================================

  updateExpense(
    id: string,
    formData: FormData
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      formData
    );

  }

  // ==========================================
  // Delete Expense
  // ==========================================

  deleteExpense(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}