import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  CreateProduct,
  FilterProduct,
  KardexFilter,
  KardexResult,
  Product,
  UpdateProduct,
} from '@interfaces/product.interface';
import { ResponseList } from '@interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private uri: string;
  constructor(private http: HttpClient) {
    this.uri = `${environment.apiUrl}/product`;
  }

  public getAllFiltered(
    filterProduct: FilterProduct
  ): Observable<ResponseList<Product>> {
    const { textSearch, page, perPage } = filterProduct;
    return this.http.get<ResponseList<Product>>(
      `${this.uri}/filter?textSearch=${textSearch}&page=${page}&perPage=${perPage}`
    );
  }

  public create(createProduct: CreateProduct): Observable<Product> {
    return this.http.post<Product>(this.uri, createProduct);
  }

  public update(
    productId: string,
    updateProduct: UpdateProduct
  ): Observable<Product> {
    return this.http.put<Product>(`${this.uri}/${productId}`, updateProduct);
  }

  public search(textSearch: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.uri}/search?value=${textSearch}`);
  }

  public getKardex(kardexFilter: KardexFilter): Observable<KardexResult[]> {
    const { productCode, startDate, endDate } = kardexFilter;
    const query = `?startDate=${startDate}&endDate=${endDate}&productCode=${productCode}`;
    return this.http.get<KardexResult[]>(`${this.uri}/kardex${query}`);
  }
}
