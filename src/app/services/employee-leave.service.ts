import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLeaveService {

  private readonly API_URL = 'https://navigator-pro-backend.onrender.com/api/leaves';

  constructor(
    private http: HttpClient
  ) {}

  // ==========================================
  // Get My Leave Requests
  // ==========================================

  getMyLeaves(): Observable<any> {

    return this.http.get(
      `${this.API_URL}/my-leaves`
    );

  }

  // ==========================================
  // Apply Leave
  // ==========================================

  applyLeave(data: any): Observable<any> {

    return this.http.post(
      `${this.API_URL}`,
      data
    );

  }

  // ==========================================
  // Update Leave
  // ==========================================

  updateLeave(
    leaveId: string,
    data: any
  ): Observable<any> {

    return this.http.put(
      `${this.API_URL}/${leaveId}`,
      data
    );

  }

  // ==========================================
  // Delete Leave
  // ==========================================

  deleteLeave(
    leaveId: string
  ): Observable<any> {

    return this.http.delete(
      `${this.API_URL}/${leaveId}`
    );

  }

  // ==========================================
  // Get Leave Details
  // ==========================================

  getLeaveById(
    leaveId: string
  ): Observable<any> {

    return this.http.get(
      `${this.API_URL}/${leaveId}`
    );

  }

}