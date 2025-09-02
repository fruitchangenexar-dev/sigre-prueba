// src/app/services/export.service.ts

import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor() {}

  /**
   * Exporta un array de datos a un archivo Excel.
   * @param data Los datos a exportar (un array de objetos).
   * @param filename El nombre deseado para el archivo.
   * @param headers Opcional, los encabezados de la tabla.
   */
  exportToExcel(data: any[], filename: string, headers?: string[]): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Articulos');

    // Añade los encabezados si se proporcionan
    if (headers && headers.length > 0) {
      worksheet.addRow(headers);
    } else {
      // Si no hay encabezados, usa las claves del primer objeto
      if (data.length > 0) {
        worksheet.addRow(Object.keys(data[0]));
      }
    }

    // Añade los datos
    data.forEach((item) => {
      worksheet.addRow(Object.values(item));
    });

    // Escribe el archivo Excel y lo descarga
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, `${filename}.xlsx`);
    });
  }
}
