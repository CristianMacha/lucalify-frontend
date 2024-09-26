import { Component, inject } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../state/auth.reducer';
import { authLogin } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  private store = inject(Store<AuthState>);

  public loginForm = new UntypedFormGroup({
    email: new FormControl('admin@test.com', [Validators.required, Validators.email]),
    password: new FormControl('admin', [Validators.required]),
  });

  public onSubmitLogin() {
    const isInvalidForm = this.loginForm.invalid;
    isInvalidForm
      ? this.loginForm.markAllAsTouched()
      : this.store.dispatch(authLogin(this.loginForm.value));
  }
}
