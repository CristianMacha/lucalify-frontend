import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

export const selectProductFeature = (state: AppState) => state.product;

export const selectFilteredProducts = createSelector(
  selectProductFeature,
  (state) => state.filteredProducts
);

export const selectFilterProduct = createSelector(
  selectProductFeature,
  (state) => state.filter
);

export const selectPaginationProduct = createSelector(
  selectProductFeature,
  (state) => state.pagination
);

export const selectLoadingProduct = createSelector(
  selectProductFeature,
  (state) => state.loading
);
