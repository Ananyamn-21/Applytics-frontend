import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JobApplication } from '../models/job-application.model';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  private apiUrl = 'http://localhost:8080/api/jobs';

  constructor(private http: HttpClient) {}

  getApplications(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(this.apiUrl);
  }

  getApplication(id: string): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${this.apiUrl}/${id}`);
  }

  addApplication(application: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>): Observable<JobApplication> {
    return this.http.post<JobApplication>(this.apiUrl, application);
  }

  updateApplication(id: string, application: Partial<JobApplication>): Observable<JobApplication> {
    return this.http.put<JobApplication>(`${this.apiUrl}/${id}`, application);
  }

  deleteApplication(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getApplicationStats(): Observable<{ total: number; applied: number; interview: number; rejected: number; selected: number }> {
    return this.http.get<{ total: number; applied: number; interview: number; rejected: number; selected: number }>(`${this.apiUrl}/stats`);
  }
}
