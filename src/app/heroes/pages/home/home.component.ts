import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        margin: 10px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  // GETTER
  get auth() {
    return this.authService.auth;
  }

  // CONSTRUCTOR
  constructor(private router: Router, private authService: AuthService) {}

  // MÉTODOS
  ngOnInit(): void {}

  logout() {
    this.router.navigate(['./auth']);
  }
}
