import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SSOConectorService } from '@wizsolucoes/ngx-wiz-sso';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private sso: SSOWrapper) {}

  canActivate(): boolean {
    const isLogged = this.sso.isLogged();

    if (!isLogged) {
      this.router.navigate(['/login']);
    }

    return isLogged;
  }
}

@Injectable({
  providedIn: 'root',
})
export class SSOWrapper {
  isLogged(): boolean {
    return !!SSOConectorService.isLogged();
  }
}
