export interface Flashcard {
    id?: string;
    question: string;
    answer: string;
    tags: string[];
    source?: string; // Which interview/company it came from
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface FlashcardCategory {
    name: string;
    count: number;
  }