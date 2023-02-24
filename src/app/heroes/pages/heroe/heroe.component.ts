import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  // Estilo para el elemento "<img>" del componente actual
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;
  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1° Opción
    /*
    this.activatedRoute.params.subscribe(({ id }) =>
      this.heroesService
        .getHeroePorid(id)
        .subscribe((response) => (this.heroe = response))
    );
    */

    // 2° Opción
    this.activatedRoute.params
      .pipe(
        delay(500),
        tap((pathId) => console.log(pathId)),
        switchMap(({ id }) => this.heroesService.getHeroePorid(id)),
        tap((heroe) => console.log(heroe))
      )
      .subscribe((heroe) => (this.heroe = heroe));
  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }
}
