import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { EvaluationService } from '../../services/evaluation';

@Component({
  selector: 'app-self-evaluation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatRadioModule,
    MatSliderModule
  ],
  templateUrl: './self-evaluation.component.html',
  styleUrls: ['./self-evaluation.component.scss']
})
export class SelfEvaluationComponent implements OnInit {
  difficultyOptions = ['Easy', 'Medium', 'Hard'];
  evaluationForm: any;
  
  constructor(
    private fb: FormBuilder,
    private evaluationService: EvaluationService
  ) {}

  ngOnInit(): void {
    this.evaluationForm = this.fb.group({
      interviewDate: [new Date(), Validators.required],
      company: ['', Validators.required],
      role: ['', Validators.required],
      questions: ['', Validators.required],
      conceptsMissed: [''],
      difficulty: ['Medium', Validators.required],
      preparationScore: [3, [Validators.min(1), Validators.max(5)]],
      notes: ['']
    });
  }

  onSubmit(): void {
    if (this.evaluationForm.valid) {
      this.evaluationService.addEvaluation(this.evaluationForm.value).subscribe({
        next: () => {
          this.evaluationForm.reset();
          this.evaluationForm.get('preparationScore')?.setValue(3);
          this.evaluationForm.get('difficulty')?.setValue('Medium');
        },
        error: (err: any) => console.error(err)
      });
    }
  }
}