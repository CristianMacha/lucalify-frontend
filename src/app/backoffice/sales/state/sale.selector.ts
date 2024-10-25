import { createSelector } from '@ngrx/store';
import { AppState } from '../../../app.state';

export const selectSaleFeature = (state: AppState) => state.sale;

export const selectFilteredSales = createSelector(
  selectSaleFeature,
  (state) => state.filteredSales
);
export const selectFilterSale = createSelector(selectSaleFeature, (state) =>  state.filters)
export const selectPaginationSale = createSelector(selectSaleFeature, (state) => state.pagination)
