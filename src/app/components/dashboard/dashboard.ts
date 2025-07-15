import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { JobApplicationService } from '../../services/job-application';
import { JobApplication } from '../../models/job-application.model';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    ChartModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  stats = {
    total: 0,
    applied: 0,
    interview: 0,
    rejected: 0,
    selected: 0
  };

  chartData: any;
  chartOptions: any;

  constructor(
    private jobApplicationService: JobApplicationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.setupChart();
  }

  loadStats(): void {
    this.jobApplicationService.getApplications().subscribe((applications: JobApplication[]) => {
      this.stats.total = applications.length;
      this.stats.applied = applications.filter((a: JobApplication) => a.status === 'Applied').length;
      this.stats.interview = applications.filter((a: JobApplication) => a.status === 'Interview Scheduled').length;
      this.stats.rejected = applications.filter((a: JobApplication) => a.status === 'Rejected').length;
      this.stats.selected = applications.filter((a: JobApplication) => a.status === 'Selected').length;

      this.updateChart();
    });
  }

  setupChart(): void {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      
      this.chartOptions = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };
    } else {
      // Fallback for SSR
      this.chartOptions = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: '#000000'
            }
          }
        }
      };
    }
  }

  updateChart(): void {
    this.chartData = {
      labels: ['Applied', 'Interview', 'Rejected', 'Selected'],
      datasets: [
        {
          data: [this.stats.applied, this.stats.interview, this.stats.rejected, this.stats.selected],
          backgroundColor: [
            '#42A5F5',
            '#FFA726',
            '#EF5350',
            '#66BB6A'
          ],
          hoverBackgroundColor: [
            '#64B5F6',
            '#FFB74D',
            '#E57373',
            '#81C784'
          ]
        }
      ]
    };
  }

  getProgressValue(): number {
    if (this.stats.total === 0) return 0;
    return (this.stats.selected / this.stats.total) * 100;
  }
}