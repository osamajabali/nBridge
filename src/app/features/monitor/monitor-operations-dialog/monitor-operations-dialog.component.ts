import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monitor-operations-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './monitor-operations-dialog.component.html',
  styleUrls: ['./monitor-operations-dialog.component.scss']
})
export class MonitorOperationsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MonitorOperationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
} 