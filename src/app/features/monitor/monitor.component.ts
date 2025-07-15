import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../../../assets/services/spinner.service';
import { ClientResponse, ClientRequest } from '../../core/models/client.model';
import { ClientsService } from '../../core/services/clients.service';
import { MonitorService, OperationLog } from '../../core/services/monitor.service';

@Component({
  selector: 'app-monitor',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    FormsModule,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.scss'
})
export class MonitorComponent {

  @ViewChild('createClientDialog') createClientDialogTemplate: any;
  readonly dialog = inject(MatDialog);
  readonly spinnerService = inject(SpinnerService);
  readonly clientService = inject(ClientsService);
  readonly monitorService = inject(MonitorService);
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  clientName: string = '';
  clientEmail: string = '';
  displayedColumns: string[] = ['exception', 'level', 'message', 'timeStamp'];
  displayedColumns2: string[] = ['name', 'description', 'executedAt', 'requiredParams', 'operationLog'];

  dataSource: OperationLog[] = [];
  client: ClientRequest = new ClientRequest();
  isUpdate: boolean;
  id : string | null = null;
  ngOnInit(): void {
    localStorage.removeItem('clientId');
    this.getClient();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
    this.monitorService.getStatusByIntegrationID(this.id).subscribe(res => {
      this.dataSource = res;
    })
    } else {
      this.monitorService.getLogs().subscribe(res => {
        this.dataSource = res;
      })
    }
  }

  getClient() {

    this.clientService.getAllClients().subscribe(res => {
      if (res) {
      }
    })
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
      this.client.username = this.client.email;
      this.client.name = this.client.firstName + ' ' + this.client.lastName;

      this.clientService.createClient(this.client).subscribe(res => {
        if (res) {
          this.getClient();
          dialogRef.close();
        }
      })
    }
  }

  getClientByID = (id: number) => {
    this.spinnerService.show();
    this.clientService.getClientById(id).subscribe(res => {
      if (res) {
        let splitName = res.name.split(' ');
        let firstName = splitName[0];  // First value is first name
        let lastName = splitName.length > 1 ? splitName[splitName.length - 1] : '';
        this.spinnerService.hide();
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
        this.openDialog('800ms', '500ms');
      }
    })
  }

  addItem = () => {
    this.client = new ClientRequest();
    this.isUpdate = false;
    this.openDialog('800ms', '500ms');
  }

  updateClient = (dialogRef: any) => {
    this.client.username = this.client.firstName + this.client.lastName;
    this.client.name = this.client.firstName + this.client.lastName;

    this.clientService.updateClient(this.client).subscribe(res => {
      if (res) {
        this.getClient();
        dialogRef.close();
      }
    })
  }

  DeleteClient = (id: number) => {
    this.spinnerService.show();
    this.clientService.deleteClient(id).subscribe(res => {
      if (res) {
        this.spinnerService.hide();
        this.getClient()
      }
    })
  }
}