import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  NavbarComponent,
  NavLink,
} from '../../shared/components/navbar.component';

@Component({
  selector: 'maquina-prueba-container',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <navbar [title]="'Maquinas App'" [links]="maquinasLinks" />
    <div class="container my-4 mx-auto px-4">
      <router-outlet />
    </div>
  `,
  styles: [],
})
export class MaquinaPruebaContainerComponent {
  maquinasLinks: NavLink[] = [
    { label: 'Home', path: '/maquinas', isactive: true },
    { label: 'Crear Maquina', path: '/maquinas/create', isactive: false },
  ];
}
