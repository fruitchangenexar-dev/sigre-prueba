import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Maquina, MaquinaInterface } from '../../models/maquina';
import { SharingMaquinaService } from '../../services/sharing-maquina.service';
import { ApiMaquinaService } from '../../services/api-maquina.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'maquina-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './maquina-form.component.html',
})
export class MaquinaPruebaFormComponent implements OnInit {
  maquina: MaquinaInterface;
  maquinaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private sharingData: SharingMaquinaService,
    private api: ApiMaquinaService
  ) {
    this.maquina = new Maquina();
  }

  ngOnInit(): void {
    this.sharingData.selectMaquinaEventEmitter.subscribe(
      //(maquina) => (this.maquina = maquina)
      (maquina) => {}
    );

    this.route.paramMap.subscribe((params) => {
      const id: string = params.get('id') || '';
      console.log(id);
      console.log('entre');
      if (id !== '') {
        this.api.findById(id).subscribe((data) => {
          this.maquina = data;
        });
        this.sharingData.findMaquinaByIdEventEmitter.emit(id);
      }
    });

    this.maquinaForm = this.fb.group({
      codMaquina: [
        this.maquina.codMaquina,
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      descMaq: [this.maquina.codMaquina, [Validators.required, Validators.maxLength(100)]],
      capNormDiaria: [this.maquina.capExtraDiaria, [Validators.min(0), Validators.max(999)]],
      capExtraDiaria: [this.maquina.capExtraDiaria, [Validators.min(0), Validators.max(999)]],
      capacidadCarga: [this.maquina.capacidadCarga, [Validators.min(0), Validators.max(99999)]],
      tara: [this.maquina.tara, [Validators.min(0), Validators.max(99999)]],
      costoXUnd: [this.maquina.costoXUnd, [Validators.min(0), Validators.max(99999999999)]],
      costoUnitario: [this.maquina.costoUnitario, [Validators.min(0), Validators.max(99999999999)]],
    });
  }

  onSubmit(maquinaForm: NgForm): void {
    if (maquinaForm.valid) {
      const maquinaData = this.maquinaForm.value;
      this.api.saveMaquina(maquinaData).subscribe({
        next: (response) => {
          Swal.fire({
              title: 'Guardado!',
              text: 'Maquina guardada con exito!',
              icon: 'success',
            });
          console.log('Máquina guardada con éxito:', response);
        },
        error: (error) => {
          Swal.fire({
              title: 'Error!',
              text: 'Ha ocurrido un error!',
              icon: 'error',
            });
          console.error('Error al guardar la máquina:', error);
        },
      });

      //this.sharingData.newMaquinaEventEmitter.emit(this.maquina);
    }
    maquinaForm.reset();
    maquinaForm.resetForm();
  }

  onClear(maquinaForm: NgForm): void {
    this.maquina = new Maquina();
    maquinaForm.reset();
    maquinaForm.resetForm();
  }
}
