import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { TypeDocument } from '@interfaces/type-document.interface';

@Injectable({
  providedIn: 'root',
})
export class TypeDocumentService {
  private uri: string;
  constructor(private http: HttpClient) {
    this.uri = `${environment.apiUrl}/type-document`;
  }

  public getAll(): Observable<TypeDocument[]> {
    return this.http.get<TypeDocument[]>(`${this.uri}`);
  }
}
