import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../assets/services/http.service';
import { AdapterPayload, AdapterResponse } from '../models/adapter-response.model';

@Injectable({
  providedIn: 'root'
})
export class AdapterService {
  controller = 'adapter'

  constructor(private apiHlpr: HttpService) { }

  getAllAdapters = (): Observable<AdapterResponse[]> => {
    return this.apiHlpr.get<AdapterResponse[]>(`${this.controller}`);
  }

  getAdapterById = (id: number): Observable<any> => {
    return this.apiHlpr.get<any>(`${this.controller}/${id}`)
  }

  createAdapter = (adapter : AdapterPayload): Observable<any> => {
    return this.apiHlpr.post<any>(`${this.controller}`, adapter)
  }

  updateAdapter = (adapter : AdapterResponse): Observable<any> => {
    return this.apiHlpr.put<any>(`${this.controller}/${adapter.id}`, {name : adapter.name})
  }

  deleteAdapter = (id : number): Observable<any> => {
    return this.apiHlpr.delete<any>(`${this.controller}/${id}`)
  }

}
