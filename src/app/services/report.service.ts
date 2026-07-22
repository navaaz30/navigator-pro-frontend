import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private readonly API_URL = 'https://navigator-pro-backend.onrender.com/api/reports';

  constructor(
    private http: HttpClient
  ) {}

  // ============================================
  // Dashboard Summary
  // ============================================

  getSummary(): Observable<any> {
    return this.http.get(`${this.API_URL}/summary`);
  }

  // ============================================
  // Attendance Report
  // ============================================

  getAttendanceReport(): Observable<any> {
    return this.http.get(`${this.API_URL}/attendance`);
  }

  // ============================================
  // Task Report
  // ============================================

  getTaskReport(): Observable<any> {
    return this.http.get(`${this.API_URL}/tasks`);
  }

  // ============================================
  // Leave Report
  // ============================================

  getLeaveReport(): Observable<any> {
    return this.http.get(`${this.API_URL}/leaves`);
  }

  // ============================================
  // Expense Report
  // ============================================

  getExpenseReport(): Observable<any> {
    return this.http.get(`${this.API_URL}/expenses`);
  }

  // ============================================
  // Inventory Report
  // ============================================

  getInventoryReport(): Observable<any> {
    return this.http.get(`${this.API_URL}/inventory`);
  }

  // ============================================
  // Employee Report
  // ============================================

  getEmployeeReport(): Observable<any> {
    return this.http.get(`${this.API_URL}/employees`);
  }

}