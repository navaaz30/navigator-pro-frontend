import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private attendanceUrl = 'https://navigator-pro-backend.onrender.com/api/attendance';
  private staffUrl = 'https://navigator-pro-backend.onrender.com/api/users/staff';

  constructor(private http: HttpClient) {}

  // ===========================
  // Attendance APIs
  // ===========================

  getAttendance(date?: string): Observable<any> {

  if (date) {

    return this.http.get<any>(
      `${this.attendanceUrl}?date=${date}`
    );

  }

  return this.http.get<any>(this.attendanceUrl);

}

  getAttendanceById(id: string): Observable<any> {
    return this.http.get(`${this.attendanceUrl}/${id}`);
  }

  createAttendance(data: any): Observable<any> {
    return this.http.post(this.attendanceUrl, data);
  }

  updateAttendance(id: string, data: any): Observable<any> {
    return this.http.put(`${this.attendanceUrl}/${id}`, data);
  }

  deleteAttendance(id: string): Observable<any> {
    return this.http.delete(`${this.attendanceUrl}/${id}`);
  }

  // ===========================
  // Employee APIs
  // ===========================

  getStaff(): Observable<any> {

  return this.http.get(this.staffUrl);

}

}