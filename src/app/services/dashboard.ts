import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface DashboardSummary {
  interviewing: number;
  skillsInProgress: number;
  applied: number;
  skillsCompleted: number;
  totalJobs: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private apiUrl = `${environment.API_URL}/dashboard`;

  constructor(private http: HttpClient) {}

  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.apiUrl}/summary`).pipe(
      catchError((err) => {
        console.warn('Failed to fetch dashboard summary, falling back', err);
        return of({ interviewing: 0, skillsInProgress: 0, applied: 0, skillsCompleted: 0, totalJobs: 0 });
      })
    );
  }
}
