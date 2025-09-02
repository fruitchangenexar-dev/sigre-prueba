import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para la búsqueda
import { ApiArticuloService } from './services/api-articulo.service';
import { ExportService } from './services/export.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'sigre-prueba';

  allArticulos: any[] = [];

  paginatedArticulos: any[] = [];

  pageSize: number = 10;
  currentPage: number = 1;
  searchText: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  headers = [
    { key: 'codArticulo', label: 'Código' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'subCategoriaArticulo', label: 'SUB_CAT_ART' },
    { key: 'codUnidad', label: 'UND' },
    { key: 'monedaCompra', label: 'MONEDA_COMPRA' },
    { key: 'costoPromSol', label: 'COSTO_PROM_SOL' },
    { key: 'costoPromDol', label: 'COSTO_PROM_DOL' },
    { key: 'costoUltCompra', label: 'COSTO_ULT_COMPRA' },
  ];

  constructor(
    private api: ApiArticuloService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.api.getArticulos().subscribe((data) => {
      this.allArticulos = data;
      this.paginate();
    });
  }

  paginate(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedArticulos = this.allArticulos.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.paginate();
  }

  applyFilter(): void {
    let filteredData = this.allArticulos;

    if (this.searchText) {
      const lowerCaseFilter = this.searchText.toLowerCase();
      filteredData = this.allArticulos.filter((item) =>
        Object.values(item).some((val) =>
          val?.toString().toLowerCase().includes(lowerCaseFilter)
        )
      );
    }
    this.allArticulos = filteredData;
    this.currentPage = 1;
    this.paginate();
  }

  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.allArticulos.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      let comparison = 0;
      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }
      return this.sortDirection === 'asc' ? comparison : comparison * -1;
    });
    this.paginate();
  }

  exportData(): void {
    this.exportService.exportToExcel(this.allArticulos, 'Articulos');
  }

  get totalPages(): number {
    return Math.ceil(this.allArticulos.length / this.pageSize);
  }

  get pages(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }
}
