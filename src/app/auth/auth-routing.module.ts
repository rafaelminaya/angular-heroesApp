import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '', // http://localhost:4200/auth
    // children: Especifica cuáles son las rutas hijas que vamos a tener
    children: [
      {
        path: 'login', // http://localhost:4200/auth/login
        component: LoginComponent,
      },
      {
        path: 'register', // http://localhost:4200/auth/register
        component: RegisterComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)], // forChild() : Especifica las rutas hijas las cuales se cargarán mediante la "carga perezoza" / "lazy loading"
  exports: [RouterModule], // Exportamos las rutas hijas
})
export class AuthRoutingModule {}
