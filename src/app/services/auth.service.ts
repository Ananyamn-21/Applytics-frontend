import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, tap, map, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: string;
  email?: string;
  username?: string;
  name?: string;
  createdAt?: Date;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      const token = localStorage.getItem('token');
      if (storedUser && token) {
        try {
          const user = JSON.parse(storedUser);
          this.currentUserSubject.next(user);
        } catch (e) {
          console.error('Error parsing stored user:', e);
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
        }
      }
    }
  }

  register(credentials: RegisterCredentials): Observable<{ success: boolean; message: string }> {
    return this.http.post<any>(`${this.apiUrl}/register`, credentials).pipe(
      map(() => ({ success: true, message: 'Registration successful!' })),
      // You can handle error mapping here if needed
    );
  }

  login(credentials: LoginCredentials): Observable<{ success: boolean; message: string; user?: User }> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token && response.status === 'success' && isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.token);
          const user: User = {
            id: '1',
            username: credentials.username,
            name: credentials.username,
            createdAt: new Date()
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      }),
      map(response => {
        if (response && response.status === 'success' && response.token) {
          const user: User = {
            id: '1',
            username: credentials.username,
            name: credentials.username,
            createdAt: new Date()
          };
          return { success: true, message: response.message || 'Login successful!', user };
        } else {
          return { success: false, message: response.message || 'Invalid credentials' };
        }
      }),
      catchError(error => {
        const message = error?.error?.message || error?.error || error?.message || 'Login failed. Please try again.';
        return of({ success: false, message });
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
    }
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const currentUser = this.currentUserSubject.value;
      return !!token && !!currentUser;
    }
    return false;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  setCurrentUser(user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
  }
} 