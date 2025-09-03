import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Header } from '../models/header-table';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor() {}

  // Modifica el método para que reciba el array de objetos Header
  exportToExcel(data: any[], filename: string, headers: Header<any>[]): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Articulos');

    // Mapea los labels de los encabezados para crear la primera fila
    const headerLabels = headers.map(header => header.label);
    worksheet.addRow(headerLabels);

    // Mapea los datos para crear las filas del contenido
    data.forEach((item) => {
      // Por cada objeto de datos, crea un array de valores usando las 'keys' de los encabezados
      const rowValues = headers.map(header => item[header.key]);
      worksheet.addRow(rowValues);
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, `${filename}.xlsx`);
    });
  }
}
