import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  
    private API = 'http://localhost:8080/api/auth';
  
    constructor(private http: HttpClient, private router: Router) {}
  
    login(username: string, password: string) {
      return this.http.post<any>(`${this.API}/login`, { username, password });
    }
  
    setToken(token: string) {
      localStorage.setItem('token', token);
    }
  
    getToken() {
      return localStorage.getItem('token');
    }
  
    isAuthenticated(): boolean {
      return !!this.getToken();
    }
  
    logout() {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }
  