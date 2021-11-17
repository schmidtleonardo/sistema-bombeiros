import { AbstractControl, ControlContainer, ValidatorFn } from "@angular/forms";


export function nomeCompleto(): ValidatorFn {
  return (control: AbstractControl) => {
    if(!control.value) {
      return null;
    }
    const numeroPalavras = control.value.trim().split(/\s+/).length;
    if (numeroPalavras >= 2) {
      return null;
    } else {
      return { numeroDePalavras: numeroPalavras, digitado: control.value};
    }
  }
}
