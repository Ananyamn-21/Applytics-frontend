import { Component, Input, OnInit, ChangeDetectorRef, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SkillPreparationService } from '../../services/skill-preparation';
import { SkillPreparation } from '../../models/skill-preparation.model';

@Component({
  selector: 'app-skill-preparation',
  templateUrl: './skill-preparation.component.html',
  styleUrls: ['./skill-preparation.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillPreparationComponent implements OnInit {
  @Input() jobId!: number;
  skills: SkillPreparation[] = [];
  saving: Record<number, boolean> = {};
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private skillPreparationService: SkillPreparationService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.jobId || Number(this.route.snapshot.paramMap.get('jobId'));
    if (!id) return;

    this.loading = true;
    this.errorMessage = null;

    this.skillPreparationService.getSkillsByJob(id).subscribe({
      next: (skills) => {
        const raw: any = skills;
        const arr: any[] = Array.isArray(raw)
          ? raw
          : raw?.data || raw?.skills || raw?.items || [];

        this.skills = (arr || []).map((s) => ({
          ...s,
          progress:
            typeof s.progress === 'number'
              ? s.progress
              : Number(s.progress) || 0,
          _step: 1,
          status: this.normalizeStatus(s.status),
          name: s.skillName || s.name,
          resource: s.resourceUrl || s.resource
        }));

        this.loading = false;
        this.snackBar.open(`Loaded ${this.skills.length} skills`, 'OK', {
          duration: 1500
        });

        // ✅ ensure Angular re-renders after data assignment
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load skills', err);
        this.errorMessage = err?.message || 'Failed to load skills';
        this.skills = [];
        this.loading = false;
        this.snackBar.open(
          'Failed to load skills. Please check your login or permissions.',
          'OK',
          { duration: 4000 }
        );
        this.cdr.markForCheck();
      }
    });
  }

  private normalizeStatus(raw: any): string {
    if (!raw && raw !== 0) return 'in_progress';
    const v = String(raw).trim().toLowerCase();
    if (v.includes('complete')) return 'completed';
    if (v.includes('progress')) return 'in_progress';
    return 'in_progress';
  }

  updateSkill(skill: SkillPreparation): void {
  if (!skill?.id) return;

  this.saving[skill.id] = true;
  const statusToSend = this.normalizeStatus(skill.status);

  this.skillPreparationService
    .updateSkillProgressAndStatus(skill.id, skill.progress, statusToSend)
    .subscribe({
      next: () => {
        if (skill?.id != null) this.saving[skill.id] = false;
        this.snackBar.open('Skill updated', 'OK', { duration: 1500 });
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to update skill', err);
        if (skill?.id != null) this.saving[skill.id] = false;
        this.snackBar.open('Failed to update skill', 'Dismiss', { duration: 3000 });
        this.cdr.markForCheck();
      }
    });
}


  onNumericChange(skill: SkillPreparation, event: any): void {
    const val = Number(event.target?.value);
    skill.progress = Number.isFinite(val)
      ? Math.max(0, Math.min(100, val))
      : 0;
    this.updateSkill(skill);
  }

  onSliderInput(skill: SkillPreparation, event: any): void {
    const value = event.value ?? event.target?.value ?? 0;
    skill.progress = Math.max(0, Math.min(100, Number(value)));
    this.updateSkill(skill);
  }

  isSaving(skill?: SkillPreparation): boolean {
    if (!skill?.id) return false;
    return !!this.saving[skill.id];
  }
}
