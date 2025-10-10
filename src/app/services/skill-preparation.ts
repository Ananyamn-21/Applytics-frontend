import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SkillPreparation } from '../models/skill-preparation.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillPreparationService {
  private apiUrl = `${environment.API_URL}/skills`;

  constructor(private http: HttpClient) {}

  getSkillsByJob(jobId: number): Observable<SkillPreparation[]> {
    return this.http.get<SkillPreparation[]>(`${this.apiUrl}/job/${jobId}`);
  }

  updateSkill(id: number, data: Partial<SkillPreparation>): Observable<SkillPreparation> {
    return this.http.put<SkillPreparation>(`${this.apiUrl}/${id}`, data);
  }

  // New: patch progress/status using query params
  updateSkillProgressAndStatus(id: number, progress?: number, status?: string): Observable<SkillPreparation> {
    const params: string[] = [];
    if (progress !== undefined && progress !== null) {
      params.push(`progress=${encodeURIComponent(String(progress))}`);
    }
    if (status !== undefined && status !== null) {
      params.push(`status=${encodeURIComponent(status)}`);
    }
    const query = params.length ? `?${params.join('&')}` : '';
    return this.http.patch<SkillPreparation>(`${this.apiUrl}/${id}/update-progress${query}`, null);
  }
}
