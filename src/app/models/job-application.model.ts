export interface JobApplication {
  id?: string;
  companyName: string;
  role: string;
  jdUrl: string;
  jdText?: string;
  dateApplied: string;
  status: 'applied' | 'interview' | 'rejected' | 'selected';
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