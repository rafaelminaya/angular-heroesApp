import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /*
  - route : Ruta, asignada en la clase de rutas, que se quiere cargar
  - state :  va a ser el snapshot actual(momento actual)
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // retornaremos un Observable que emite un boolean
    return this.authService.verificaAutenticacion().pipe(
      tap((estaAutenticado) => {
        // Si no está logeado lo redireccionamos al login
        if (!estaAutenticado) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
  }

  /*

  - route : Ruta, asignada en la clase de rutas, que se quiere cargar
  - segments : Segmento de la ruta, es decir, la separación de cada palabra de la url por slash "/"

  - Método que indica si puede o no cargar un módulo.
  - Este método retornará un Observable que emite un booleano, o una promesa que emite un booleano o un booleano.
  - Estos valores indican si puede ingresar o no a la ruta
  - El escenario es perado es que el "canLoad()" devuelve un "true" para dejar pasar a la url

  */

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    // retornaremos un boolean
    return this.authService.verificaAutenticacion().pipe(
      tap((estaAutenticado) => {
        // Si no está logeado lo redireccionamos al login
        if (!estaAutenticado) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
  }
}
