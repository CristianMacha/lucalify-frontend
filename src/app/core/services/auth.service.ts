import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SignIn } from '@interceptors/auth.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private uri: string;
  constructor(private http: HttpClient) {
    this.uri = `${environment.apiUrl}/auth`;
  }
  public login(user: SignIn): Observable<User> {
    return this.http.post<User>(`${this.uri}/signin`, user);
  }
}
