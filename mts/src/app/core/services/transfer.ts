import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../interface/transfer-history-interface';

@Injectable({
  providedIn: 'root',
})
export class Transfer {


  private API = 'http://localhost:8080/api/transfer';

  constructor(private http: HttpClient) {}

  transfer(id:number) {
    return this.http.get<Transaction>(this.API+`/${id}`);
      
  }
}