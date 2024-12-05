import { ApplicationConfig, isDevMode, Provider } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { tokenInterceptor } from '@interceptors/token.interceptor';
import {
  _categoryReducer,
  categoryFeatureKey,
} from './backoffice/inventory/categories/state/category.reducer';
import {
  _productReducer,
  productFeatureKey,
} from './backoffice/inventory/products/state/product.reducer';
import { _authReducer, authFeatureKey } from './auth/state/auth.reducer';
import {
  _clientReducer,
  clientFeatureKey,
} from './backoffice/clients/state/client.reducer';
import {
  _tradeReducer,
  tradeFeatureKey,
} from './backoffice/trades/state/trade.reducer';
import { provideEffects } from '@ngrx/effects';
import { ClientEffects } from './backoffice/clients/state/client.effects';
import { CategoryEffects } from './backoffice/inventory/categories/state/category.effects';
import { ProductEffects } from './backoffice/inventory/products/state/product.effects';
import { TradeEffects } from './backoffice/trades/state/trade.effects';
import {
  _formTradeReducer,
  formTradeFeatureKey,
} from './backoffice/trades/form-trade/state/form-trade.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    provideStore(),
    provideState({ name: authFeatureKey, reducer: _authReducer }),
    provideState({ name: categoryFeatureKey, reducer: _categoryReducer }),
    provideState({ name: productFeatureKey, reducer: _productReducer }),
    provideState({ name: clientFeatureKey, reducer: _clientReducer }),
    provideState({ name: tradeFeatureKey, reducer: _tradeReducer }),
    provideState({ name: formTradeFeatureKey, reducer: _formTradeReducer }),
    provideEffects([
      ClientEffects,
      CategoryEffects,
      ProductEffects,
      TradeEffects,
    ]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useValue: tokenInterceptor,
      multi: true,
    },
  ],
};
