import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@services/auth.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { authLogin, authSetError, authSetUser } from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  authUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authLogin),
      exhaustMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          map((response) => {
            this.router.navigate(['/overview']);
            localStorage.setItem('token', response.token);
            return authSetUser(response.user);
          }),
          catchError((error) => of(authSetError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
