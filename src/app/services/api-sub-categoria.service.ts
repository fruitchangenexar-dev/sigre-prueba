import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubCategoriaShared } from '../models/sub-categoria';

@Injectable({
  providedIn: 'root',
})
export class ApiSubCategoriaService {
  url: string = 'http://192.168.1.2:8080/api/v1/subCategoria';
  constructor(private http: HttpClient) {}

  listShared(): Observable<SubCategoriaShared[]> {
    return this.http.get<SubCategoriaShared[]>(`${this.url}/shared`);
  }
}
