import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  // estilo para añadir un margin-top a todo atributo "mat-card"
  styles: [
    `
      mat-card {
        margin-top: 20px;
      }
    `,
  ],
})
export class HeroeTarjetaComponent {
  // 1° Opción
  @Input()
  heroe!: Heroe;
  // 2° Opción
  /*
  @Input
  heroe: Heroe | undefined;
  /*/

  constructor() {}
}
