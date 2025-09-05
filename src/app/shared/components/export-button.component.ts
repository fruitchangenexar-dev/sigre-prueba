import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportService } from '../../services/export.service'; // Asegúrate de importar Header
import { Header } from '../../models/header-table';

@Component({
  selector: 'app-export-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="exportData()"
      class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
    >
      Exportar
    </button>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportButtonComponent {
  @Input({ required: true }) data!: any[];
  @Input() filename: string = 'datos';
  @Input({ required: true }) headers!: Header<any>[]; // Añade esta línea

  constructor(private exportService: ExportService) {}

  exportData(): void {
    // Pasa los encabezados al servicio
    this.exportService.exportToExcel(this.data, this.filename, this.headers);
  }
}
