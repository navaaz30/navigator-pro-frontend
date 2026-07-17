import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAttendanceService {

  private attendanceUrl =
    'http://localhost:5000/api/attendance';

  constructor(
    private http: HttpClient
  ) {}

  // ==========================================
  // Employee Attendance
  // ==========================================

  getAttendance(): Observable<any> {

    return this.http.get(
      `${this.attendanceUrl}/employee`
    );

  }

  // ==========================================
  // Clock In
  // ==========================================

  clockIn(): Observable<any> {

    return this.http.post(
      `${this.attendanceUrl}/clock-in`,
      {}
    );

  }

  // ==========================================
  // Clock Out
  // ==========================================

  clockOut(): Observable<any> {

    return this.http.post(
      `${this.attendanceUrl}/clock-out`,
      {}
    );

  }

}