import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../models/articulo';

@Injectable({
  providedIn: 'root',
})
export class ApiArticuloService {
  url: string = 'http://192.168.1.2:8080/api/v1/articulo';
  //url: string = 'http://200.60.58.194:8080/api/v1/articulo/mostrarresumen2';
  constructor(private http: HttpClient) {}

  getArticulos(): Observable<any> {
    return this.http.get<any>(`${this.url}/mostrarresumen`);
  }

  findAll(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.url}/mostrarresumen`);
  }

  saveArticulo(articulo: Articulo): Observable<Articulo> {
    return this.http.post<Articulo>(`${this.url}/guardar`, articulo);
  }
}
