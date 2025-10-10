import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatCardModule } from '@angular/material/card';
import { JobApplicationService } from '../../services/job-application';
import { EvaluationService } from '../../services/evaluation';
import { startOfDay } from 'date-fns';
import { JobApplication } from '../../models/job-application.model';
import { Evaluation } from '../../models/evaluation.model';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    CalendarModule
  ],
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent {
  viewDate: Date = new Date();
  events: any[] = [];

  constructor(
    private jobApplicationService: JobApplicationService,
    private evaluationService: EvaluationService
  ) {
    this.loadEvents();
  }

  loadEvents(): void {
    this.jobApplicationService.getApplications().subscribe((applications: JobApplication[]) => {
      const applicationEvents = applications.map((app: JobApplication) => ({
        start: startOfDay(new Date(app.dateApplied)),
        title: `Applied: ${app.companyName} - ${app.role}`,
        color: { primary: '#3f51b5', secondary: '#D1E8FF' }
      }));

      this.evaluationService.getEvaluations().subscribe((evaluations: Evaluation[]) => {
        const interviewEvents = evaluations.map((evaluation: Evaluation) => ({
          start: startOfDay(new Date(evaluation.interviewDate)),
          title: `Interview: ${evaluation.company} - ${evaluation.role}`,
          color: { primary: '#ff9800', secondary: '#FDF8BA' }
        }));

        this.events = [...applicationEvents, ...interviewEvents];
      });
    });
  }
}