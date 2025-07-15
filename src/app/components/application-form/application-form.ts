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
      jobDescriptionUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      applicationDate: [new Date(), Validators.required],
      status: ['Applied', Validators.required],
      notes: ['']
    });

    if (this.application) {
      // Convert string date to Date object if needed
      const applicationData = {
        ...this.application,
        applicationDate: typeof this.application.applicationDate === 'string' 
          ? new Date(this.application.applicationDate) 
          : this.application.applicationDate
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
        jobDescriptionUrl: formValue.jobDescriptionUrl || '',
        applicationDate: formValue.applicationDate || new Date(),
        status: formValue.status || 'Applied',
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