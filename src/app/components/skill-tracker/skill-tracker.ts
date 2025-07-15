import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SkillService } from '../../services/skill';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-skill-tracker',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './skill-tracker.component.html',
  styleUrls: ['./skill-tracker.component.scss']
})
export class SkillTrackerComponent {
  skills: Skill[] = [];
  preparedCount = 0;
  totalCount = 0;
  progressValue = 0;

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.skillService.getSkills().subscribe((skills: Skill[]) => {
      this.skills = skills;
      this.totalCount = skills.length;
      this.preparedCount = skills.filter((s: Skill) => s.isPrepared).length;
      this.progressValue = (this.preparedCount / this.totalCount) * 100;
    });
  }

  togglePreparation(skill: Skill): void {
    skill.isPrepared = !skill.isPrepared;
    this.skillService.updateSkill(skill.name, { isPrepared: skill.isPrepared }).subscribe(() => {
      this.loadSkills();
    });
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