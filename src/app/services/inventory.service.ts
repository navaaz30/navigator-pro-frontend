import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl = 'http://localhost:5000/api/inventory';

  constructor(private http: HttpClient) {}

  // ===========================
  // Get All Inventory
  // ===========================

  getInventory(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // ===========================
  // Get Inventory By Id
  // ===========================

  getInventoryById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // ===========================
  // Create Inventory Item
  // ===========================

  createInventory(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, item);
  }

  // ===========================
  // Update Inventory Item
  // ===========================

  updateInventory(id: string, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, item);
  }

  // ===========================
  // Delete Inventory Item
  // ===========================

  deleteInventory(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // ===========================
  // Search Inventory
  // ===========================

  searchInventory(keyword: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/search?keyword=${encodeURIComponent(keyword)}`
    );
  }

  // ===========================
  // Filter By Category
  // ===========================

  filterByCategory(category: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/category?category=${encodeURIComponent(category)}`
    );
  }

}