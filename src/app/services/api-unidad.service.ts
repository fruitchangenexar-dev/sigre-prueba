import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnidadShared } from '../models/unidad';

@Injectable({
  providedIn: 'root',
})
export class ApiUnidadService {
  url: string = 'http://192.168.1.2:8080/api/v1/unidad';
  constructor(private http: HttpClient) {}

  listShared(): Observable<UnidadShared[]> {
    return this.http.get<UnidadShared[]>(`${this.url}/shared`);
  }
}
