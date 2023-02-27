import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // ATRITBUTOS
  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  // GETTER
  get auth(): Auth {
    // desestructuro para asegurar que no se modifique el objeto de ninguna manera
    return { ...this._auth! };
  }

  // CONSTRUCTOR
  constructor(private httpClient: HttpClient) {}

  // MÉTODOS
  login(): Observable<Auth> {
    return this.httpClient.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap((auth) => (this._auth = auth)),
      // Asignamos el TOKEN al local storage
      tap((auth) => localStorage.setItem('token', auth.id))
    );
  }

  logout() {
    // purgamos el objeto que permite hacer login
    this._auth = undefined;
  }

  // Método que sirve para verificar el estado de la autenticacion
  verificaAutenticacion(): Observable<boolean> {
    // verificamos si no existe el TOKEN
    if (!localStorage.getItem('token')) {
      // retornamos el valor "false" dentro de un Observable
      return of(false);
    }
    return this.httpClient.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      map((auth) => {
        console.log(auth);
        this._auth = auth;
        return true;
      })
    );
  }
}
