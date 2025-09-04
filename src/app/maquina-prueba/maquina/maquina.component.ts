import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiMaquinaService } from '../../services/api-maquina.service';
import { TableComponent } from '../../shared/components/table.component';
import { PaginationComponent } from '../../shared/components/pagination.component';
import { SearchFilterComponent } from '../../shared/components/search-filter.component';
import { ExportButtonComponent } from '../../shared/components/export-button.component';
import { Maquina } from '../../models/maquina';
import { Header } from '../../models/header-table';
import { Router, RouterLink } from '@angular/router';
import { SharingMaquinaService } from '../../services/sharing-maquina.service';
@Component({
  selector: 'maquina-table',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    SearchFilterComponent,
    ExportButtonComponent,
  ],
  templateUrl: './maquina.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaquinaTableComponent implements OnInit {
  title: string = 'Listado de Maquinas';

  allMaquinas = signal<Maquina[]>([]);
  filteredMaquinas = signal<Maquina[]>([]);
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  searchText = signal<string>('');
  sortColumn = signal<string>('');
  sortDirection = signal<'asc' | 'desc'>('asc');

  headers: Header<Maquina>[] = [
    { key: 'codMaquina', label: 'Código' },
    //{ key: 'flagEstado', label: 'Estado' },
    { key: 'descMaq', label: 'Descripcion' },
    { key: 'capNormDiaria', label: 'Capacidad Normal Diaria' },
    { key: 'capExtraDiaria', label: 'Capacidad Extra Diaria' },
    { key: 'capacidadCarga', label: 'Capacidad Carga' },
    { key: 'tara', label: 'Tara' },
    { key: 'costoXUnd', label: 'costo x unidad' },
    //{ key: 'flagMaqEquipo', label: 'MaqEquipo' },
    //{ key: 'flagReplicacion', label: 'Replicacion' },
    { key: 'codOrigen', label: 'Origen' },
  ];

  //  allMaquinas: Maquina[] = [];

  constructor(
    private api: ApiMaquinaService,
    private sharingData: SharingMaquinaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.findAll().subscribe((data) => {
      this.allMaquinas.set(data);
      this.filteredMaquinas.set(data);
    });
  }

  onRemoveMaquina(codMaquina: string): void {
    this.sharingData.idMaquinaEventEmitter.emit(codMaquina);
  }

  onSelecteMaquina(codMaquina: String): void {
    console.log('Editando...');
    this.router.navigate(['/maquinas/edit', codMaquina], {
      state: { codMaquina },
    });
  }

  onSearchChange(text: string): void {
    this.searchText.set(text);
    const lowerCaseFilter = text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    if (text) {
      const filtered = this.allMaquinas().filter((item) =>
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
      this.filteredMaquinas.set(filtered);
    } else {
      this.filteredMaquinas.set(this.allMaquinas());
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

    const sortedData = [...this.filteredMaquinas()];
    sortedData.sort((a, b) => {
      // Usa una aserción de tipo para que TypeScript confíe en que 'column' es una clave de Maquina
      const aValue = a[column as keyof Maquina];
      const bValue = b[column as keyof Maquina];
      let comparison = 0;
      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }
      return this.sortDirection() === 'asc' ? comparison : comparison * -1;
    });

    this.filteredMaquinas.set(sortedData);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  paginatedMaquinas = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredMaquinas().slice(start, end);
  });

  totalPages = computed(() =>
    Math.ceil(this.filteredMaquinas().length / this.pageSize())
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
