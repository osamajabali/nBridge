import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ClientsService } from '../../core/services/clients.service';
import { SpinnerService } from '../../../assets/services/spinner.service';
import { ClientRequest, ClientResponse } from '../../core/models/client.model';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clients',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    FormsModule,
    MatTableModule,
    MatIcon,
    CommonModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {

  @ViewChild('createClientDialog') createClientDialogTemplate: any;
  readonly dialog = inject(MatDialog);
  readonly spinnerService = inject(SpinnerService);
  readonly clientService = inject(ClientsService);
  readonly router = inject(Router);
  clientName: string = '';
  clientEmail: string = '';
  displayedColumns: string[] = ['fullName', 'phoneNumber', 'username', 'twoFactorEnabled', 'Actions'];
  dataSource: ClientResponse[] = [];
  client: ClientRequest = new ClientRequest();
  isUpdate: boolean;
  searchTerm: string = '';

  ngOnInit(): void {
    localStorage.removeItem('clientId');
    this.getClient();
  }

  getClient() {
    this.spinnerService.show();
    this.clientService.getAllClients().subscribe({
      next: (res) => {
        if (res) {
          this.dataSource = res;
        }
        this.spinnerService.hide();
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
        this.spinnerService.hide();
      }
    });
  }

  viewConnections(clientId: string) {
    localStorage.setItem('clientId', clientId)
    this.router.navigate([`/layout/connections`])
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(this.createClientDialogTemplate, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  saveClient(dialogRef: any, ClientForm: NgForm) {
    if (ClientForm.valid) {
      this.spinnerService.show();
      this.client.username = this.client.email;
      this.client.name = this.client.firstName + ' ' + this.client.lastName;

      this.clientService.createClient(this.client).subscribe({
        next: (res) => {
          if (res) {
            this.getClient();
            dialogRef.close();
          }
          this.spinnerService.hide();
        },
        error: (error) => {
          console.error('Error creating client:', error);
          this.spinnerService.hide();
        }
      });
    }
  }

  getClientByID = (id: number) => {
    this.spinnerService.show();
    this.clientService.getClientById(id).subscribe({
      next: (res) => {
        if (res) {
          let splitName = res.name.split(' ');
          let firstName = splitName[0];  // First value is first name
          let lastName = splitName.length > 1 ? splitName[splitName.length - 1] : '';
          
          this.client = {
            description: res.description,
            email: res.username,
            firstName: firstName,
            lastName: lastName,
            id: res.id,
            name: res.name,
            password: null,
            username: res.username
          };
          this.isUpdate = true;
          this.spinnerService.hide();
          this.openDialog('800ms', '500ms');
        }
      },
      error: (error) => {
        console.error('Error fetching client:', error);
        this.spinnerService.hide();
      }
    });
  }

  addItem = () => {
    this.client = new ClientRequest();
    this.isUpdate = false;
    this.openDialog('800ms', '500ms');
  }

  updateClient = (dialogRef: any) => {
    this.spinnerService.show();
    this.client.username = this.client.firstName + ' ' + this.client.lastName;
    this.client.name = this.client.firstName + ' ' + this.client.lastName;

    this.clientService.updateClient(this.client).subscribe({
      next: (res) => {
        if (res) {
          this.getClient();
          dialogRef.close();
        }
        this.spinnerService.hide();
      },
      error: (error) => {
        console.error('Error updating client:', error);
        this.spinnerService.hide();
      }
    });
  }

  DeleteClient = (id: number) => {
    this.spinnerService.show();
    this.clientService.deleteClient(id).subscribe({
      next: (res) => {
        if (res) {
          this.getClient();
        }
        this.spinnerService.hide();
      },
      error: (error) => {
        console.error('Error deleting client:', error);
        this.spinnerService.hide();
      }
    });
  }
}