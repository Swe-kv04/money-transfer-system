import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm;
  errorMsg = '';

  username: string = '';
	password : string = '';
	isLoggedin = false;
	error: string = '';
  data : any = {};

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  };


  onLogin() {
    if (this.loginForm.invalid) {
      this.errorMsg = 'Please fill all fields';
      return;
    }

    const { username, password } = this.loginForm.value;
    console.log("Username : ",username);
    console.log("Password:",password);

   
    if (username==='3'&&password==='123456'){
      
     this.router.navigate(['/dashboard', username]);
    }else{
      this.errorMsg='Invalid username or password';
    }

    //this got to do after we connect to backend
    /*
    this.auth.login(username!, password!).subscribe({
      next: res => {
        this.auth.setToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMsg = 'Invalid username or password';
      }
    });*/
  }
}