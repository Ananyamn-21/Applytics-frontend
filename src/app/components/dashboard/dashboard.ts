import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule, MatChipListbox } from '@angular/material/chips';
import { JobApplicationService } from '../../services/job-application';
import { DashboardService } from '../../services/dashboard';
import { JobApplication } from '../../models/job-application.model';
import { FlashcardService } from '../../services/flashcard';
import { Flashcard } from '../../models/flashcard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatChipListbox
  ],
  template: `
    <div class="dashboard-root">
      <div class="dashboard-grid">
        <mat-card class="stat-card">
          <div class="stat-title">Total Applications</div>
          <div class="stat-value">{{ stats.total }}</div>
        </mat-card>
        <mat-card class="stat-card">
          <div class="stat-title">Interviews</div>
          <div class="stat-value">{{ stats.interview }}</div>
        </mat-card>
        <mat-card class="stat-card">
          <div class="stat-title">Selected</div>
          <div class="stat-value selected">{{ stats.selected }}</div>
        </mat-card>
        <mat-card class="stat-card">
          <div class="stat-title">Rejected</div>
          <div class="stat-value rejected">{{ stats.rejected }}</div>
        </mat-card>
        <mat-card class="stat-card">
          <div class="stat-title">Skills In Progress</div>
          <div class="stat-value">{{ stats.skillsInProgress }}</div>
        </mat-card>
        <mat-card class="stat-card">
          <div class="stat-title">Skills Completed</div>
          <div class="stat-value">{{ stats.skillsCompleted }}</div>
        </mat-card>
      </div>

      
      <mat-card class="flashcard-carousel">
        <div class="carousel-header">
          <mat-icon>school</mat-icon>
          <span>Flashcards</span>
        </div>
        <div class="carousel-body">
          <button mat-icon-button (click)="prevFlashcard()" [disabled]="flashcards.length <= 1">
            <mat-icon>chevron_left</mat-icon>
          </button>
          <div class="flashcard-content" *ngIf="flashcards.length">
            <div class="flashcard-question">{{ currentFlashcard?.question }}</div>
            <div class="flashcard-answer" [class.revealed]="showAnswer">
              <span *ngIf="showAnswer">{{ currentFlashcard?.answer }}</span>
              <button mat-stroked-button color="primary" (click)="showAnswer = !showAnswer">
                {{ showAnswer ? 'Hide Answer' : 'Show Answer' }}
              </button>
            </div>
            <div class="flashcard-tags" *ngIf="currentFlashcard">
              <mat-chip-listbox *ngIf="currentFlashcard.tags && currentFlashcard.tags.length">
                <mat-chip *ngFor="let tag of currentFlashcard.tags">{{ tag }}</mat-chip>
              </mat-chip-listbox>
            </div>
          </div>
          <button mat-icon-button (click)="nextFlashcard()" [disabled]="flashcards.length <= 1">
            <mat-icon>chevron_right</mat-icon>
          </button>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-root {
      display: flex;
      flex-direction: column;
      gap: 32px;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 8px;
    }
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 24px;
      margin-bottom: 8px;
    }
    .stat-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(102, 126, 234, 0.08);
      padding: 24px 16px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-height: 120px;
      transition: box-shadow 0.2s;
    }
    .stat-card:hover {
      box-shadow: 0 8px 32px rgba(102, 126, 234, 0.18);
    }
    .stat-title {
      font-size: 16px;
      color: #667eea;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .stat-value {
      font-size: 32px;
      font-weight: 700;
      color: #333;
    }
    .stat-value.selected {
      color: #43a047;
    }
    .stat-value.rejected {
      color: #d32f2f;
    }
    .progress-card {
      margin: 0 auto;
      max-width: 500px;
      width: 100%;
      padding: 24px 16px;
      border-radius: 16px;
      background: white;
      box-shadow: 0 4px 24px rgba(102, 126, 234, 0.08);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
    .progress-title {
      font-size: 18px;
      font-weight: 600;
      color: #764ba2;
      margin-bottom: 8px;
    }
    .progress-label {
      font-size: 16px;
      color: #333;
      margin-top: 8px;
      font-weight: 500;
    }
    .flashcard-carousel {
      margin: 0 auto;
      max-width: 600px;
      width: 100%;
      padding: 32px 16px;
      border-radius: 20px;
      background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
      box-shadow: 0 8px 32px rgba(102, 126, 234, 0.12);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    .carousel-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 20px;
      font-weight: 700;
      color: #667eea;
      margin-bottom: 12px;
    }
    .carousel-body {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      justify-content: center;
    }
    .flashcard-content {
      background: white;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.08);
      padding: 24px 20px;
      min-width: 220px;
      max-width: 340px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      transition: box-shadow 0.2s;
    }
    .flashcard-question {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
      text-align: center;
    }
    .flashcard-answer {
      font-size: 16px;
      color: #764ba2;
      margin-bottom: 8px;
      text-align: center;
      min-height: 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .flashcard-answer.revealed {
      color: #43a047;
    }
    .flashcard-tags {
      margin-top: 8px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      justify-content: center;
    }
    mat-chip-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    mat-chip {
      background: #e0e7ff;
      color: #667eea;
      font-weight: 500;
      border-radius: 8px;
      font-size: 13px;
      padding: 0 8px;
    }
    @media (max-width: 900px) {
      .dashboard-grid {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      }
      .flashcard-carousel {
        max-width: 100%;
        padding: 24px 4px;
      }
    }
    @media (max-width: 600px) {
      .dashboard-root {
        gap: 20px;
        padding: 0 2px;
      }
      .dashboard-grid {
        gap: 12px;
      }
      .stat-card, .progress-card, .flashcard-carousel {
        padding: 16px 6px;
        border-radius: 12px;
      }
      .flashcard-content {
        padding: 12px 6px;
        border-radius: 10px;
      }
      .carousel-header {
        font-size: 16px;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  stats = {
    total: 0,
    applied: 0,
    interview: 0,
    rejected: 0,
    selected: 0,
    skillsInProgress: 0,
    skillsCompleted: 0
  };

  flashcards: Flashcard[] = [];
  currentFlashcardIndex = 0;
  showAnswer = false;

  constructor(
    private jobApplicationService: JobApplicationService,
    private dashboardService: DashboardService,
    private flashcardService: FlashcardService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadFlashcards();
  }
  loadStats(): void {
    // Fetch dashboard summary from backend and map to local stats
    this.dashboardService.getSummary().subscribe({
      next: (summary) => {
  this.stats.total = (summary as any).totalJobs ?? 0;
  this.stats.applied = (summary as any).applied ?? 0;
  this.stats.interview = (summary as any).interviewing ?? 0;
  // Map skill-related summary fields
  (this.stats as any).skillsInProgress = (summary as any).skillsInProgress ?? 0;
  (this.stats as any).skillsCompleted = (summary as any).skillsCompleted ?? 0;
  // Backend doesn't return selected/rejected in this summary; leave as 0 or compute separately if needed
  this.stats.selected = 0;
  this.stats.rejected = 0;
      },
      error: (err) => {
        console.warn('Dashboard summary failed, falling back to apps', err);
        this.jobApplicationService.getApplications().subscribe((applications: JobApplication[]) => {
          this.stats.total = applications.length;
          this.stats.applied = applications.filter((a: JobApplication) => a.status === 'applied').length;
          this.stats.interview = applications.filter((a: JobApplication) => a.status === 'interview').length;
          this.stats.rejected = applications.filter((a: JobApplication) => a.status === 'rejected').length;
          this.stats.selected = applications.filter((a: JobApplication) => a.status === 'selected').length;
        });
      }
    });
  }

  loadFlashcards(): void {
    this.flashcardService.getFlashcards().subscribe(cards => {
      this.flashcards = cards || [];
      this.currentFlashcardIndex = 0;
      this.showAnswer = false;
    });
  }

  get currentFlashcard(): Flashcard | null {
    return this.flashcards.length ? this.flashcards[this.currentFlashcardIndex] : null;
  }

  nextFlashcard(): void {
    if (this.flashcards.length > 1) {
      this.currentFlashcardIndex = (this.currentFlashcardIndex + 1) % this.flashcards.length;
      this.showAnswer = false;
    }
  }

  prevFlashcard(): void {
    if (this.flashcards.length > 1) {
      this.currentFlashcardIndex = (this.currentFlashcardIndex - 1 + this.flashcards.length) % this.flashcards.length;
      this.showAnswer = false;
    }
  }

  getProgressValue(): number {
    if (this.stats.total === 0) return 0;
    return (this.stats.selected / this.stats.total) * 100;
  }
}