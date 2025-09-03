import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'articulos',
    title: 'Articulos',
    loadComponent: () =>
      import('./articulo/articulo.component').then((c) => c.ArticuloComponent),
  },
  {
    path: 'maquinas',
    title: 'Maquinas',
    loadComponent: () =>
      import('./maquina/maquina.component').then((c) => c.MaquinaComponent),
  },
];
