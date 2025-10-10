import { Injectable } from '@angular/core';
import { Observable, of, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Flashcard } from '../models/flashcard.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private apiUrl = `${environment.API_URL}/flashcards`;

  constructor(private http: HttpClient) {}

  getFlashcards(): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(this.apiUrl).pipe(
      catchError(() => {
        console.warn('Backend not available, using mock flashcards');
        return of([
          {
            id: '1',
            question: 'What is Angular?',
            answer: 'Angular is a platform for building mobile and desktop web applications using TypeScript/JavaScript and other languages.',
            tags: ['angular', 'frontend', 'typescript'],
            source: 'Interview Prep',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '2',
            question: 'Explain dependency injection in Angular',
            answer: 'Dependency injection is a design pattern where dependencies are provided to a class instead of the class creating them itself. Angular has a built-in DI system.',
            tags: ['angular', 'dependency-injection', 'design-patterns'],
            source: 'Interview Prep',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '3',
            question: 'What are Angular services?',
            answer: 'Services are singleton objects that can be injected into components and other services. They are used for sharing data and functionality across components.',
            tags: ['angular', 'services', 'singleton'],
            source: 'Interview Prep',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]);
      })
    );
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
    return this.http.get<{ name: string; count: number }[]>(`${this.apiUrl}/categories`).pipe(
      catchError(() => {
        console.warn('Backend not available, using mock categories');
        return of([
          { name: 'angular', count: 3 },
          { name: 'frontend', count: 2 },
          { name: 'typescript', count: 1 }
        ]);
      })
    );
  }
}
