import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../models/header-table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto rounded-lg shadow-md">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs bg-[#4b8ca1] text-white uppercase">
          <tr>
            @for (header of headers; track header.key) {
            <th
              scope="col"
              class="px-6 py-3 cursor-pointer select-none"
              (click)="sort.emit(header.key)"
            >
              {{ header.label }}
              @if (sortColumn === header.key) {
              <span>
                @if (sortDirection === 'asc') { &#9650; } @else { &#9660; }
              </span>
              }
            </th>
            }
          </tr>
        </thead>
        <tbody>
          @for (item of data; track item.codArticulo) {
          <tr class="bg-white border-b hover:bg-gray-200">
            @for (header of headers; track header.key) {
            <td class="px-6 py-4 font-medium text-gray-900">
              {{ item[header.key] }}
            </td>
            }
          </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  // El componente ahora es genérico
  @Input({ required: true }) data!: any[];
  @Input({ required: true }) headers!: Header<any>[];
  @Input({ required: true }) sortColumn!: string;
  @Input({ required: true }) sortDirection!: 'asc' | 'desc';

  @Output() sort = new EventEmitter<any>();
}
