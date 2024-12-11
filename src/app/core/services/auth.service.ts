import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of } from 'rxjs';

import { User } from '@interfaces/user.interface';
import {
  AuthMeResponse,
  SignIn,
  SignInResponse,
} from '@interfaces/auth.interface';
import { AuthState } from '../../auth/state/auth.reducer';
import { environment } from '../../../environments/environment';
import { authSetAccess, authSetUser } from '../../auth/state/auth.actions';

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
    return this.http.get<AuthMeResponse>(`${this.uri}/me`).pipe(
      map((resp: AuthMeResponse) => {
        this.store.dispatch(authSetUser(resp.user));
        this.store.dispatch(authSetAccess({ access: resp.access }));
        return true;
      }),
      catchError(() => of(false))
    );
  }
}
