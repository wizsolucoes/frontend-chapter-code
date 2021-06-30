import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Input() title?: string;

  @Output() buttonClick: EventEmitter<{
    userName: string;
    password: string;
  }> = new EventEmitter();

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  @Input() loginErrorMessage: string | undefined;

  @Input() loginButtonMessage: string | undefined;

  constructor(private fb: FormBuilder) {}

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  onSubmitClicked() {
    if (this.form.invalid) {
      return;
    }

    this.buttonClick.emit({
      userName: this.form.value.email,
      password: this.form.value.password,
    });
  }
}
