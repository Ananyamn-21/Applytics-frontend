export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end?: Date;
    type: 'application' | 'interview' | 'preparation';
    associatedId: string;
    color?: {
      primary: string;
      secondary: string;
    };
    meta?: any;
  }