import { Component, inject } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  private authService = inject(AuthService);

  public loginForm = new UntypedFormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public onSubmitLogin() {
    const isInvalidForm = this.loginForm.invalid;
    isInvalidForm ? this.loginForm.markAllAsTouched() : this.login();
  }

  private login(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next: (data: any) => console.log(data),
      error: (error: any) => console.error(error),
    });
  }
}
