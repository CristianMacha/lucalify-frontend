import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '@services/product.service';
import {
  loadCreateProduct,
  loadCreateProductFailure,
  loadCreateProductSuccess,
  loadProductsFiltered,
  loadProductsFilteredFailure,
  loadProductsFilteredSuccess,
  loadUpdateProduct,
  loadUpdateProductFailure,
  loadUpdateProductSuccess,
} from './product.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class ProductEfects {
  loadProductsFiltered$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductsFiltered),
      exhaustMap(({ filter }) =>
        this.productService.getAllFiltered(filter).pipe(
          map((response) => loadProductsFilteredSuccess({ response })),
          catchError((error) => of(loadProductsFilteredFailure({ error })))
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCreateProduct),
      exhaustMap(({ createProduct }) =>
        this.productService.create(createProduct).pipe(
          map((product) => loadCreateProductSuccess({ product })),
          catchError((error) => of(loadCreateProductFailure({ error })))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUpdateProduct),
      exhaustMap(({ id, updateProduct }) =>
        this.productService.update(id, updateProduct).pipe(
          map((product) => loadUpdateProductSuccess({ product })),
          catchError((error) => of(loadUpdateProductFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
