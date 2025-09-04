import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { User } from '../../models/user';

@Component({
  selector: 'maquina-prueba-container',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <navbar [users]="maquinas" />
    <div class="container my-4 mx-auto px-4">
      <router-outlet />
    </div>
  `,
  styles: [],
})
export class MaquinaPruebaContainerComponent implements OnInit {
  maquinas: User[] = [];

  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService
  ) {}

  ngOnInit(): void {
    this.service.findAll().subscribe((maquinas) => (this.maquinas = maquinas));
    this.addUser();
    this.removeUser();
    this.findUserById();
  }

  findUserById() {
    this.sharingData.findUserByIdEventEmitter.subscribe((id) => {
      const maquina = this.maquinas.find((maquina) => maquina.id == id);
      this.sharingData.selectUserEventEmitter.emit(maquina);
    });
  }

  addUser() {
    this.sharingData.newUserEventEmitter.subscribe((maquina) => {
      if (maquina.id > 0) {
        this.maquinas = this.maquinas.map((u) => (u.id == maquina.id ? { ...maquina } : u));
      } else {
        this.maquinas = [...this.maquinas, { ...maquina, id: new Date().getTime() }];
      }
      this.router.navigate(['/maquinas'], {
        state: { maquinas: this.maquinas },
      });
      Swal.fire({
        title: 'Guardado!',
        text: 'Usuario guardado con exito!',
        icon: 'success',
      });
    });
  }

  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe((id) => {
      Swal.fire({
        title: 'Seguro que quiere eliminar?',
        text: 'Cuidado el usuario sera eliminado del sistema!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.isConfirmed) {
          this.maquinas = this.maquinas.filter((maquina) => maquina.id != id);
          this.router
            .navigate(['/maquinas/create'], { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/maquinas'], {
                state: { maquinas: this.maquinas },
              });
            });

          Swal.fire({
            title: 'Eliminado!',
            text: 'Usuario eliminado con exito.',
            icon: 'success',
          });
        }
      });
    });
  }
}
