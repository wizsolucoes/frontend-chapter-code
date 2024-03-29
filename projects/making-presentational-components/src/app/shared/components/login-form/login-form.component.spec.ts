import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let template: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have login form', () => {
    expect(template.querySelector('form[data-test="login"]')).toBeTruthy();

    expect(template.querySelector('input[data-test="email"]')).toBeTruthy();

    expect(template.querySelector('input[data-test="password"]')).toBeTruthy();

    expect(template.querySelector('button[data-test="submit"]')).toBeTruthy();
  });

  it('should call onSubmitClicked when button is clicked', () => {
    // Given
    const button: HTMLButtonElement | null = template.querySelector(
      'button[data-test="submit"]'
    );

    spyOn(component, 'onSubmitClicked');

    // When
    button?.click();

    // Then
    expect(component.onSubmitClicked).toHaveBeenCalled();
  });

  describe('onSubmitClicked', () => {
    it('should emit event with input', () => {
      // Given
      const email = 'test@example.com';
      const password = 'password';

      component.form.value.email = email;
      component.form.value.password = password;

      const emailKey = 'email';
      const passwordKey = 'password';

      component.form.controls[emailKey].setErrors(null);
      component.form.controls[passwordKey].setErrors(null);

      spyOn(component.buttonClick, 'emit');

      // When
      component.onSubmitClicked();

      // Then
      expect(component.buttonClick.emit).toHaveBeenCalledWith({
        userName: email,
        password,
      });
    });
  });
});
