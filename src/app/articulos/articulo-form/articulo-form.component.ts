import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiArticuloService } from '../../services/api-articulo.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { OrigenShared } from '../../models/origen';
import { ApiOrigenService } from '../../services/api-origen.service';
import { decimalValidator } from '../../shared/validators/decimal.validator';
import { ApiSubCategoriaService } from '../../services/api-sub-categoria.service';
import { ApiUnidadService } from '../../services/api-unidad.service';
import { UnidadShared } from '../../models/unidad';
import { SubCategoriaShared } from '../../models/sub-categoria';

@Component({
  selector: 'articulo-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: 'articulo-form.component.html',
})
export class ArticuloPruebaFormComponent implements OnInit {
  articuloForm!: FormGroup;
  public origenes: OrigenShared[] = [];
  public unidades: UnidadShared[] = [];
  public subCategorias: SubCategoriaShared[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiArticuloService,
    private origenService: ApiOrigenService,
    private unidadService: ApiUnidadService,
    private subCategoriaService: ApiSubCategoriaService
  ) {}

  ngOnInit(): void {
    this.articuloForm = this.fb.group({
      codArticulo: ['', [Validators.required, Validators.maxLength(12)]],
      nombre: ['', [Validators.required, Validators.maxLength(150)]],
      descripcion: ['', [Validators.required, Validators.maxLength(150)]],
      pesoUnidad: [, [Validators.required, Validators.min(0), decimalValidator(6, 2)]],
      costoPromSol: [, [Validators.min(0), decimalValidator(17, 8)]],
      costoPromDol: [, [Validators.min(0), decimalValidator(17, 8)]],
      costoUltCompra: [, [Validators.min(0), decimalValidator(17, 8)]],
      codOrigen: ['', [Validators.required]],
      codUnidad: ['', [Validators.required]],
      subCategoriaArticulo: ['', [Validators.required]],
    });

    this.origenService.listShared().subscribe((data) => {
      this.origenes = data;
    });

    this.unidadService.listShared().subscribe((data) => {
      this.unidades = data;
    });

    this.subCategoriaService.listShared().subscribe((data) => {
      this.subCategorias = data;
    });
  }

  onSubmit(): void {
    if (this.articuloForm.valid) {
      this.api.saveArticulo(this.articuloForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/articulos']);
          Swal.fire({
            title: 'Guardado!',
            text: 'Articulo guardado con exito!',
            icon: 'success',
          });
          console.log('Articulo guardado con éxito:', response);
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
    this.articuloForm.reset();
  }
}
