import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { SkillExtractionService, ExtractedSkill } from '../../services/skill-extraction';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-jd-analyzer',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormsModule,
    MatDividerModule
  ],
  templateUrl: './jd-analyzer.component.html',
  styleUrls: ['./jd-analyzer.component.scss']
})
export class JdAnalyzerComponent {
  jdText: string = '';
  extractedSkills: ExtractedSkill[] = [];
  isLoading: boolean = false;

  constructor(private skillExtractionService: SkillExtractionService) {}

  analyzeJD(): void {
    if (this.jdText.trim()) {
      this.isLoading = true;
      this.skillExtractionService.extractSkills(this.jdText).subscribe({
        next: (skills: ExtractedSkill[]) => {
          this.extractedSkills = skills;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }

  clearAnalysis(): void {
    this.jdText = '';
    this.extractedSkills = [];
  }
}