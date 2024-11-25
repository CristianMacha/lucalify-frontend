import { Injectable } from '@angular/core';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { TradeService } from '@services/trade.service';
import {
  loadFilteredTrade,
  loadFilteredTradeFailure,
  loadFilteredTradeSuccess,
} from './trade.actions';

@Injectable()
export class TradeEffects {
  loadFilteredTrades$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFilteredTrade),
      exhaustMap(({ filter }) =>
        this.tradeService.getFiltered(filter).pipe(
          map((response) => loadFilteredTradeSuccess({ response })),
          catchError((error) => of(loadFilteredTradeFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private tradeService: TradeService) {}
}
