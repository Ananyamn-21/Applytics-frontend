export interface Evaluation {
    id?: string;
    interviewDate: Date | string;
    company: string;
    role: string;
    questions: string;
    conceptsMissed: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    preparationScore: number;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface EvaluationStats {
    total: number;
    averagePreparationScore: number;
    difficultyBreakdown: {
      easy: number;
      medium: number;
      hard: number;
    };
  }