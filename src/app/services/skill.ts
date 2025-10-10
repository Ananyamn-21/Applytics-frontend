import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Skill, SkillResource } from '../models/skill.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = `${environment.API_URL}/skills`;
  // Removed mock skill data, using backend only

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiUrl);
  }

  constructor(private http: HttpClient) {}

  getSkill(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/${id}`);
  }

  addSkill(skill: Omit<Skill, 'createdAt' | 'updatedAt'>): Observable<Skill> {
    return this.http.post<Skill>(this.apiUrl, skill);
  }

  updateSkill(id: number, updates: Partial<Skill>): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiUrl}/${id}`, updates);
  }

  deleteSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addResourceToSkill(id: number, resource: Omit<SkillResource, 'createdAt'>): Observable<Skill> {
    return this.http.post<Skill>(`${this.apiUrl}/${id}/resources`, resource);
  }

  getSkillStats(): Observable<{ totalSkills: number; preparedSkills: number; timeSpent: { skill: string; hours: number }[] }> {
    return this.http.get<{ totalSkills: number; preparedSkills: number; timeSpent: { skill: string; hours: number }[] }>(`${this.apiUrl}/stats`);
  }
}
