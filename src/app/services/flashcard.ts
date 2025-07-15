import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Flashcard } from '../models/flashcard.model';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private apiUrl = 'http://localhost:8080/api/flashcards';

  constructor(private http: HttpClient) {}

  getFlashcards(): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(this.apiUrl);
  }

  getFlashcard(id: string): Observable<Flashcard> {
    return this.http.get<Flashcard>(`${this.apiUrl}/${id}`);
  }

  addFlashcard(flashcard: Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt'>): Observable<Flashcard> {
    return this.http.post<Flashcard>(this.apiUrl, flashcard);
  }

  updateFlashcard(id: string, flashcard: Partial<Flashcard>): Observable<Flashcard> {
    return this.http.put<Flashcard>(`${this.apiUrl}/${id}`, flashcard);
  }

  deleteFlashcard(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getFlashcardsByJob(jobId: number): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(`${this.apiUrl}/job/${jobId}`);
  }

  getFlashcardsByTag(tag: string): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(`${this.apiUrl}/tag/${tag}`);
  }

  getFlashcardCategories(): Observable<{ name: string; count: number }[]> {
    return this.http.get<{ name: string; count: number }[]>(`${this.apiUrl}/categories`);
  }
}
