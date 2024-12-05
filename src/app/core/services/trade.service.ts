import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ResponseList } from '@interfaces/response.interface';
import {
  CreateTrade,
  FilterTrade,
  Trade,
  TradeReport,
} from '@interfaces/trade.interface';

@Injectable({ providedIn: 'root' })
export class TradeService {
  private uri: string;
  constructor(private http: HttpClient) {
    this.uri = `${environment.apiUrl}/trade`;
  }

  public getFiltered(
    filterTrade: FilterTrade
  ): Observable<ResponseList<Trade>> {
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

  public getById(id: string): Observable<Trade> {
    return this.http.get<Trade>(`${this.uri}/${id}`);
  }

  public getTicket(id: string): Observable<Blob> {
    return this.http.get(`${this.uri}/ticket/${id}`, {
      responseType: 'blob',
    });
  }

  public getReport(tradeReport: TradeReport): Observable<Blob> {
    const { startDate, endDate, tradeType } = tradeReport;
    const query = `startDate=${startDate}&endDate=${endDate}&tradeType=${tradeType}`;
    return this.http.get(`${this.uri}/report?${query}`, {
      responseType: 'blob',
    });
  }
}
