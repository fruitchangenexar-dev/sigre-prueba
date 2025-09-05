import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiArticuloService } from '../../services/api-articulo.service';
import { TableComponent } from '../../shared/components/table.component';
import { PaginationComponent } from '../../shared/components/pagination.component';
import { SearchFilterComponent } from '../../shared/components/search-filter.component';
import { ExportButtonComponent } from '../../shared/components/export-button.component';
import { Header } from '../../models/header-table';
import { Router, RouterLink } from '@angular/router';
import { Articulo } from '../../models/articulo';

@Component({
  selector: 'articulo-table',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    SearchFilterComponent,
    ExportButtonComponent,
  ],
  templateUrl: './articulo-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticuloTableComponent implements OnInit {
  title: string = 'Listado de Articulos';

  allArticulos = signal<Articulo[]>([]);
  filteredArticulos = signal<Articulo[]>([]);
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  searchText = signal<string>('');
  sortColumn = signal<string>('');
  sortDirection = signal<'asc' | 'desc'>('asc');

  headers: Header<Articulo>[] = [
    { key: 'codArticulo', label: 'Código' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'subCategoriaArticulo', label: 'Sub Categ' },
    { key: 'codUnidad', label: 'Unidad' },
    { key: 'monedaCompra', label: 'Moneda' },
    { key: 'costoPromSol', label: 'Promd. Soles' },
    { key: 'costoPromDol', label: 'Promd. Dol' },
    { key: 'costoUltCompra', label: 'Ultima Compra' },
  ];

  //  allArticulos: Articulo[] = [];

  constructor(
    private api: ApiArticuloService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.findAll().subscribe((data) => {
      this.allArticulos.set(data);
      this.filteredArticulos.set(data);
    });
  }

  onSearchChange(text: string): void {
    this.searchText.set(text);
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
    this.onSort(this.sortColumn());
  }

  onSort(column: string): void {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }

    const sortedData = [...this.filteredArticulos()];
    sortedData.sort((a, b) => {
      // Usa una aserción de tipo para que TypeScript confíe en que 'column' es una clave de Articulo
      const aValue = a[column as keyof Articulo];
      const bValue = b[column as keyof Articulo];
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

  paginatedArticulos = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredArticulos().slice(start, end);
  });

  totalPages = computed(() =>
    Math.ceil(this.filteredArticulos().length / this.pageSize())
  );

  pages = computed(() => {
    const totalPages = this.totalPages();
    const currentPage = this.currentPage();
    const pages: number[] = [];

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
