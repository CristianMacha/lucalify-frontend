import { Injectable } from '@angular/core';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { SaleService } from '@services/sale.service';
import {
  loadFilteredSale,
  loadFilteredSaleFailure,
  loadFilteredSaleSuccess,
} from './sale.actions';

@Injectable()
export class SaleEffects {
  loadFilteredSales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFilteredSale),
      exhaustMap(({ filter }) =>
        this.saleService.getFiltered(filter).pipe(
          map((response) => loadFilteredSaleSuccess({ response })),
          catchError((error) => of(loadFilteredSaleFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private saleService: SaleService) {}
}
