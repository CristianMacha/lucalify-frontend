import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of } from 'rxjs';

import { User } from '@interfaces/user.interface';
import { SignIn, SignInResponse } from '@interfaces/auth.interface';
import { AuthState } from '../../auth/state/auth.reducer';
import { environment } from '../../../environments/environment';
import { authSetUser } from '../../auth/state/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private uri: string;
  private store = inject(Store<AuthState>);
  constructor(private http: HttpClient) {
    this.uri = `${environment.apiUrl}/auth`;
  }

  public login(user: SignIn): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.uri}/signin`, user);
  }

  public getMe(): Observable<boolean> {
    return this.http.get<User>(`${this.uri}/me`).pipe(
      map((user: User) => {
        this.store.dispatch(authSetUser(user));
        return true;
      }),
      catchError(() => of(false))
    );
  }
}
