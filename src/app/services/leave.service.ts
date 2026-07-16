import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Leave {

  _id?: string;

  employee: any;

  assignedManager?: any;

  startDate: string;

  endDate: string;

  leaveType: 'SICK' | 'CASUAL' | 'EARNED';

  reason: string;

  status?: 'PENDING' | 'APPROVED' | 'REJECTED';

  approvedBy?: any;

  managerRemarks?: string;

  totalDays?: number;

  createdAt?: string;

  updatedAt?: string;

}

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private apiUrl = 'http://localhost:5000/api/leaves';

  constructor(
    private http: HttpClient
  ) {}

  getAllLeaves(): Observable<any> {

  return this.http.get<any>(
    this.apiUrl
  );

}

  getPendingLeaves(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/pending`
    );
  }

  getMyLeaves(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/my-leaves`
    );
  }

  applyLeave(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      data
    );
  }

  approveLeave(
    leaveId: string,
    managerRemarks: string = ''
  ): Observable<any> {

    return this.http.patch<any>(
      `${this.apiUrl}/${leaveId}/approve`,
      {
        managerRemarks
      }
    );

  }

  rejectLeave(
    leaveId: string,
    managerRemarks: string = ''
  ): Observable<any> {

    return this.http.patch<any>(
      `${this.apiUrl}/${leaveId}/reject`,
      {
        managerRemarks
      }
    );

  }

}