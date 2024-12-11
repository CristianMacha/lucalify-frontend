import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Access } from '@interfaces/access.interface';

@Injectable({ providedIn: 'root' })
export class AccessService {
  private uri: string;

  constructor(private http: HttpClient) {
    this.uri = `${environment.apiUrl}/access`;
  }

  public getByRole(roleId: string): Observable<Access[]> {
    return this.http.get<Access[]>(`${this.uri}/role/${roleId}`);
  }
}
