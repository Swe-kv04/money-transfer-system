import { Component } from '@angular/core';
import { Account } from '../../core/services/account';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  
    userName = 'John Smith';
    balance = 0;
  
    constructor(private router: Router,private accountService: Account, private auth: Auth) {}
  
    goTransfer() {
      this.router.navigate(['/transfer']);
    }
  
    goHistory() {
      this.router.navigate(['/history']);
    }
  
    goProfile() {
      alert('Profile clicked');
    }

  ngOnInit() {
    this.accountService.getBalance().subscribe(res => {
      this.balance = res.balance;
    });
  }
  
    logout() {
      localStorage.clear();
      this.router.navigate(['/login']);
      this.auth.logout();
    }
  }
  