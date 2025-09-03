import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserContainerComponent } from './components/user-container/user-containter-component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
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
