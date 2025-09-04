import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <input
      type="text"
      [ngModel]="searchText"
      (ngModelChange)="onSearchTextChange($event)"
      placeholder="Buscar..."
      class="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
    />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterComponent {
  @Input({ required: true }) searchText!: string;
  @Output() searchTextChange = new EventEmitter<string>();

  onSearchTextChange(value: string): void {
    this.searchTextChange.emit(value);
  }
}
