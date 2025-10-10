import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./components/login/login').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/register/register').then(m => m.RegisterComponent) },
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard').then(m => m.DashboardComponent) },
  { path: 'applications', loadComponent: () => import('./components/application-list/application-list').then(m => m.ApplicationListComponent) },
  { path: 'application-form', loadComponent: () => import('./components/application-form/application-form').then(m => m.ApplicationFormComponent) },
  { path: 'application/:id', loadComponent: () => import('./components/application-form/application-form').then(m => m.ApplicationFormComponent) },
  { path: 'calendar', loadComponent: () => import('./components/calendar-view/calendar-view').then(m => m.CalendarViewComponent) },
  { path: 'skills', loadComponent: () => import('./components/skill-tracker/skill-tracker').then(m => m.SkillTrackerComponent) },
  { path: 'skills/job/:jobId', loadComponent: () => import('./components/skill-preparation/skill-preparation').then(m => m.SkillPreparationComponent) },
  { path: 'evaluations', loadComponent: () => import('./components/self-evaluation/self-evaluation').then(m => m.SelfEvaluationComponent) },
  { path: 'evaluation-form', loadComponent: () => import('./components/evaluation-form/evaluation-form').then(m => m.EvaluationFormComponent) },
  { path: 'flashcards', loadComponent: () => import('./components/flash-cards/flash-cards').then(m => m.FlashCardsComponent) },
];