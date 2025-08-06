import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../assets/services/http.service';
import { ExceutionStatus, Integration, IntegrationOperation, IntegrationRequest, Operation, OperationRequest } from '../models/integration.model';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  controller: string = 'Integration';

  constructor(private apiHlpr :  HttpService) { }

  getAllIntegrations = (): Observable<Integration[]> => {
    return this.apiHlpr.get<Integration[]>(`${this.controller}`);
  }

  getOperationsByIntegrationID = (operationId : string): Observable<IntegrationOperation[]> => {
    return this.apiHlpr.get<IntegrationOperation[]>(`Operation/GetByIntegration/${operationId}`);
  }
  
  executeOperation = (operationRequest : OperationRequest): Observable<ExceutionStatus> => {
    return this.apiHlpr.post<ExceutionStatus>(`Operation/ExecuteOperation` , operationRequest);
  }
  
  executeMultipleOperation = (operationRequest : OperationRequest[]): Observable<ExceutionStatus> => {
    return this.apiHlpr.post<ExceutionStatus>(`Operation/SubmitExecutions` , operationRequest);
  }
  
  getAllOperations = (): Observable<Operation[]> => {
    return this.apiHlpr.get<Operation[]>(`Operation`);
  }
  
  createIntegration = (integrationRequest : IntegrationRequest): Observable<ExceutionStatus> => {
    return this.apiHlpr.post<ExceutionStatus>(`Integration` , integrationRequest);
  }
  
  getIntegrationByID = (integrationId : string): Observable<Integration> => {
    return this.apiHlpr.get<Integration>(`Integration/${integrationId}`);
  }

  updateIntegration = (integrationRequest : IntegrationRequest , integrationId : string ): Observable<ExceutionStatus> => {
    return this.apiHlpr.put<ExceutionStatus>(`Integration/${integrationId}` , integrationRequest);
  }

  deleteIntegration = (id : string): Observable<ExceutionStatus> => {
    return this.apiHlpr.delete<ExceutionStatus>(`Integration/${id}`);
  }
}
