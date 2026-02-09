import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../core/services/auth';



@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm;
  errorMsg = '';

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
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

    if (username==='swetha'&&password==='123456'){
      this.auth.setToken("dummy");
      this.router.navigate(['/dashboard']);
    }else{
      this.errorMsg='Invalid username or password';
    }


    //this got to do after we connect to backend
    /*this.auth.login(username!, password!).subscribe({
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