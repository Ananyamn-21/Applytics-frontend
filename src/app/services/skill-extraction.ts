import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ExtractedSkill {
  name: string;
  confidence: number;
  category: 'Programming Language' | 'Framework' | 'Tool' | 'Database' | 'Cloud' | 'Other';
}

@Injectable({
  providedIn: 'root'
})
export class SkillExtractionService {
  
  extractSkills(jobDescription: string): Observable<ExtractedSkill[]> {
    // Simple skill extraction logic - in a real app, this would use NLP or AI
    const skills: ExtractedSkill[] = [];
    
    const skillPatterns = [
      { pattern: /\b(JavaScript|JS)\b/gi, name: 'JavaScript', category: 'Programming Language' as const },
      { pattern: /\b(TypeScript|TS)\b/gi, name: 'TypeScript', category: 'Programming Language' as const },
      { pattern: /\b(Python)\b/gi, name: 'Python', category: 'Programming Language' as const },
      { pattern: /\b(Java)\b/gi, name: 'Java', category: 'Programming Language' as const },
      { pattern: /\b(React)\b/gi, name: 'React', category: 'Framework' as const },
      { pattern: /\b(Angular)\b/gi, name: 'Angular', category: 'Framework' as const },
      { pattern: /\b(Vue\.js|Vue)\b/gi, name: 'Vue.js', category: 'Framework' as const },
      { pattern: /\b(Node\.js|Node)\b/gi, name: 'Node.js', category: 'Framework' as const },
      { pattern: /\b(Express\.js|Express)\b/gi, name: 'Express.js', category: 'Framework' as const },
      { pattern: /\b(MongoDB)\b/gi, name: 'MongoDB', category: 'Database' as const },
      { pattern: /\b(PostgreSQL|Postgres)\b/gi, name: 'PostgreSQL', category: 'Database' as const },
      { pattern: /\b(MySQL)\b/gi, name: 'MySQL', category: 'Database' as const },
      { pattern: /\b(AWS|Amazon Web Services)\b/gi, name: 'AWS', category: 'Cloud' as const },
      { pattern: /\b(Azure)\b/gi, name: 'Azure', category: 'Cloud' as const },
      { pattern: /\b(GCP|Google Cloud Platform)\b/gi, name: 'Google Cloud Platform', category: 'Cloud' as const },
      { pattern: /\b(Docker)\b/gi, name: 'Docker', category: 'Tool' as const },
      { pattern: /\b(Kubernetes|K8s)\b/gi, name: 'Kubernetes', category: 'Tool' as const },
      { pattern: /\b(Git)\b/gi, name: 'Git', category: 'Tool' as const },
      { pattern: /\b(HTML5|HTML)\b/gi, name: 'HTML5', category: 'Programming Language' as const },
      { pattern: /\b(CSS3|CSS)\b/gi, name: 'CSS3', category: 'Programming Language' as const },
      { pattern: /\b(REST API|REST)\b/gi, name: 'REST API', category: 'Other' as const },
      { pattern: /\b(GraphQL)\b/gi, name: 'GraphQL', category: 'Other' as const },
      { pattern: /\b(Redux)\b/gi, name: 'Redux', category: 'Framework' as const },
      { pattern: /\b(MobX)\b/gi, name: 'MobX', category: 'Framework' as const },
      { pattern: /\b(Jest)\b/gi, name: 'Jest', category: 'Tool' as const },
      { pattern: /\b(Cypress)\b/gi, name: 'Cypress', category: 'Tool' as const },
      { pattern: /\b(Webpack)\b/gi, name: 'Webpack', category: 'Tool' as const },
      { pattern: /\b(Vite)\b/gi, name: 'Vite', category: 'Tool' as const }
    ];

    skillPatterns.forEach(({ pattern, name, category }) => {
      const matches = jobDescription.match(pattern);
      if (matches) {
        skills.push({
          name,
          confidence: Math.min(0.9, 0.5 + (matches.length * 0.1)),
          category
        });
      }
    });

    // Remove duplicates and sort by confidence
    const uniqueSkills = skills.filter((skill, index, self) => 
      index === self.findIndex(s => s.name === skill.name)
    );

    return of(uniqueSkills.sort((a, b) => b.confidence - a.confidence));
  }

  getSkillSuggestions(): Observable<string[]> {
    const commonSkills = [
      'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue.js',
      'Node.js', 'Python', 'Java', 'C#', 'Go', 'Rust',
      'HTML5', 'CSS3', 'SASS', 'LESS', 'Bootstrap', 'Tailwind CSS',
      'Express.js', 'NestJS', 'Django', 'Flask', 'Spring Boot',
      'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch',
      'AWS', 'Azure', 'Google Cloud Platform', 'Docker', 'Kubernetes',
      'Git', 'Jenkins', 'GitHub Actions', 'Jest', 'Cypress',
      'Webpack', 'Vite', 'Babel', 'ESLint', 'Prettier'
    ];
    
    return of(commonSkills);
  }
}
