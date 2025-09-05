import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  NavbarComponent,
  NavLink,
} from '../../shared/components/navbar.component';

@Component({
  selector: 'articulo-prueba-container',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <navbar [title]="'Articulos App'" [links]="articulosLinks" />
    <div class="container mx-auto px-4">
      <router-outlet />
    </div>
  `,
  styles: [],
})
export class ArticuloContainerComponent {
  articulosLinks: NavLink[] = [
    { label: 'Listado', path: '/articulos', isactive: true },
    { label: 'Crear Articulo', path: '/articulos/create', isactive: false },
  ];
}
