import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTaskService {

  private taskUrl = 'https://navigator-pro-backend.onrender.com/api/tasks';

  constructor(
    private http: HttpClient
  ) {}

  // ==========================================
  // Get My Tasks
  // ==========================================

  getMyTasks(): Observable<any> {

    return this.http.get(
      `${this.taskUrl}/my-tasks`
    );

  }

  // ==========================================
  // Update Task Status
  // ==========================================

  updateTaskStatus(
    taskId: string,
    status: string,
    remarks: string
  ): Observable<any> {

    return this.http.patch(
      `${this.taskUrl}/${taskId}/status`,
      {
        status,
        remarks
      }
    );

  }

}