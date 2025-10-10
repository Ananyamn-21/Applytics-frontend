import { Injectable } from '@angular/core';
import { Observable, of, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JobApplication } from '../models/job-application.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  updateStatus(id: string, status: 'applied' | 'interview' | 'rejected' | 'selected'): Observable<JobApplication> {
    // PATCH /jobs/:id/status?status=interview
    return this.http.patch<JobApplication>(`${this.apiUrl}/${id}/status?status=${status}`, null);
  }
  private apiUrl = `${environment.API_URL}/jobs`;

  constructor(private http: HttpClient) {}

  getApplications(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(this.apiUrl).pipe(
      catchError(() => {
        console.warn('Backend not available, using mock data');
        return of([]);
      })
    );
  }

  getApplication(id: string): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${this.apiUrl}/${id}`);
  }

  addApplication(application: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>): Observable<JobApplication> {
    // Map frontend keys to backend keys
    const reqBody = {
      companyName: application.companyName,
      role: application.role,
      jdUrl: application.jdUrl,
      jdText: application.jdText,
      dateApplied: application.dateApplied,
      status: application.status,
      notes: application.notes
    };
    return this.http.post<JobApplication>(this.apiUrl, reqBody,
      {
  headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  updateApplication(id: string, application: Partial<JobApplication>): Observable<JobApplication> {
    const reqBody = {
      companyName: application.companyName,
      role: application.role,
      jdUrl: application.jdUrl,
      jdText: application.jdText,
      dateApplied: application.dateApplied,
      status: application.status,
      notes: application.notes
    };
    return this.http.put<JobApplication>(`${this.apiUrl}/${id}`, reqBody);
  }

  deleteApplication(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getApplicationStats(): Observable<{ total: number; applied: number; interview: number; rejected: number; selected: number }> {
    return this.http.get<{ total: number; applied: number; interview: number; rejected: number; selected: number }>(`${this.apiUrl}/stats`).pipe(
      catchError(() => {
        console.warn('Backend not available, using mock stats');
        return of({ total: 0, applied: 0, interview: 0, rejected: 0, selected: 0 });
      })
    );
  }
}
