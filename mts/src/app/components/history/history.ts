import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {
   transactions = [
    { type: 'sent', name: 'Alice Brown', amount: 750 },
    { type: 'received', name: 'Bob Wilson', amount: 1200 },
    { type: 'sent', name: 'Mike Chen', amount: 500 }
  ];

}


