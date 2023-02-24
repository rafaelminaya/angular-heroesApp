import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { tap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe | undefined;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  buscando() {
    this.heroesService
      .getSugerencias(this.termino.trim())
      .subscribe((heroes) => {
        this.heroes = heroes;
      });
  }
  // MatAutocompleteSelectedEvent : Evento obtenido desde el navegador, imprimiendo el argumento "event"
  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    // Validación si es un  string vacio
    if (!event.option.value) {
      this.termino = '';
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;

    // asigno la información obtenida a la caja de texto de búsqueda
    this.termino = heroe.superhero;

    // heroe.id! : Ponemos con signo para asegurar que este argumento no será nulo
    this.heroesService
      .getHeroePorid(heroe.id!)
      .subscribe((heroe) => (this.heroeSeleccionado = heroe));
  }
}
