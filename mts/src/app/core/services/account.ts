import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Account {
  

  private API = 'http://localhost:8080/api/vi/accounts';

  constructor(private http: HttpClient) {}

  getAccount() {
    return this.http.get<any>(`${this.API}/{id}`);
  }

  getBalance() {
    return this.http.get<any>(`${this.API}/balance`);
  }
}