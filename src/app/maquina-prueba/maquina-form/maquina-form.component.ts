import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiMaquinaService } from '../../services/api-maquina.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { OrigenShared } from '../../models/origen';
import { ApiOrigenService } from '../../services/api-origen.service';
import { Maquina } from '../../models/maquina';

@Component({
  selector: 'maquina-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: 'maquina-form.component.html',
})
export class MaquinaPruebaFormComponent implements OnInit {
  maquinaForm!: FormGroup;
  public origenes: OrigenShared[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiMaquinaService,
    private origenService: ApiOrigenService
  ) {}

  ngOnInit(): void {
    this.maquinaForm = this.fb.group({
      codMaquina: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      descMaq: ['', [Validators.required, Validators.maxLength(100)]],
      capNormDiaria: [, [Validators.min(0), Validators.max(999)]],
      capExtraDiaria: [, [Validators.min(0), Validators.max(999)]],
      capacidadCarga: [, [Validators.min(0), Validators.max(99999)]],
      tara: [, [Validators.min(0), Validators.max(99999)]],
      costoXUnd: [, [Validators.min(0), Validators.max(99999999999)]],
      costoUnitario: [, [Validators.min(0), Validators.max(99999999999)]],
      codOrigen: ['', [Validators.required]],
    });

    this.origenService.listShared().subscribe((data) => {
      this.origenes = data;
    });
  }

  onSubmit(): void {
    if (this.maquinaForm.valid) {
      this.api.saveMaquina(this.maquinaForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/maquinas']);
          Swal.fire({
            title: 'Guardado!',
            text: 'Maquina guardada con exito!',
            icon: 'success',
          });
          console.log('Máquina guardada con éxito:', response);
          this.onClear();
        },
        error: (error) => {
          Swal.fire({
            title: 'Error!',
            text: error.error.message,
            icon: 'error',
          });
          console.error('Error al guardar la máquina:', error);
        },
      });
    }
  }

  onClear(): void {
    this.maquinaForm.reset();
  }
}
