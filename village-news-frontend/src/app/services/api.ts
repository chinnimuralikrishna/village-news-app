import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {

  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  // User Dashboard
  getNews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/news`);
  }

  // My News
  getMyNews(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/my-news/${userId}`);
  }

  // Add News
  addNews(newsData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-news`, newsData);
  }

  // Update News
  updateNews(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-news/${id}`, data);
  }

  // Delete News
  deleteNews(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-news/${id}`);
  }

  // Login
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // Register
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

}