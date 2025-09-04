import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Maquina } from '../../models/maquina';
import { ApiMaquinaService } from '../../services/api-maquina.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'maquina-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: 'maquina-form.component.html',
})
export class MaquinaPruebaFormComponent implements OnInit {
  maquinaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiMaquinaService
  ) {}

  ngOnInit(): void {
    this.maquinaForm = this.fb.group({
      codMaquina: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      descMaq: ['', [Validators.required, Validators.maxLength(100)]],
      capNormDiaria: [8, [Validators.min(0), Validators.max(999)]],
      capExtraDiaria: [0, [Validators.min(0), Validators.max(999)]],
      capacidadCarga: [0, [Validators.min(0), Validators.max(99999)]],
      tara: [0, [Validators.min(0), Validators.max(99999)]],
      costoXUnd: [0, [Validators.min(0), Validators.max(99999999999)]],
      costoUnitario: [0, [Validators.min(0), Validators.max(99999999999)]],
      codOrigen: ['', [Validators.required, Validators.maxLength(2)]],
    });

    this.route.paramMap.subscribe((params) => {
      const id: string = params.get('id') || '';
      console.log('ID from route:', id);

      if (id !== '') {
        this.api.findById(id).subscribe((data: Maquina) => {
          this.maquinaForm.patchValue(data);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.maquinaForm.valid) {
      const maquinaData = this.maquinaForm.value;
      console.log(maquinaData);
      this.api.saveMaquina(maquinaData).subscribe({
        next: (response) => {
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
