import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [],
})
export class ConfirmarComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ConfirmarComponent>,
    // Leemos la data recibida y es almacenada en esta propiedad local "data" que será de tipo "Heroe". Será pública para poder ser usada en el html del template
    @Inject(MAT_DIALOG_DATA) public data: Heroe
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  borrar() {
    // true : Es el valor que este dialog enviará al componente desde donde se le invocó, en este caso "AgregarComponent"
    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
