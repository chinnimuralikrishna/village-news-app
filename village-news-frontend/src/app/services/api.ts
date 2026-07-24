import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  // User Dashboard
  getNews() {
    return this.http.get(`${this.baseUrl}/news`);
  }

  // My News
  getMyNews(userId: number) {
    return this.http.get(`${this.baseUrl}/my-news/${userId}`);
  }

  // Add News
  addNews(newsData: any) {
    return this.http.post(`${this.baseUrl}/add-news`, newsData);
  }

  // Auth
  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(userData: any) {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }
}