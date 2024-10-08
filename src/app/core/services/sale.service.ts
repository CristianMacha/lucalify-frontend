import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ResponseList } from '@interfaces/response.interface';
import { FilterSale, Sale } from '@interfaces/sale.interface';

@Injectable({ providedIn: 'root' })
export class SaleService {
  private uri: string;
  constructor(private http: HttpClient) {
    this.uri = `${environment.apiUrl}/sale`;
  }

  public getFiltered(filterSale: FilterSale): Observable<ResponseList<Sale>> {
    const { textSearch, page, perPage, fromDate, toDate } = filterSale;
    const query = `textSearch=${textSearch}&page=${page}&perPage=${perPage}`;
    const queryFromDate = fromDate ? `&fromDate=${fromDate}` : '';
    const queryToDate = toDate ? `&toDate=${toDate}` : '';
    return this.http.get<ResponseList<Sale>>(
      `${this.uri}/filter?${query}${queryFromDate}${queryToDate}`
    );
  }
}
