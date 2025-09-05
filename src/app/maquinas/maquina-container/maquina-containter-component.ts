// src/app/components/maquina-prueba-container/maquina-prueba-container.component.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar.component';

@Component({
  selector: 'maquina-prueba-container',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <navbar />
    <div class="container my-4 mx-auto px-4">
      <router-outlet />
    </div>
  `,
  styles: [],
})
export class MaquinaPruebaContainerComponent {}
