import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ResponseList } from '@interfaces/response.interface';
import { CreateTrade, FilterTrade, Trade } from '@interfaces/trade.interface';

@Injectable({ providedIn: 'root' })
export class TradeService {
  private uri: string;
  constructor(private http: HttpClient) {
    this.uri = `${environment.apiUrl}/trade`;
  }

  public getFiltered(filterTrade: FilterTrade): Observable<ResponseList<Trade>> {
    const { textSearch, page, perPage, fromDate, toDate, type } = filterTrade;
    const query = `textSearch=${textSearch}&page=${page}&perPage=${perPage}&type=${type}`;
    const queryFromDate = fromDate ? `&fromDate=${fromDate}` : '';
    const queryToDate = toDate ? `&toDate=${toDate}` : '';
    return this.http.get<ResponseList<Trade>>(
      `${this.uri}/filter?${query}${queryFromDate}${queryToDate}`
    );
  }

  public create(createTrade: CreateTrade): Observable<Trade> {
    return this.http.post<Trade>(this.uri, createTrade);
  }
}
