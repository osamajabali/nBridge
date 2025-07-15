import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { Connection } from '../../core/models/connection.model';
import { ConnectionsService } from '../../core/services/connections.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerService } from '../../../assets/services/spinner.service';
import { AdapterService } from '../../core/services/adapter.service';
import { ClientsService } from '../../core/services/clients.service';
import { AdapterResponse } from '../../core/models/adapter-response.model';
import { HasRolesDirective } from '../../shared/directive/has-roles.directive';
import { ClientResponse } from '../../core/models/client.model';

@Component({
  selector: 'app-connections',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    FormsModule,
    MatTableModule,
    CommonModule,
    MatIconModule,
    MatSelectModule,
    HasRolesDirective
  ],
  templateUrl: './connections.component.html',
  styleUrl: './connections.component.scss'
})
export class ConnectionsComponent implements OnInit {

  @ViewChild('createClientDialog') createClientDialogTemplate: any;
  readonly dialog = inject(MatDialog);
  readonly spinnerService = inject(SpinnerService);
  clientName: string = '';
  clientEmail: string = '';
  displayedColumns: string[] = ['name', 'adapterId', 'clientId', 'actions'];
  dataSource: Connection[] = [];
  defaultData: Connection[] = [];
  connection: Connection = new Connection();
  isUpdate: boolean = false;
  adapterOptions: AdapterResponse[] = [];
  clientOptions: ClientResponse[] = [];

  constructor(private connectionService: ConnectionsService, private adapterService: AdapterService, private clientService: ClientsService) { }

  ngOnInit(): void {
    this.getConnections();
    this.getLookups();
  }

  getLookups() {
    this.adapterService.getAllAdapters().subscribe(res => {
      if (res) {
        this.adapterOptions = res
      }
    });

    this.clientService.getAllClients().subscribe(res => {
      if (res) {
        this.clientOptions = res;
      }
    });
  }

  getConnections() {
    this.spinnerService.show();
    const clientId = localStorage.getItem('clientId');
    if (clientId) {
      this.connectionService.getConnectionByClientId(clientId).subscribe(res => {
        if (res) {
          this.dataSource = res
          this.spinnerService.hide();
        }
      });
    } else {
      this.connectionService.getAllConnections().subscribe(res => {
        if (res) {
          this.dataSource = res
          this.spinnerService.hide();
        }
      });
      this.connectionService.getDefaultConnections().subscribe(res => {
        if (res) {
          this.defaultData = res
          this.spinnerService.hide();
        }
      });
    }
  }

  getConnectionDetails(connection: Connection) {
    this.connection.dbConnectionDetail = connection.dbConnectionDetail;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(this.createClientDialogTemplate, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  saveConnection(dialogRef: any, ConnectionForm: NgForm) {
    this.spinnerService.show();
    let userId = this.clientOptions.find(x => x.id == this.connection.clientId).userId;
    this.connection.userId = userId ? userId : '';
    if (ConnectionForm.valid) {
      this.connectionService.createConnection(this.connection).subscribe(res => {
        if (res) {
          this.getConnections();
          dialogRef.close();
          this.spinnerService.hide();
        }
      })
    }
  }

  getConnectionByID = (id: number) => {
    this.spinnerService.show();
    this.connectionService.getConnectionById(id).subscribe(res => {
      if (res) {
        this.spinnerService.hide();
        this.connection = res;
        this.isUpdate = true;
        this.openDialog('800ms', '500ms');
      }
    })
  }

  addItem = () => {
    this.connection = new Connection();
    this.isUpdate = false;
    this.openDialog('800ms', '500ms');
  }

  updateConnection = () => {
    this.spinnerService.show();
    let userId = this.clientOptions.find(x => x.id == this.connection.clientId).userId;
    this.connection.userId = userId ? userId : '';
    this.connectionService.updateConnection(this.connection).subscribe(res => {
      if (res) {
        this.getConnections();
        this.spinnerService.hide();
      }
    })
  }

  DeleteConnection = (id: number) => {
    this.spinnerService.show();
    this.connectionService.deleteConnection(id).subscribe(res => {
      if (res) {
        this.getConnections();
        this.spinnerService.hide();
      }
    })
  }
}