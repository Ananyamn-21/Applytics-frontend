export interface Skill {
    name: string;
    isPrepared: boolean;
    notes?: string;
    resources: SkillResource[];
    hoursSpent?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface SkillResource {
    title: string;
    url: string;
    type: 'Documentation' | 'Video' | 'Article' | 'Course' | 'Code Example';
    createdAt?: Date;
  }
  
  export interface SkillStats {
    totalSkills: number;
    preparedSkills: number;
    timeSpent: { skill: string; hours: number }[];
  }