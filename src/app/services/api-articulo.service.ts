import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiArticuloService {
  url: string = 'http://192.168.1.2:8080/api/v1/articulo/mostrarresumen2';
  constructor(private http: HttpClient) {}

  getArticulos(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
