import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
// ActivatedRoute : Permitre leer el url actual, estando al pendiente de sus parámetros, suscribiéndose
export class AgregarComponent implements OnInit {
  // ATRIBUTOS
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  // CONSTRUCTOR
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  // MÉTODOS
  ngOnInit(): void {
    // validamos que se invoque al método "getHeroePorid()" del servicio
    // solo si la url actual contiene la palabra "editar"
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.heroesService.getHeroePorid(id)))
        .subscribe((heroe) => (this.heroe = heroe));
    }
  }

  // método para guardar o actualizar un héroe
  guardar() {
    // validación de que haya al menos el nombre del héroe
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    // Actualizamos
    if (this.heroe.id) {
      this.heroesService.actualizarHeroe(this.heroe).subscribe((heroe) => {
        // Asignamos el héroe obtenido a la variable local, así mostrar la imagen más reciente
        this.heroe = heroe;
        this.mostrarSnackBar('Registro actualizado');
        console.log('Actualizando', heroe);
      });
    }
    // Guardamos
    else {
      this.heroesService.agregarHeroe(this.heroe).subscribe((heroe) => {
        this.mostrarSnackBar('Registro creado');
        // Redireccionamos a la vista de editar
        this.router.navigate(['/heroes/editar', heroe.id]);
      });
    }
  }

  borrar() {
    // ConfirmarComponent : Es un componente creado mediante angular cli, que contendrá el contenido del dialog(ventana flotante)
    // width: '250px', : Ancho de la ventaja dialog
    // data: Envía algún valor al componente que contiene el dialog, en este caso a "ConfirmarComponent"
    // { ...this.heroe } : Por prevención enviamos un nuevo héroe usando el "operador spread", ya que los objetos en JS se envían por referencia, pudiendo modificarse su estado
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: { ...this.heroe },
    });

    // condicionamos para que cuando se cierre el dialog
    dialog.afterClosed().subscribe((response) => {
      // Si recibimos un valor "true" desde el dialog, procedemos a borrar el héroe
      if (response) {
        this.heroesService.borrarHeroe(this.heroe.id!).subscribe((response) => {
          this.router.navigate(['/heroes']);
        });
      }
    });
  }

  mostrarSnackBar(mensaje: string) {
    /*
    mensaje : contendrá el mensaje a mostar el snack bar
    'ok!' : título del botón que cierra el snack bar
    duration: 2500, : Tiempo para que se auto cierre el snack bar
    */
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500,
    });
  }
}
