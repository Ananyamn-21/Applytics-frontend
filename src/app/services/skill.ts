import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Skill, SkillResource } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private skills: Skill[] = [
    {
      name: 'Angular',
      isPrepared: true,
      notes: 'Strong understanding of Angular framework',
      hoursSpent: 50,
      resources: [
        {
          title: 'Angular Documentation',
          url: 'https://angular.io/docs',
          type: 'Documentation',
          createdAt: new Date('2024-01-01')
        },
        {
          title: 'Angular Tutorial',
          url: 'https://angular.io/tutorial',
          type: 'Course',
          createdAt: new Date('2024-01-02')
        }
      ],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      name: 'TypeScript',
      isPrepared: true,
      notes: 'Good understanding of TypeScript',
      hoursSpent: 30,
      resources: [
        {
          title: 'TypeScript Handbook',
          url: 'https://www.typescriptlang.org/docs/',
          type: 'Documentation',
          createdAt: new Date('2024-01-01')
        }
      ],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-10')
    },
    {
      name: 'React',
      isPrepared: false,
      notes: 'Need to learn React',
      hoursSpent: 0,
      resources: [],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    }
  ];

  getSkills(): Observable<Skill[]> {
    return of(this.skills);
  }

  getSkill(name: string): Observable<Skill | undefined> {
    const skill = this.skills.find(s => s.name === name);
    return of(skill);
  }

  addSkill(skill: Omit<Skill, 'createdAt' | 'updatedAt'>): Observable<Skill> {
    const newSkill: Skill = {
      ...skill,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.skills.push(newSkill);
    return of(newSkill);
  }

  updateSkill(name: string, updates: Partial<Skill>): Observable<Skill> {
    const index = this.skills.findIndex(s => s.name === name);
    if (index !== -1) {
      this.skills[index] = {
        ...this.skills[index],
        ...updates,
        updatedAt: new Date()
      };
      return of(this.skills[index]);
    }
    throw new Error('Skill not found');
  }

  deleteSkill(name: string): Observable<void> {
    const index = this.skills.findIndex(s => s.name === name);
    if (index !== -1) {
      this.skills.splice(index, 1);
    }
    return of(void 0);
  }

  addResourceToSkill(skillName: string, resource: Omit<SkillResource, 'createdAt'>): Observable<Skill> {
    const index = this.skills.findIndex(s => s.name === skillName);
    if (index !== -1) {
      const newResource: SkillResource = {
        ...resource,
        createdAt: new Date()
      };
      this.skills[index].resources.push(newResource);
      this.skills[index].updatedAt = new Date();
      return of(this.skills[index]);
    }
    throw new Error('Skill not found');
  }

  getSkillStats(): Observable<{ totalSkills: number; preparedSkills: number; timeSpent: { skill: string; hours: number }[] }> {
    const stats = {
      totalSkills: this.skills.length,
      preparedSkills: this.skills.filter(s => s.isPrepared).length,
      timeSpent: this.skills.map(s => ({ skill: s.name, hours: s.hoursSpent || 0 }))
    };
    return of(stats);
  }
}
