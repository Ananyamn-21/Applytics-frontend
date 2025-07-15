export interface JobApplication {
    id?: string;
    companyName: string;
    role: string;
    jobDescriptionUrl: string;
    applicationDate: Date | string;
    status: 'Applied' | 'Interview Scheduled' | 'Rejected' | 'Selected';
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface JobApplicationStats {
    total: number;
    applied: number;
    interview: number;
    rejected: number;
    selected: number;
  }