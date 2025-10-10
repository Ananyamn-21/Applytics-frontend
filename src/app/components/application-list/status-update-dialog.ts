import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-status-update-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatSelectModule, MatDialogModule, FormsModule],
  template: `
    <h2 mat-dialog-title>Update Status</h2>
    <mat-dialog-content>
      <mat-form-field appearance="fill">
        <mat-label>Status</mat-label>
        <mat-select [(ngModel)]="data.status">
          <mat-option value="applied">Applied</mat-option>
          <mat-option value="interview">Interview Scheduled</mat-option>
          <mat-option value="rejected">Rejected</mat-option>
          <mat-option value="selected">Selected</mat-option>
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()">Save</button>
    </mat-dialog-actions>
  `
})
export class StatusUpdateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StatusUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { status: string }
  ) {}

  onSave(): void {
    this.dialogRef.close(this.data.status);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
