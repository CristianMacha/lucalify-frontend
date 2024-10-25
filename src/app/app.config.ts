import { ApplicationConfig, isDevMode, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';

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
  _saleReducer,
  saleFeatureKey,
} from './backoffice/sales/state/sale.reducer';
import { provideEffects } from '@ngrx/effects';
import { ClientEffects } from './backoffice/clients/state/client.effects';
import { CategoryEffects } from './backoffice/inventory/categories/state/category.effects';
import { ProductEffects } from './backoffice/inventory/products/state/product.effects';
import { SaleEffects } from './backoffice/sales/state/sale.effects';
import { _formSaleReducer, formSaleFeatureKey } from './backoffice/sales/form-sale/state/form-sale.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    provideStore(),
    provideState({ name: authFeatureKey, reducer: _authReducer }),
    provideState({ name: categoryFeatureKey, reducer: _categoryReducer }),
    provideState({ name: productFeatureKey, reducer: _productReducer }),
    provideState({ name: clientFeatureKey, reducer: _clientReducer }),
    provideState({ name: saleFeatureKey, reducer: _saleReducer }),
    provideState({ name: formSaleFeatureKey, reducer: _formSaleReducer }),
    provideEffects([
      ClientEffects,
      CategoryEffects,
      ProductEffects,
      SaleEffects,
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
