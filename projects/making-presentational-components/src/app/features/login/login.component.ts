import { Component } from '@angular/core';
import {
  FormControl,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { SSOConectorService } from '@wizsolucoes/ngx-wiz-sso';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginErrorMessage: string | undefined;

  loginButtonMessage = 'Entrar';

  constructor(private sso: SSOConectorService, private router: Router) {}

  onSubmit(credentials: { userName: string; password: string }): void {
    this.loginButtonMessage = 'Entrando';

    this.sso.loginWithCredentials(credentials).subscribe(
      (data) => {
        this.router.navigate(['/home']);
      },
      (error) => {
        this.loginErrorMessage = error.error_description;
        this.loginButtonMessage = 'Entrar';
      }
    );
  }
}
