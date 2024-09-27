import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientService } from '@services/client.service';
import {
  loadCreateClient,
  loadCreateClientFailure,
  loadCreateClientSuccess,
  loadFilteredClients,
  loadFilteredClientsFailure,
  loadFilteredClientsSuccess,
  loadUpdateClient,
  loadUpdateClientFailure,
  loadUpdateClientSuccess,
} from './client.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class ClientEffects {
  loadFilteredClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFilteredClients),
      exhaustMap(({ filter }) =>
        this.clientService.getFilteredClients(filter).pipe(
          map((response) => loadFilteredClientsSuccess({ response })),
          catchError((error) => of(loadFilteredClientsFailure({ error })))
        )
      )
    )
  );

  createClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCreateClient),
      exhaustMap(({ createClient }) =>
        this.clientService.create(createClient).pipe(
          map((client) => loadCreateClientSuccess({ client })),
          catchError((error) => of(loadCreateClientFailure({ error })))
        )
      )
    )
  );

  updateClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUpdateClient),
      exhaustMap(({ id, updateClient }) =>
        this.clientService.update(id, updateClient).pipe(
          map((client) => loadUpdateClientSuccess({ client })),
          catchError((error) => of(loadUpdateClientFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private clientService: ClientService
  ) {}
}
