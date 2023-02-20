import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '', // http://localhost:4200/heroes
    component: HomeComponent, // Esta sería la ruta padre y sus rutas hijas son las que están dentro del atributo "children" que para mostrar necesitaríamos añadir un "<router-outlet>" en el template de este componente padre
    children: [
      {
        path: 'listado', // http://localhost:4200/heroes/listado
        component: ListadoComponent,
      },
      {
        path: 'agregar', // http://localhost:4200/heroes/agregar
        component: AgregarComponent,
      },
      {
        path: 'editar/:id', // http://localhost:4200/heroes/editar/1
        component: AgregarComponent,
      },
      {
        path: 'buscar', // http://localhost:4200/heroes/buscar
        component: BuscarComponent,
      },
      {
        path: '**',
        redirectTo: 'listado',
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
