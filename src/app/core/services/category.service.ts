import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  Category,
  CreateCategory,
  FilterCategory,
  UpdateCategory,
} from '@interfaces/category.interface';
import { ResponseList } from '@interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private uri: string;
  constructor(private http: HttpClient) {
    this.uri = `${environment.apiUrl}/category`;
  }

  public getAll(filterCategory: FilterCategory): Observable<ResponseList<Category>> {
    const { textSearch, page, perPage } = filterCategory;
    return this.http.get<ResponseList<Category>>(
      `${this.uri}/filter?textSearch=${textSearch}&page=${page}&perPage=${perPage}`
    );
  }

  public create(createCategory: CreateCategory): Observable<Category> {
    return this.http.post<Category>(this.uri, createCategory);
  }

  public update(
    categoryId: string,
    updateCategory: UpdateCategory
  ): Observable<Category> {
    return this.http.put<Category>(`${this.uri}/${categoryId}`, updateCategory);
  }

  public getListActiveCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.uri}/active`);
  }
}
