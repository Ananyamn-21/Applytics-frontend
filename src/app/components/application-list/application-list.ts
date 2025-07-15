import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { JobApplicationService } from '../../services/job-application';
import { JobApplication } from '../../models/job-application.model';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent {
  displayedColumns: string[] = ['companyName', 'role', 'applicationDate', 'status', 'actions'];
  dataSource: JobApplication[] = [];

  constructor(private jobApplicationService: JobApplicationService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.jobApplicationService.getApplications().subscribe((applications: JobApplication[]) => {
      this.dataSource = applications;
    });
  }

  deleteApplication(id: string): void {
    this.jobApplicationService.deleteApplication(id).subscribe(() => {
      this.loadApplications();
    });
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'Applied': return 'primary';
      case 'Interview Scheduled': return 'accent';
      case 'Selected': return 'success';
      case 'Rejected': return 'warn';
      default: return '';
    }
  }
}