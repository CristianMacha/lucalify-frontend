import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  FilterProductTrade,
  ProductTrade,
} from '@interfaces/product-trade.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductTradeService {
  private http = inject(HttpClient);
  private uri: string;

  constructor() {
    this.uri = `${environment.apiUrl}/product-trade`;
  }

  public getFiltered(filter: FilterProductTrade): Observable<ProductTrade[]> {
    const { startDate, endDate, textSearch } = filter;
    const query = `?startDate=${startDate}&endDate=${endDate}&textSearch=${textSearch}`;
    return this.http.get<ProductTrade[]>(`${this.uri}/filter${query}`);
  }
}
