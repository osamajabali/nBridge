import { Injectable } from '@angular/core';
import { HttpService } from '../../../assets/services/http.service';
import { Observable } from 'rxjs';

export class ExecutionSummary {
  instanceId: string | null;
  integrationId: string;
  integrationName: string;
  status: boolean;
  startTime: string;
  endTime: string;
  duration: string;
}

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  controller: string = '';

  constructor(private apiHlpr: HttpService) { }

  getAllStatuses = (): Observable<OperationLog[]> => {
    return this.apiHlpr.get<OperationLog[]>(`operation/OperationsLogs`);
  }

  getStatusByIntegrationID = (id : string): Observable<OperationLog[]> => {
    return this.apiHlpr.get<OperationLog[]>(`operation/GetByIntegration/${id}`);
  }

  getLogs = (): Observable<OperationLog[]> => {
    return this.apiHlpr.get<OperationLog[]>(`Logging?count=100`);
  }

  getExecutionSummary = (integrationId? : string): Observable<ExecutionSummary[]> => {
    return this.apiHlpr.get<ExecutionSummary[]>(`operation/ExecutionSummary` , {params : {integrationId : integrationId ? integrationId : ''}} );
  }
}

export class OperationLog {
  integrationId: string;
  operationId: string;
  executedAt: string;
  response: string | null;
  isSuccess: boolean;
  message: string | null;
  id: string;
  userId: string | null;
}