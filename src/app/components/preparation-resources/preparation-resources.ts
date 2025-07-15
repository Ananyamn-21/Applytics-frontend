import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SkillService } from '../../services/skill';
import { Skill, SkillResource } from '../../models/skill.model';

@Component({
  selector: 'app-preparation-resources',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './preparation-resources.component.html',
  styleUrls: ['./preparation-resources.component.scss']
})
export class PreparationResourcesComponent {
  @Input() skillName: string = '';
  resources: SkillResource[] = [];
  isPrepared: boolean = false;
  notes: string = '';
  newResourceUrl: string = '';
  newResourceTitle: string = '';

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources(): void {
    this.skillService.getSkill(this.skillName).subscribe({
      next: (skill) => {
        if (skill) {
          this.resources = skill.resources;
          this.isPrepared = skill.isPrepared;
          this.notes = skill.notes || '';
        }
      },
      error: (err: any) => console.error('Failed to load resources', err)
    });
  }

  togglePreparation(): void {
    this.isPrepared = !this.isPrepared;
    this.savePreparationStatus();
  }

  savePreparationStatus(): void {
    this.skillService.updateSkill(this.skillName, {
      isPrepared: this.isPrepared,
      notes: this.notes
    }).subscribe({
      error: (err: any) => console.error('Failed to update skill', err)
    });
  }

  addResource(): void {
    if (this.newResourceTitle && this.newResourceUrl) {
      const newResource: Omit<SkillResource, 'createdAt'> = {
        title: this.newResourceTitle,
        url: this.newResourceUrl,
        type: this.determineResourceType(this.newResourceUrl)
      };

      this.skillService.addResourceToSkill(this.skillName, newResource).subscribe({
        next: (skill) => {
          if (skill) {
            this.resources = skill.resources;
          }
          this.newResourceTitle = '';
          this.newResourceUrl = '';
        },
        error: (err: any) => console.error('Failed to add resource', err)
      });
    }
  }

  determineResourceType(url: string): 'Documentation' | 'Video' | 'Article' | 'Course' | 'Code Example' {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'Video';
    } else if (url.includes('docs') || url.includes('documentation')) {
      return 'Documentation';
    } else if (url.includes('github.com')) {
      return 'Code Example';
    } else if (url.includes('course') || url.includes('udemy') || url.includes('coursera')) {
      return 'Course';
    } else {
      return 'Article';
    }
  }

  getResourceIcon(type: string): string {
    switch(type.toLowerCase()) {
      case 'video': return 'play_circle';
      case 'documentation': return 'menu_book';
      case 'code example': return 'code';
      case 'article': return 'article';
      case 'course': return 'school';
      default: return 'link';
    }
  }

  openResource(url: string): void {
    window.open(url, '_blank');
  }
}