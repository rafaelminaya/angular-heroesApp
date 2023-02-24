import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [],
})
export class ListadoComponent implements OnInit {
  heroes: Heroe[] = [];
  // CONSTRUCTOR
  constructor(private heroesService: HeroesService) {}

  // MÉTODOS
  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe((response) => {
      this.heroes = response;
    });
  }
}
