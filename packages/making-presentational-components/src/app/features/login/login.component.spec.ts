import { HomeComponent } from './../home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SSOConectorService } from '@wizsolucoes/ngx-wiz-sso';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LoginFormModule } from 'src/app/shared/components/login-form/login-form.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let template: HTMLElement;
  let mockSSO: jasmine.SpyObj<SSOConectorService>;
  let router: Router;

  beforeEach(async () => {
    mockSSO = jasmine.createSpyObj('mockSSO', ['loginWithCredentials']);
    const routes = [
      {
        path: 'home',
        component: HomeComponent,
      },
    ];

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(routes),
        LoginFormModule,
      ],
      providers: [{ provide: SSOConectorService, useValue: mockSSO }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an app login component', () => {
    expect(template.querySelector('app-login-form')).toBeTruthy();
  });

  describe('#onSubmit', () => {
    it('should call sso loginWithCredentials when form is valid', () => {
      // Given
      mockSSO.loginWithCredentials.and.returnValue(
        of({
          expiresIn: 'foo',
          hash: 'foo',
          refreshToken: 'foo',
          tokenType: 'foo',
        })
      );

      const email = 'email';
      const password = 'password';

      spyOn(router, 'navigate');

      // When
      component.onSubmit({ userName: email, password: password });

      // Then
      expect(mockSSO.loginWithCredentials).toHaveBeenCalledWith({
        userName: email,
        password: password,
      });

      expect(router.navigate).toHaveBeenCalledWith(['/home']);
    });
  });
});
