import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule
  ],
  template: `
    <!-- Show navigation only when authenticated -->
    <div *ngIf="authService.isAuthenticated()" class="app-container">
      <mat-toolbar color="primary" class="app-toolbar">
        <button mat-icon-button (click)="sidenav.toggle()" class="menu-button">
          <mat-icon>menu</mat-icon>
        </button>
        <div class="toolbar-content">
          <div class="app-title">
            <mat-icon class="title-icon">work</mat-icon>
            <span>Interview Tracker</span>
          </div>
          <div class="user-info">
            <span class="welcome-text">Welcome, {{ getCurrentUserName() }}</span>
            <button mat-icon-button (click)="logout()" matTooltip="Logout" class="logout-button">
              <mat-icon>logout</mat-icon>
            </button>
          </div>
        </div>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #sidenav mode="side" opened class="app-sidenav">
          <div class="sidenav-header">
            <mat-icon class="sidenav-icon">dashboard</mat-icon>
            <span class="sidenav-title">Navigation</span>
          </div>
          
          <mat-nav-list class="nav-list">
            <a mat-list-item routerLink="/dashboard" routerLinkActive="active" class="nav-item">
              <mat-icon class="nav-icon">dashboard</mat-icon>
              <span class="nav-text">Dashboard</span>
            </a>
            
            <a mat-list-item routerLink="/applications" routerLinkActive="active" class="nav-item">
              <mat-icon class="nav-icon">work</mat-icon>
              <span class="nav-text">Applications</span>
            </a>
            
            <a mat-list-item routerLink="/application-form" routerLinkActive="active" class="nav-item">
              <mat-icon class="nav-icon">add_circle</mat-icon>
              <span class="nav-text">Add Application</span>
            </a>
            
            <a mat-list-item routerLink="/calendar" routerLinkActive="active" class="nav-item">
              <mat-icon class="nav-icon">calendar_today</mat-icon>
              <span class="nav-text">Calendar</span>
            </a>
            
            <a mat-list-item routerLink="/skills" routerLinkActive="active" class="nav-item">
              <mat-icon class="nav-icon">psychology</mat-icon>
              <span class="nav-text">Skills</span>
            </a>
            
            <a mat-list-item routerLink="/evaluations" routerLinkActive="active" class="nav-item">
              <mat-icon class="nav-icon">assessment</mat-icon>
              <span class="nav-text">Evaluations</span>
            </a>
            
            <a mat-list-item routerLink="/flashcards" routerLinkActive="active" class="nav-item">
              <mat-icon class="nav-icon">school</mat-icon>
              <span class="nav-text">Flash Cards</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content class="main-content">
          <div class="content-wrapper">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>

    <!-- Show only router outlet for auth pages -->
    <div *ngIf="!authService.isAuthenticated()" class="auth-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .toolbar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0 16px;
    }

    .app-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 20px;
      font-weight: 600;
      color: white;
    }

    .title-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .welcome-text {
      color: white;
      font-size: 14px;
      opacity: 0.9;
    }

    .logout-button {
      color: white;
    }

    .menu-button {
      color: white;
    }

    .sidenav-container {
      height: calc(100vh - 64px);
      margin-top: 64px;
    }

    .app-sidenav {
      width: 280px;
      background: #f8f9fa;
      border-right: 1px solid #e9ecef;
    }

    .sidenav-header {
      padding: 24px 16px 16px;
      border-bottom: 1px solid #e9ecef;
      background: white;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .sidenav-icon {
      color: #667eea;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .sidenav-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .nav-list {
      padding: 16px 0;
    }

    .nav-item {
      margin: 4px 16px;
      border-radius: 8px;
      transition: all 0.3s ease;
      height: 48px;
    }

    .nav-item:hover {
      background-color: rgba(102, 126, 234, 0.1);
      transform: translateX(4px);
    }

    .nav-item.active {
      background-color: #667eea;
      color: white;
    }

    .nav-item.active .nav-icon {
      color: white;
    }

    .nav-icon {
      margin-right: 12px;
      color: #666;
      transition: color 0.3s ease;
    }

    .nav-text {
      font-weight: 500;
      font-size: 14px;
    }

    .main-content {
      background: #f8f9fa;
      min-height: calc(100vh - 64px);
    }

    .content-wrapper {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .auth-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .app-sidenav {
        width: 250px;
      }
      
      .content-wrapper {
        padding: 16px;
      }
      
      .toolbar-content {
        padding: 0 8px;
      }
      
      .app-title {
        font-size: 18px;
      }
      
      .welcome-text {
        display: none;
      }
    }

    @media (max-width: 480px) {
      .app-sidenav {
        width: 220px;
      }
      
      .content-wrapper {
        padding: 12px;
      }
    }
  `]
})
export class App {
  title = 'interview-tracker';

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getCurrentUserName(): string {
    const user = this.authService.getCurrentUser();
    console.log('Current user:', user);
    console.log('Is authenticated:', this.authService.isAuthenticated());
    return user?.name || user?.username || 'User';
  }
}