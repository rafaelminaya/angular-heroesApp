import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  //pure: false, // Permite que cada vez que angular haga algún cambio, se va a lanzar este pipe. Se dispararía demasiadas. Por defecto es true
})
export class ImagenPipe implements PipeTransform {
  transform(value: Heroe): string {
    // verificacion en caso no exista un id (para la vista de "nuevo heroe")
    if (!value.id && !value.alt_img) {
      return 'assets/no-image.png';
    }
    // verificación en caso se envíe el link de una imagen por el formulario (ni bien se guarda o se actualiza)
    else if (value.alt_img) {
      return value.alt_img;
    } else {
      return `assets/heroes/${value.id}.jpg`;
    }
  }
}
