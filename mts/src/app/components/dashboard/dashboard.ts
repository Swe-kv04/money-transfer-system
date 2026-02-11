import { ChangeDetectorRef, Component } from '@angular/core';
import { Account } from '../../core/services/account';
import { Auth } from '../../core/services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountInterface } from '../../core/interface/accountInterface';
import { AccountStatus } from '../../core/enums/account-status.enum';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  
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
 
  
    constructor(private route: ActivatedRoute,private router: Router,private accountService: Account, private auth: Auth, private cd:ChangeDetectorRef) {}
  
    goTransfer() {
      this.router.navigate(['/transfer', this.userName]);
    }
  
    goHistory() {
      console.log(this.userName);
      this.router.navigate(['/history',this.userName]);
    }
  
    goProfile() {
      alert('Profile clicked');
    }

  ngOnInit() : void{
    
    this.userName = Number(this.route.snapshot.paramMap.get('username'));
    this.accountService.getAccount(this.userName).subscribe({
      next: data => {this.account = data; console.log(this.account);this.cd.detectChanges();},
      error: err => console.error(err),
      
    });
    
  }

  


  
    logout() {
      localStorage.clear();
      this.router.navigate(['/login']);
      this.auth.logout();
    }
  }
  