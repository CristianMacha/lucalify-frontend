import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IdentityDni, IdentityRuc } from '@interfaces/identity.interface';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  private uri: string;

  constructor(private http: HttpClient) {
    this.uri = `${environment.apiUrl}/identity`;
  }

  public getByDni(dni: string): Observable<IdentityDni> {
    return this.http.get<IdentityDni>(`${this.uri}/dni/${dni}`);
  }

  public getByRuc(ruc: string): Observable<IdentityRuc> {
    return this.http.get<IdentityRuc>(`${this.uri}/ruc/${ruc}`);
  }
}
