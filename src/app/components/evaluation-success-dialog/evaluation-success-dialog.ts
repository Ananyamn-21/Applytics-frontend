import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-evaluation-success-dialog',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule],
  template: `
    <mat-card class="success-card">
      <div class="success-body">
        <mat-icon class="success-icon">check_circle</mat-icon>
        <h2 class="success-title">{{ data?.title || 'Saved' }}</h2>
        <p class="success-message">{{ data?.message || 'Your evaluation has been saved successfully.' }}</p>
        <div class="success-actions">
          <button mat-flat-button color="primary" (click)="close()">OK</button>
        </div>
      </div>
    </mat-card>
  `,
  styles: [
    `.success-card { max-width: 480px; margin: 8px; padding: 24px; text-align: center; }
     .success-icon { font-size: 64px; color: #43a047; }
     .success-title { margin: 12px 0 6px; }
     .success-message { color: rgba(0,0,0,0.7); margin-bottom: 18px; }
     .success-actions { display: flex; justify-content: center; }`
  ]
})
export class EvaluationSuccessDialog {
  constructor(public dialogRef: MatDialogRef<EvaluationSuccessDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  close() {
    this.dialogRef.close(true);
  }
}
