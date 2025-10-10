import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { JobApplicationService } from '../../services/job-application';
import { JobApplication } from '../../models/job-application.model'

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
  ],
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  @Input() application: JobApplication | null = null;
  
  statusOptions = ['Applied', 'Interview Scheduled', 'Rejected', 'Selected'];
  applicationForm: any;

  constructor(
    private fb: FormBuilder,
    private jobApplicationService: JobApplicationService
  ) {}

  ngOnInit(): void {
    this.applicationForm = this.fb.group({
      companyName: ['', Validators.required],
      role: ['', Validators.required],
      jdUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      jdText: [''],
      dateApplied: [new Date().toISOString().slice(0, 10), Validators.required],
      status: ['applied', Validators.required],
      notes: ['']
    });

    if (this.application) {
      const applicationData = {
        ...this.application,
        dateApplied: typeof this.application.dateApplied === 'string'
          ? this.application.dateApplied
          : new Date(this.application.dateApplied).toISOString().slice(0, 10)
      };
      this.applicationForm.patchValue(applicationData);
    }
  }

  onSubmit(): void {
    if (this.applicationForm.valid) {
      const formValue = this.applicationForm.value;
      const application: Partial<JobApplication> = {
        companyName: formValue.companyName || '',
        role: formValue.role || '',
        jdUrl: formValue.jdUrl || '',
        jdText: formValue.jdText || '',
        dateApplied: formValue.dateApplied || new Date().toISOString().slice(0, 10),
        status: formValue.status || 'applied',
        notes: formValue.notes
      };

      if (this.application?.id) {
        this.jobApplicationService.updateApplication(this.application.id, application).subscribe();
      } else {
        this.jobApplicationService.addApplication(application as Omit<JobApplication, 'id'>).subscribe();
      }
    }
  }
}