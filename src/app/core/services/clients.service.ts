import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../assets/services/http.service';
import { ClientRequest, ClientResponse } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

   controller = 'client'
  
    constructor(private apiHlpr: HttpService) { }
  
    getAllClients = (): Observable<ClientResponse[]> => {
      return this.apiHlpr.get<ClientResponse[]>(`${this.controller}`);
    }
  
    getClientById = (id: number): Observable<ClientResponse> => {
      return this.apiHlpr.get<ClientResponse>(`${this.controller}/${id}`)
    }
  
    createClient = (client : ClientRequest): Observable<any> => {
      return this.apiHlpr.post<any>(`${this.controller}`, client)
    }
  
    updateClient = (client : any): Observable<any> => {
      return this.apiHlpr.put<any>(`${this.controller}/${client.id}`, client)
    }
  
    deleteClient = (id : number): Observable<any> => {
      return this.apiHlpr.delete<any>(`${this.controller}/${id}`)
    }
  
  }
  