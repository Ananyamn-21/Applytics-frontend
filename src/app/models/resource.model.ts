export interface LearningResource {
    id?: string;
    title: string;
    url: string;
    type: 'Documentation' | 'Video' | 'Article' | 'Course' | 'Book' | 'Podcast';
    topics: string[];
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
    estimatedHours?: number;
    isFree?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }