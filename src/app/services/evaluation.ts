import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Evaluation } from '../models/evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private evaluations: Evaluation[] = [
    {
      id: '1',
      interviewDate: new Date('2024-01-20'),
      company: 'Google',
      role: 'Software Engineer',
      questions: 'System design, algorithms, behavioral questions',
      conceptsMissed: 'Some advanced system design concepts',
      difficulty: 'Hard',
      preparationScore: 7,
      notes: 'Good performance but need to improve system design',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      interviewDate: new Date('2024-01-25'),
      company: 'Microsoft',
      role: 'Frontend Developer',
      questions: 'React, JavaScript, CSS, behavioral',
      conceptsMissed: 'Advanced React patterns',
      difficulty: 'Medium',
      preparationScore: 8,
      notes: 'Strong performance in frontend concepts',
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25')
    }
  ];

  getEvaluations(): Observable<Evaluation[]> {
    return of(this.evaluations);
  }

  getEvaluation(id: string): Observable<Evaluation | undefined> {
    const evaluation = this.evaluations.find(e => e.id === id);
    return of(evaluation);
  }

  addEvaluation(evaluation: Omit<Evaluation, 'id'>): Observable<Evaluation> {
    const newEvaluation: Evaluation = {
      ...evaluation,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.evaluations.push(newEvaluation);
    return of(newEvaluation);
  }

  updateEvaluation(id: string, evaluation: Partial<Evaluation>): Observable<Evaluation> {
    const index = this.evaluations.findIndex(e => e.id === id);
    if (index !== -1) {
      this.evaluations[index] = {
        ...this.evaluations[index],
        ...evaluation,
        updatedAt: new Date()
      };
      return of(this.evaluations[index]);
    }
    throw new Error('Evaluation not found');
  }

  deleteEvaluation(id: string): Observable<void> {
    const index = this.evaluations.findIndex(e => e.id === id);
    if (index !== -1) {
      this.evaluations.splice(index, 1);
    }
    return of(void 0);
  }

  getEvaluationStats(): Observable<{ total: number; averagePreparationScore: number; difficultyBreakdown: { easy: number; medium: number; hard: number } }> {
    const stats = {
      total: this.evaluations.length,
      averagePreparationScore: this.evaluations.length > 0 
        ? this.evaluations.reduce((sum, e) => sum + e.preparationScore, 0) / this.evaluations.length 
        : 0,
      difficultyBreakdown: {
        easy: this.evaluations.filter(e => e.difficulty === 'Easy').length,
        medium: this.evaluations.filter(e => e.difficulty === 'Medium').length,
        hard: this.evaluations.filter(e => e.difficulty === 'Hard').length
      }
    };
    return of(stats);
  }
}
