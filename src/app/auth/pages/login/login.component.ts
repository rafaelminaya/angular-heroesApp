import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  login() {
    // 1) ir al backend
    // un usuario almacenarlo en un servicio

    this.authService.login().subscribe((response) => {
      console.log(response);
      if (response.id) {
        this.router.navigate(['./heroes']);
      }
    });
  }
  IngresarSinlogin() {
    this.authService.logout();
    this.router.navigate(['./heroes']);
  }
}
