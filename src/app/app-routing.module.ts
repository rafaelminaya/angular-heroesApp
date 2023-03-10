import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

/*
loadChildren: 
- Carga los hijos.
- Carga el módulo indicado por medio de una función de flecha
- Si escribimos "component", estaríamos indicando que es parte del bundle de la aplicación y eso no queremos, sino cargar un módulo

then():
- Indica que cuando se cargue la ruta del módulo en memoria, devolvemos la clase del módulo
- Método necesario ya que el "import()" devuelve una promesa
- Indicamos la clase del módulo a cargar

canLoad()
- Evita que alguien cargue el módulo de esta ruta sin antes pasar por el guard "AuthGuard"
- Se pueden especificar varios guards como un arreglo dentro de cochetes "[]"

canActivate()
- Evita que alguien además de cargar el módulo de esta ruta también lo active , está por encima en seguridad del "canLoad"
*/
const routes: Routes = [
  {
    path: 'auth', // http://localhost:4200/auth
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'heroes', // http://localhost:4200/heroes
    loadChildren: () =>
      import('./heroes/heroes.module').then((m) => m.HeroesModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: '404',
    component: ErrorPageComponent, // http://localhost:4200/404
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)], // forRoot() : Indica cuáles son las rutas principales. Este método se usa una vez por aplicación.
  exports: [RouterModule], // Exportamos estas rutas para que esté a disposición de toda la aplicación
})
export class AppRoutingModule {}
