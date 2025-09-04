import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex justify-center items-center mb-4 space-x-2">
      <button
        (click)="pageChange.emit(currentPage - 1)"
        [disabled]="currentPage === 1"
        class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>

      @for (page of pages; track page) { @if (page === -1) {
      <span class="px-4 py-2 border rounded-lg text-gray-600">...</span>
      } @else {
      <button
        (click)="pageChange.emit(page)"
        [ngClass]="{ 'bg-blue-500 text-white': page === currentPage }"
        class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-200"
      >
        {{ page }}
      </button>
      } }

      <button
        (click)="pageChange.emit(currentPage + 1)"
        [disabled]="currentPage === totalPages"
        class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente
      </button>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input({ required: true }) currentPage!: number;
  @Input({ required: true }) totalPages!: number;
  @Input({ required: true }) pages!: number[];

  @Output() pageChange = new EventEmitter<number>();
}
