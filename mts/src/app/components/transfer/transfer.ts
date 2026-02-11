
import { Component } from '@angular/core';

@Component({
  selector: 'app-transfer',
  standalone: false,
  templateUrl: './transfer.html',
  styleUrl: './transfer.css',
})
export class Transfer {

  fromAccount = 'John Smith';
  toAccount = '';
  amount = 0;
  note = '';
 
  transferMoney() {
    alert(`Transferred ₹${this.amount} to ${this.toAccount}`);
  }

  
}