import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

export class ValidacionesPropias {
    static plataformaSeleccionada(control: AbstractControl): ValidationErrors| null {
        let plataforma=parseInt(control.value);
        if(plataforma==5){
            return {plataformaSeleccionada:true};
        }else {
            return null;
        }
    }
}
