import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="login-wrapper">
      <div class="login-card">
        <h2>Smart Wall Visualizer</h2>
        <p>Enter your credentials to access the dashboard</p>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Email</label>
            <input type="email" formControlName="email" placeholder="admin@example.com">
          </div>
          
          <div class="form-group">
            <label>Password</label>
            <input type="password" formControlName="password" placeholder="••••••••">
          </div>
          
          <button type="submit" [disabled]="loginForm.invalid">Sign In</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper { display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f4f7f6; font-family: sans-serif; }
    .login-card { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 100%; max-width: 350px; text-align: center; }
    .login-card h2 { margin-top: 0; color: #333; }
    .login-card p { color: #666; font-size: 14px; margin-bottom: 25px; }
    .form-group { margin-bottom: 20px; text-align: left; }
    label { display: block; font-size: 14px; color: #333; margin-bottom: 5px; font-weight: bold; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    button { width: 100%; padding: 12px; background-color: #0056b3; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; transition: background 0.2s; }
    button:hover:not(:disabled) { background-color: #004494; }
    button:disabled { background-color: #a0c4e8; cursor: not-allowed; }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      console.log('Authenticating:', credentials);
      
      // Temporary bypass: Immediately navigate to the dashboard for testing
      this.router.navigate(['/dashboard']);
    }
  }
}
