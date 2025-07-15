import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { AuthService, RegisterCredentials } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  template: `
    <div class="register-container">
      <mat-card class="register-card">
        <mat-card-header>
          <mat-card-title>Create Account</mat-card-title>
          <mat-card-subtitle>Join Interview Tracker to start managing your job applications</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Username</mat-label>
              <input matInput formControlName="username" placeholder="Enter your username">
              <mat-icon matSuffix>person</mat-icon>
              <mat-error *ngIf="registerForm.get('username')?.hasError('required')">
                Username is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" placeholder="Enter your password">
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
              <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
                Password must be at least 6 characters
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Confirm Password</mat-label>
              <input matInput [type]="hideConfirmPassword ? 'password' : 'text'" formControlName="confirmPassword" placeholder="Confirm your password">
              <button mat-icon-button matSuffix (click)="hideConfirmPassword = !hideConfirmPassword" type="button">
                <mat-icon>{{hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('required')">
                Please confirm your password
              </mat-error>
              <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('passwordMismatch')">
                Passwords do not match
              </mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid || isLoading" class="full-width">
                <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
                <span *ngIf="!isLoading">Register</span>
              </button>
            </div>

            <div class="auth-links">
              <p>Already have an account? <a routerLink="/login">Login here</a></p>
            </div>

            <div *ngIf="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>

            <div *ngIf="successMessage" class="success-message">
              {{ successMessage }}
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      position: relative;
      overflow: hidden;
    }

    .register-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      pointer-events: none;
    }

    .register-card {
      max-width: 420px;
      width: 100%;
      padding: 32px;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      animation: slideUp 0.6s ease-out;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .full-width {
      width: 100%;
      margin-bottom: 20px;
    }

    .form-actions {
      margin-top: 32px;
    }

    .auth-links {
      text-align: center;
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }

    .auth-links a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .auth-links a:hover {
      color: #5a6fd8;
      text-decoration: underline;
    }

    .error-message {
      color: #d32f2f;
      text-align: center;
      margin-top: 16px;
      padding: 12px;
      background-color: #ffebee;
      border-radius: 8px;
      border-left: 4px solid #d32f2f;
      font-size: 14px;
    }

    .success-message {
      color: #2e7d32;
      text-align: center;
      margin-top: 16px;
      padding: 12px;
      background-color: #e8f5e8;
      border-radius: 8px;
      border-left: 4px solid #2e7d32;
      font-size: 14px;
    }

    mat-card-header {
      text-align: center;
      margin-bottom: 32px;
    }

    mat-card-title {
      color: #333;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    mat-card-subtitle {
      color: #666;
      font-size: 16px;
      line-height: 1.5;
    }

    mat-form-field {
      margin-bottom: 8px;
    }

    .mat-mdc-form-field {
      width: 100%;
    }

    .mat-mdc-form-field-appearance-outline .mat-mdc-form-field-outline {
      border-radius: 8px;
    }

    .mat-mdc-form-field-appearance-outline.mat-focused .mat-mdc-form-field-outline-thick {
      color: #667eea;
    }

    .mat-mdc-raised-button {
      height: 48px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
    }

    .mat-mdc-raised-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
    }

    .mat-mdc-icon-button {
      color: #666;
      transition: color 0.3s ease;
    }

    .mat-mdc-icon-button:hover {
      color: #333;
    }

    /* Responsive Design */
    @media (max-width: 480px) {
      .register-container {
        padding: 16px;
      }
      
      .register-card {
        padding: 24px;
        max-width: 100%;
      }
      
      mat-card-title {
        font-size: 24px;
      }
      
      mat-card-subtitle {
        font-size: 14px;
      }
    }
  `]
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const credentials: RegisterCredentials = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password
      };

      this.authService.register(credentials).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.successMessage = response.message;
            // Redirect to login after successful registration
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
    }
  }
} 