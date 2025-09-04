import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrigenShared } from '../models/origen';

@Injectable({
  providedIn: 'root',
})
export class ApiOrigenService {
  url: string = 'http://192.168.1.2:8080/api/v1/origen';
  constructor(private http: HttpClient) {}

  /*findAll(): Observable<Maquina[]> {
    return this.http.get<Origen[]>(`${this.url}/mostrar`);
  }*/
  listShared(): Observable<OrigenShared[]> {
    return this.http.get<OrigenShared[]>(`${this.url}/shared`);
  }
}
