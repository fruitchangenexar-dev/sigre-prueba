import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserContainerComponent } from './components/user-container/user-containter-component';
import { MaquinaPruebaContainerComponent } from './maquina-prueba/maquina-container/maquina-containter-component';
import { MaquinaPruebaFormComponent } from './maquina-prueba/maquina-form/maquina-form.component';
import { MaquinaTableComponent } from './maquina-prueba/maquina/maquina.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/users',
  },
  {
    path: 'users',
    title: 'Usuarios',
    component: UserContainerComponent,
    children: [
      {
        path: '',
        component: UserComponent,
      },
      {
        path: 'create',
        component: UserFormComponent,
      },
      {
        path: 'edit/:id',
        component: UserFormComponent,
      },
    ],
  },
  {
    path: 'maquinas',
    title: 'Maquinas',
    component: MaquinaPruebaContainerComponent,
    children: [
      {
        path: '',
        component: MaquinaTableComponent,
      },
      {
        path: 'create',
        component: MaquinaPruebaFormComponent,
      },
      {
        path: 'edit/:id',
        component: MaquinaPruebaFormComponent,
      },
    ],
  },
  {
    path: 'articulos',
    title: 'Articulos',
    loadComponent: () =>
      import('./articulo/articulo.component').then((c) => c.ArticuloComponent),
  },
];
