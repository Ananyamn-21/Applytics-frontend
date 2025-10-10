import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { JobApplicationService } from '../../services/job-application';
import { JobApplication } from '../../models/job-application.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skill-tracker',
  standalone: true,
  imports: [
    CommonModule,
  MatCardModule,
  MatProgressBarModule,
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatChipsModule
  ],
  templateUrl: './skill-tracker.component.html',
  styleUrls: ['./skill-tracker.component.scss']
})
export class SkillTrackerComponent {
  jobs: JobApplication[] = [];

  constructor(
    private jobApplicationService: JobApplicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobApplicationService.getApplications().subscribe((apps: JobApplication[]) => {
      this.jobs = apps;
    });
  }

  goToSkillPreparation(jobId?: string): void {
    if (!jobId) return;
    this.router.navigate(['/skills/job', jobId]);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'applied': return 'primary';
      case 'interview': return 'accent';
      case 'selected': return 'success';
      case 'rejected': return 'warn';
      default: return '';
    }
  }

  getSkillIcon(skillName: string): string {
    const techIcons: Record<string, string> = {
      'angular': 'code',
      'react': 'react',
      'vue': 'vuejs',
      'javascript': 'javascript',
      'typescript': 'typescript',
      'node': 'nodejs',
      'python': 'python',
      'java': 'java',
      'spring': 'leaf',
      'docker': 'docker',
      'aws': 'aws',
      'sql': 'database',
      'mongodb': 'database'
    };

    const lowerName = skillName.toLowerCase();
    return techIcons[lowerName] || 'code';
  }
}