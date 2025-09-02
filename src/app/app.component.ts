// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiArticuloService } from './services/api-articulo.service';
import { ExportService } from './services/export.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'sigre-prueba';
  articulos: any[] = [];

  // Los encabezados de la tabla para el archivo Excel
  excelHeaders = [
    'codArticulo',
    'nombre',
    'subCategoriaArticulo',
    'codUnidad',
    'monedaCompra',
    'costoPromSol',
    'costoPromDol',
    'costoUltCompra',
  ];

  constructor(
    private api: ApiArticuloService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.api.getArticulos().subscribe((data) => {
      this.articulos = data;
    });
  }

  // Método que se llama desde el botón para exportar
  exportData(): void {
    // Llama al servicio de exportación, pasando los datos y los encabezados deseados
    this.exportService.exportToExcel(
      this.articulos,
      'Articulos',
      this.excelHeaders
    );
  }
}
