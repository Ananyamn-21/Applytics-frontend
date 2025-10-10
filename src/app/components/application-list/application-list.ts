import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { JobApplicationService } from '../../services/job-application';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StatusUpdateDialogComponent } from './status-update-dialog';
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

  constructor(
    private jobApplicationService: JobApplicationService,
    private dialog: MatDialog,
    private router: Router
  ) {}

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
      case 'applied': return 'primary';
      case 'interview': return 'accent';
      case 'selected': return 'success';
      case 'rejected': return 'warn';
      default: return '';
    }
  }

  openStatusDialog(application: JobApplication): void {
    const dialogRef = this.dialog.open(StatusUpdateDialogComponent, {
      data: { status: application.status }
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result && result !== application.status) {
        this.jobApplicationService.updateStatus(application.id!, result as JobApplication['status']).subscribe(() => {
          this.loadApplications();
        });
      }
    });
  }

  goToSkillPreparation(jobId: string): void {
    this.router.navigate(['/skills/job', jobId]);
  }
}