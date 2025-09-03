import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiArticuloService } from '../services/api-articulo.service';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'articulo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticuloComponent implements OnInit {
  title = 'sigre-prueba';

  // Usamos signals para manejar el estado de la aplicación
  allArticulos = signal<any[]>([]);
  filteredArticulos = signal<any[]>([]);
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  searchText = signal<string>('');
  sortColumn = signal<string>('');
  sortDirection = signal<'asc' | 'desc'>('asc');

  headers = [
    { key: 'codArticulo', label: 'Código' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'subCategoriaArticulo', label: 'Sub Categ' },
    { key: 'codUnidad', label: 'Unidad' },
    { key: 'monedaCompra', label: 'Moneda' },
    { key: 'costoPromSol', label: 'Promd. Soles' },
    { key: 'costoPromDol', label: 'Promd. Dol' },
    { key: 'costoUltCompra', label: 'Ultima Compra' },
  ];

  constructor(
    private api: ApiArticuloService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.api.getArticulos().subscribe((data) => {
      this.allArticulos.set(data);
      this.filteredArticulos.set(data);
    });
  }

  onSearchChange(): void {
    const text = this.searchText();
    const lowerCaseFilter = text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    if (text) {
      const filtered = this.allArticulos().filter((item) =>
        Object.values(item).some((val) => {
          if (val === null || val === undefined) {
            return false;
          }
          const normalizedVal = val
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
          return normalizedVal.includes(lowerCaseFilter);
        })
      );
      this.filteredArticulos.set(filtered);
    } else {
      this.filteredArticulos.set(this.allArticulos());
    }
    this.currentPage.set(1);
    this.sortData(this.sortColumn());
  }

  sortData(column: string): void {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }

    const sortedData = [...this.filteredArticulos()];
    sortedData.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      let comparison = 0;
      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }
      return this.sortDirection() === 'asc' ? comparison : comparison * -1;
    });

    this.filteredArticulos.set(sortedData);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  exportData(): void {
    this.exportService.exportToExcel(this.allArticulos(), 'Articulos');
  }

  paginatedArticulos = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredArticulos().slice(start, end);
  });

  totalPages = computed(() =>
    Math.ceil(this.filteredArticulos().length / this.pageSize())
  );

  pages = computed((): number[] => {
    const totalPages = this.totalPages();
    const currentPage = this.currentPage();
    const pages: number[] = [];

    // Lógica de paginación
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push(-1);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push(-1);
      }
      pages.push(totalPages);
    }
    return pages;
  });
}
