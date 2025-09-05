// src/app/shared/validators/decimal.validator.ts

import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

/**
 * Validador para un tipo de dato DECIMAL(precision, scale).
 * @param precision Número total de dígitos.
 * @param scale Número de dígitos después del punto decimal.
 * @returns Un objeto de error si la validación falla, de lo contrario null.
 */
export function decimalValidator(
  precision: number,
  scale: number
): ValidatorFn {
  const entero = precision - scale;
  const regex = new RegExp(`^-?\\d{1,${entero}}(?:\\.\\d{1,${scale}})?$`);

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === '' || typeof value === 'undefined') {
      return null; // No valida si el valor es nulo o vacío
    }

    // La expresión regular es la clave aquí:
    // ^-?         -> Opcional para números negativos
    // \\d{1,${entero}} -> 1 a 'entero' dígitos
    // (?:\\.\\d{1,${scale}})? -> Grupo opcional con un punto y 1 a 'scale' dígitos
    // $           -> Fin de la cadena
    if (!regex.test(value)) {
      return { invalidDecimal: true };
    }

    return null;
  };
}
