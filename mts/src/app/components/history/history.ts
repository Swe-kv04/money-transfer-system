import { ChangeDetectorRef, Component } from '@angular/core';
import { Transaction } from '../../core/interface/transfer-history-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../core/services/account';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {

  userName: number=0;
   /*transactions = [
    { type: 'sent', name: 'Alice Brown', amount: 750 },
    { type: 'received', name: 'Bob Wilson', amount: 1200 },
    { type: 'sent', name: 'Mike Chen', amount: 500 }
  ];*/


  transactions: Transaction[] = [];

  constructor(private route: ActivatedRoute,private router: Router,private accountService: Account, private auth: Auth, private cd:ChangeDetectorRef) {}
  
  ngOnInit() : void{
    
    this.userName = Number(this.route.snapshot.paramMap.get('username'));
    
    this.accountService.getTransactions(this.userName).subscribe({
      next: data => {this.transactions=data;console.log(data);this.cd.detectChanges();},
      error: err => console.error(err),
      
    });



}


}
