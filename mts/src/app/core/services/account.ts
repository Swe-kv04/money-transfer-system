import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Account {
  

  private API = 'http://localhost:8080/api/account';

  constructor(private http: HttpClient) {}

  getAccount() {
    return this.http.get<any>(`${this.API}`);
  }

  getBalance() {
    return this.http.get<any>(`${this.API}/balance`);
  }

  getTransactions() {
    return this.http.get<any>(`${this.API}/transactions`);
  }
}