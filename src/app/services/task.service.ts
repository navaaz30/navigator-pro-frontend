import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) {}

  // ===========================
  // Get All Tasks
  // ===========================

  getTasks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // ===========================
  // Get My Tasks
  // ===========================

  getMyTasks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/my-tasks`);
  }

  // ===========================
  // Create Task
  // ===========================

  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  // ===========================
  // Update Task
  // ===========================

  updateTask(id: string, task: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      task
    );
  }

  // ===========================
  // Delete Task
  // ===========================

  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${id}`
    );
  }

  // ===========================
  // Employee Update Status
  // ===========================

  updateTaskStatus(
    taskId: string,
    status: string,
    remarks: string = ''
  ): Observable<any> {

    return this.http.patch<any>(
      `${this.apiUrl}/${taskId}/status`,
      {
        status,
        remarks
      }
    );

  }

}