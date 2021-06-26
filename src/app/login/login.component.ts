import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  errorMessage: string = '';
  hasError: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private navigation: NavigationService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.navigation.hide();
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  getErrorMessage(statusCode: number): string {
    switch (statusCode) {
      case 403:
        return 'Requisição não autorizada';
      case 400:
      case 404:
        return 'Credenciais inválidas';
      default:
        return 'Erro de servidor';
    }
  }

  submit(): void {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    this.authService
      .authenticate(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe(
        (res) => {
          this.authService.postInLocalStorage(res);
          this.hasError = false;
          this.isLoading = false;
          this.router.navigate(['']);
        },
        ({ status }) => {
          this.loginForm.reset();
          this.isLoading = false;
          this.hasError = true;
          this.errorMessage = this.getErrorMessage(status);
        }
      );
  }
}
