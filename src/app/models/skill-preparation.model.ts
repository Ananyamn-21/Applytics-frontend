export interface SkillPreparation {
  id?: number;
  jobApplicationId: number;
  skillName: string;
  resourceUrl: string;
  // aliases used by templates in various places
  name?: string;
  resource?: string;
  status: string;
  progress: number;
  // local-only UI helper to control slider step (1 or 10)
  _step?: number;
}
