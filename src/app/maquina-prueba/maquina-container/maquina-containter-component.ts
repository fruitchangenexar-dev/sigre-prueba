import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../navbar/navbar.component';
import { Maquina } from '../../models/maquina';
import { SharingMaquinaService } from '../../services/sharing-maquina.service';

@Component({
  selector: 'maquina-prueba-container',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <navbar [maquinas]="maquinas" />
    <div class="container my-4 mx-auto px-4">
      <router-outlet />
    </div>
  `,
  styles: [],
})
export class MaquinaPruebaContainerComponent implements OnInit {
  maquinas: Maquina[] = [];

  constructor(
    private router: Router,
    private sharingData: SharingMaquinaService
  ) {}

  ngOnInit(): void {
    this.addMaquina();
    this.removeMaquina();
    this.findMaquinaById();
  }

  findMaquinaById() {
    this.sharingData.findMaquinaByIdEventEmitter.subscribe((codMaquina) => {
      const maquina = this.maquinas.find((maquina) => maquina.codMaquina == codMaquina);
      this.sharingData.selectMaquinaEventEmitter.emit(maquina);
    });
  }

  addMaquina() {
    this.sharingData.newMaquinaEventEmitter.subscribe((maquina) => {
      //if (maquina.codMaquina > 0) {
        this.maquinas = this.maquinas.map((u) => (u.codMaquina == maquina.codMaquina ? { ...maquina } : u));
      /*} else {
        this.maquinas = [...this.maquinas, { ...maquina, codMaquina: new Date().getTime() }];
      }*/
      this.router.navigate(['/maquinas'], {
        state: { maquinas: this.maquinas },
      });
      Swal.fire({
        title: 'Guardado!',
        text: 'Maquina guardado con exito!',
        icon: 'success',
      });
      console.log(maquina);
    });
  }

  removeMaquina(): void {
    this.sharingData.idMaquinaEventEmitter.subscribe((codMaquina) => {
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
          this.maquinas = this.maquinas.filter((maquina) => maquina.codMaquina != codMaquina);
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
