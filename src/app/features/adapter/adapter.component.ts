import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdapterService } from '../../core/services/adapter.service';
import { AdapterPayload, AdapterResponse } from '../../core/models/adapter-response.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-adapter',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    FormsModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './adapter.component.html',
  styleUrl: './adapter.component.scss'
})
export class AdapterComponent implements OnInit {

  @ViewChild('createAdapterDialog') createAdapterDialogTemplate: any;
  readonly dialog = inject(MatDialog);
  private adapterService = inject(AdapterService)
  adapter: AdapterResponse = new AdapterResponse();
  adapterPayload: AdapterPayload = new AdapterPayload();
  displayedColumns: string[] = ['Name', 'Description','adapterTypeId'];
  dataSource: AdapterResponse[] = [];
  isUpdate: boolean;

  ngOnInit(): void {
    localStorage.removeItem('clientId');
    this.getAdapters();
  }
  getAdapters() {
    this.adapterService.getAllAdapters().subscribe(res => {
      if (res) {
        this.dataSource = res;
        console.log(this.dataSource)
      }
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(this.createAdapterDialogTemplate, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  saveAdapter(dialogRef: any, AdapterForm: NgForm) {
    if (AdapterForm.valid) {
      this.adapterService.createAdapter(this.adapterPayload).subscribe(res => {
        if (res) {
          this.getAdapters();
          dialogRef.close();
        }
      })
    }
  }

  getAdapterByID = (id: number) => {
    this.adapterService.getAdapterById(id).subscribe(res => {
      if (res) {
        this.adapter = res;
        this.isUpdate = true;
        this.openDialog('800ms', '500ms');
      }
    })
  }

  addItem = () => {
    this.adapter = new AdapterResponse();
    this.isUpdate = false;
    this.openDialog('800ms', '500ms');
  }

  updateAdapter = () => {
    this.adapterService.updateAdapter(this.adapter).subscribe(res => {
      if (res) {

      }
    })
  }

  DeleteAdapter = (id: number) => {
    this.adapterService.deleteAdapter(id).subscribe(res => {
      if (res) {

      }
    })
  }
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}