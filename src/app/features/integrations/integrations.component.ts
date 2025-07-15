import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { IntegrationService } from '../../core/services/integration.service';
import { ExceutionStatus, Integration, IntegrationOperation, IntegrationRequest, Operation, OperationRequest } from '../../core/models/integration.model';
import { AdapterService } from '../../core/services/adapter.service';
import { ClientsService } from '../../core/services/clients.service';
import { AdapterResponse } from '../../core/models/adapter-response.model';
import { ClientResponse } from '../../core/models/client.model';
import { forkJoin } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerService } from '../../../assets/services/spinner.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HasRolesDirective } from '../../shared/directive/has-roles.directive';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-integrations',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    HasRolesDirective
  ],
  templateUrl: './integrations.component.html',
  styleUrl: './integrations.component.scss'
})
export class IntegrationsComponent implements OnInit {

  @ViewChild('operationRequestDialog') operationRequestDialogTemplate: any;
  @ViewChild('integrationFormDialog') integrationFormDialogTemplate: any;
  @ViewChild('successDialog') successDialogTemplate: any;

  readonly dialog = inject(MatDialog);
  readonly adapterService = inject(AdapterService);
  readonly clientService = inject(ClientsService);
  readonly router = inject(Router);
  readonly spinnerService = inject(SpinnerService);
  operationRequest: OperationRequest = new OperationRequest();
  integrationService = inject(IntegrationService);
  displayedColumns: string[] = ['select', 'name', 'description', 'endpoint', 'actions'];
  integrationColumns: string[] = ['name', 'description', 'clientId', 'actions', 'operations'];
  operations: IntegrationOperation[] = [];
  adapterOptions: AdapterResponse[] = [];
  clientOptions: ClientResponse[] = [];
  integrations: Integration[] = [];
  showOperation: boolean = false;
  exceutionStatus: ExceutionStatus = new ExceutionStatus();
  integrationRequest: IntegrationRequest = new IntegrationRequest()
  operationOptions: Operation[] = [];
  isUpdate: boolean;
  isMultiple: boolean = false;
  selectedOperations: IntegrationOperation[];

  ngOnInit(): void {
    localStorage.removeItem('clientId');
    if (!this.operationRequest.parameters) {
      this.operationRequest.parameters = {
        fromDate: '',
        toDate: ''
      };
    }
    this.spinnerService.show();
    this.getIntegrations();
  }

  selectAll(event: any) {
    const checked = event.checked;
    this.operations.forEach(element => element.isSelected = checked);
  }

  getIntegrations() {
    this.integrationService.getAllIntegrations().subscribe(res => {
      if (res) {
        this.integrations = res;
        this.spinnerService.hide();
      }
    })
  }

  gtOperationsByID(element: Integration) {
    this.operationRequest.clientId = element.clientId;
    this.spinnerService.show();
    this.integrationService.getOperationsByIntegrationID(element.id).subscribe(res => {
      if (res) {
        this.showOperation = true;
        this.operations = res;
        this.spinnerService.hide();
      }
    })
  }

  executeOperation() {
    this.spinnerService.show();
    this.integrationService.executeOperation(this.operationRequest).subscribe(res => {
      if (res) {
        this.spinnerService.hide();
        this.exceutionStatus = res;
        this.dialog.closeAll();
        this.showSuccess();
      }
    })
  }

  executeMultipleOperation() {
    let operationForExcecution: OperationRequest[] = this.selectedOperations.map(operation => {
      return {
        operationId: operation.id,
        clientId: this.operationRequest.clientId,
        adapterId: this.operationRequest.adapterId,
        parameters: {
          fromDate: this.operationRequest.parameters.fromDate,
          toDate: this.operationRequest.parameters.toDate
        }
      };
    });

    this.integrationService.executeMultipleOperation(operationForExcecution).subscribe(res => {
      if (res) {
        this.dialog.closeAll();
      }
    })
  }

  viewOperationStatusById(id : string) {
    this.router.navigate([`/layout/monitor/${id}`])
  }


  checkMultiple() {
    this.selectedOperations = this.operations.filter(x => x.isSelected == true);
    if (!this.selectedOperations.length) return
    this.isMultiple = true;
    this.getLookups(this.selectedOperations[0]);
  }

  getLookups(element: IntegrationOperation) {
    this.operationRequest.operationId = element.id;
    forkJoin({
      adapters: this.adapterService.getAllAdapters(),
      clients: this.clientService.getAllClients()
    }).subscribe(({ adapters, clients }) => {
      if (adapters) {
        this.adapterOptions = adapters;
      }
      if (clients) {
        this.clientOptions = clients;
      }
      // Open dialog after both responses are received
      this.openDialog('800ms', '500ms');
    })
  }

  addNewIntegration = () => {
    this.isUpdate = false;
    this.integrationRequest = new IntegrationRequest();
    this.openIntegrationDialog('800ms', '500ms');
    this.getIntegrationLookups();
  }

  getIntegrationLookups() {
    this.clientService.getAllClients().subscribe(res => {
      if (res) {
        this.clientOptions = res;
      }
    })
    this.integrationService.getAllOperations().subscribe(res => {
      if (res) {
        this.operationOptions = res;
      }
    })
  }

  openIntegrationDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(this.integrationFormDialogTemplate, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef = this.dialog.open(this.operationRequestDialogTemplate, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isMultiple = false;
    })
  }

  showSuccess() {
    this.dialog.open(this.successDialogTemplate, {
      width: '300px',
    });
  }

  submitIntegration(integrationForm: NgForm) {
    if (integrationForm.invalid) {
      return
    }
    this.spinnerService.show()
    debugger
    this.integrationRequest.userId = this.clientOptions.find(x => x.id == this.integrationRequest.clientId).userId;
    this.integrationService.createIntegration(this.integrationRequest).subscribe(res => {
      if (res) {
        this.dialog.closeAll();
        this.getIntegrations();
        this.spinnerService.show()
      }
    })
  }

  updateIntegration(integrationForm: NgForm) {
    if (integrationForm.invalid) {
      return
    }
    this.spinnerService.show();
    this.integrationService.updateIntegration(this.integrationRequest).subscribe(res => {
      if (res) {
        this.dialog.closeAll();
        this.getIntegrations();
        this.spinnerService.hide();
      }
    })
  }

  getIntegrationID(integration: Integration) {
    this.spinnerService.show();
    this.integrationService.getIntegrationByID(integration.id).subscribe(res => {
      if (res) {
        this.isUpdate = true;

        let operationIds = res.integrationOperations.map(x => x.operationId);
        debugger
        this.integrationRequest = {
          clientId: res.clientId,
          description: res.description,
          name: res.name,
          operationIds: operationIds,
          userId: this.clientOptions.find(x => x.userId == res.id).userId
        }

        this.getIntegrationLookups();

        this.openIntegrationDialog('800ms', '500ms');
        this.spinnerService.hide();
      }
    })
  }

  DeleteIntegration(id: string) {
    this.spinnerService.show();
    this.integrationService.deleteIntegration(id).subscribe(res => {
      if (res) {
        this.getIntegrations();
        this.spinnerService.hide();
      }
    })
  }

}