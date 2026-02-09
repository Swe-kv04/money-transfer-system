import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Transfer {


  private API = 'http://localhost:8080/api/transfer';

  constructor(private http: HttpClient) {}

  transfer(data: any) {
    return this.http.post(`${this.API}`, data);
  }
}