import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../assets/services/http.service';
import { Connection } from '../models/connection.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {

  controller = 'externalconnection';

  constructor(private apiHlpr: HttpService) { }

  getAllConnections = (): Observable<Connection[]> => {
    return this.apiHlpr.get<Connection[]>(`${this.controller}`);
  }

  getDefaultConnections = (): Observable<Connection[]> => {
    return this.apiHlpr.get<Connection[]>(`${this.controller}/DefaultConnection`);
  }

  getConnectionById = (id: number): Observable<Connection> => {
    return this.apiHlpr.get<Connection>(`${this.controller}/${id}`)
  }

  getConnectionByClientId = (id: string): Observable<Connection[]> => {
    return this.apiHlpr.get<Connection[]>(`${this.controller}/ByClient/${id}`)
  }

  createConnection = (connection : Connection): Observable<any> => {
    return this.apiHlpr.post<any>(`${this.controller}`, connection)
  }

  updateConnection = (connection : any): Observable<any> => {
    return this.apiHlpr.put<any>(`${this.controller}/${connection.id}`, {name : connection.name})
  }

  deleteConnection = (id : number): Observable<any> => {
    return this.apiHlpr.delete<any>(`${this.controller}/${id}`)
  }
}