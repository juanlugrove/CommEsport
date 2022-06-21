import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'posicion'
})
export class PosicionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value!=null) {
      switch (value) {
        case 0:
          return "Delantero";
        case 1:
          return "Centro campista";
        case 2:
          return "Defensa";
        case 3:
          return "Portero";
        default:
          return "Cualquiera"
      }
    }
    return null;
  }

}
