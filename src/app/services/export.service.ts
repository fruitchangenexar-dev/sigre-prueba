// src/app/services/export.service.ts

import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor() {}

  exportToExcel(data: any[], filename: string, headers?: string[]): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Articulos');

    if (headers && headers.length > 0) {
      worksheet.addRow(headers);
    } else {
      if (data.length > 0) {
        worksheet.addRow(Object.keys(data[0]));
      }
    }

    data.forEach((item) => {
      worksheet.addRow(Object.values(item));
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, `${filename}.xlsx`);
    });
  }
}
