import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://navigator-pro-backend.onrender.com/api/users';

  constructor(private http: HttpClient) {}

  // ===========================
  // Get All Users
  // ===========================

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getManagers(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/managers`
    );
  }

  // ===========================
  // Get User By Id
  // ===========================

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // ===========================
  // Get Logged-in Profile
  // ===========================

  getProfile(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/profile`
    );
  }

  // ===========================
  // Create User
  // ===========================

  createUser(user: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      user
    );
  }

  // ===========================
  // Update User (Admin)
  // ===========================

  updateUser(
    id: string,
    user: any
  ): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      user
    );

  }

  // ===========================
  // Update Logged-in Profile
  // ===========================

  updateProfile(
    user: any
  ): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/profile`,
      user
    );

  }

  // ===========================
// Change Password
// ===========================

changePassword(
  data: {
    currentPassword: string;
    newPassword: string;
  }
): Observable<any> {

  return this.http.put<any>(
    `${this.apiUrl}/change-password`,
    data
  );

}

  // ===========================
  // Delete User
  // ===========================

  deleteUser(id: string): Observable<any> {

    return this.http.delete<any>(
      `${this.apiUrl}/${id}`
    );

  }

  // ===========================
  // Change Status
  // ===========================

  changeStatus(
    id: string,
    isActive: boolean
  ): Observable<any> {

    return this.http.patch<any>(
      `${this.apiUrl}/${id}/status`,
      { isActive }
    );

  }

}