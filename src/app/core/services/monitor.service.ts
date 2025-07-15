import { Injectable } from '@angular/core';
import { HttpService } from '../../../assets/services/http.service';
import { Observable } from 'rxjs';

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