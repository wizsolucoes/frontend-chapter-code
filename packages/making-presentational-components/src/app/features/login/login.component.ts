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
  constructor(private sso: SSOConectorService, private router: Router) {}

  onSubmit(credentials: { userName: string; password: string }): void {
    this.sso.loginWithCredentials(credentials).subscribe(
      (data) => {
        this.router.navigate(['/home']);
      },
      (error) => {
        // this.loginErrorMessage = error.error_description;
        // this.loginButtonMessage = 'Entrar';
      }
    );
  }
}
