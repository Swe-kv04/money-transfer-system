import { ChangeDetectorRef, Component } from '@angular/core';
import { AccountStatus } from '../../core/enums/account-status.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountInterface } from '../../core/interface/accountInterface';
import { Account } from '../../core/services/account';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
 userName  : number= 0;
 account: AccountInterface=
                {
                  id: 0,
                  holderName: '',
                  balance: 0,
                  status: AccountStatus.ACTIVE,
                  version: 0,
                  lastUpdated: new Date(),
                };
 
  
    constructor(private route: ActivatedRoute,private router: Router,private accountService: Account, private cd:ChangeDetectorRef) {}
  
  ngOnInit() : void{
    
    this.userName = Number(this.route.snapshot.paramMap.get('username'));
    this.accountService.getAccount(this.userName).subscribe({
      next: data => {this.account = data; console.log(this.account);this.cd.detectChanges();},
      error: err => console.error(err),
      
    });
    
  }
}
