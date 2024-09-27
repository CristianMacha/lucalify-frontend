import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  Client,
  CreateClient,
  FilterClient,
  UpdateClient,
} from '@interfaces/client.interface';
import { Observable } from 'rxjs';
import { ResponseList } from '@interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private uri: string;
  constructor(private http: HttpClient) {
    this.uri = `${environment.apiUrl}/client`;
  }

  public getFilteredClients(
    filter: FilterClient
  ): Observable<ResponseList<Client>> {
    const { textSearch, page, perPage } = filter;
    return this.http.get<ResponseList<Client>>(
      `${this.uri}/filter?textSearch=${textSearch}&page=${page}&perPage=${perPage}`
    );
  }

  public create(createClient: CreateClient): Observable<Client> {
    return this.http.post<Client>(this.uri, createClient);
  }

  public update(id: string, updateClient: UpdateClient): Observable<Client> {
    return this.http.put<Client>(`${this.uri}/${id}`, updateClient);
  }
}
