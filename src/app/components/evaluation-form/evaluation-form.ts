import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EvaluationSuccessDialog } from '../evaluation-success-dialog/evaluation-success-dialog';
import { EvaluationService } from '../../services/evaluation';
import { JobApplicationService } from '../../services/job-application';
import { JobApplication } from '../../models/job-application.model';

@Component({
  selector: 'app-evaluation-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule
  ],
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.scss']
})
export class EvaluationFormComponent implements OnInit {
  evaluationForm: any;
  jobs: JobApplication[] = [];

  constructor(private fb: FormBuilder, private evaluationService: EvaluationService, private jobApplicationService: JobApplicationService, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.evaluationForm = this.fb.group({
      jobId: ['', Validators.required],
      preparationScore: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      difficulty: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      questionsAsked: ['', Validators.required],
      conceptsMissed: ['']
      // Add required fields for backend: role, interviewDate, company, questions
    });
    // keep constructor light — jobs are loaded in ngOnInit
  }

  ngOnInit(): void {
    this.jobApplicationService.getApplications().subscribe({ next: (apps) => this.jobs = apps || [] });
  }

  onSubmit(): void {
    if (this.evaluationForm.valid) {
      const formValue = this.evaluationForm.value;
      // Build request body per backend contract
      const selectedJobId = Number(formValue.jobId);
      const selectedJob = this.jobs.find(j => Number((j as any).id) === selectedJobId);
      const evaluationReq: any = {
        jobId: selectedJobId,
        preparationScore: Number(formValue.preparationScore),
        difficulty: Number(formValue.difficulty),
        questionsAsked: formValue.questionsAsked,
        conceptsMissed: formValue.conceptsMissed
      };
      if (selectedJob) {
        evaluationReq.company = (selectedJob as any).companyName || (selectedJob as any).company || '';
        evaluationReq.role = (selectedJob as any).role || '';
      }

      this.evaluationService.addEvaluation(evaluationReq).subscribe({ next: () => {
        this.evaluationForm.reset();
        // open success dialog
        this.dialog.open(EvaluationSuccessDialog, {
          data: {
            title: 'Evaluation Saved',
            message: 'Your evaluation has been saved successfully.'
          },
          width: '520px'
        });
      }, error: (err) => {
        console.error('Evaluation save failed', err);
        this.snackBar.open('Failed to save evaluation', 'OK', { duration: 3000 });
      }});
    }
  }
}

