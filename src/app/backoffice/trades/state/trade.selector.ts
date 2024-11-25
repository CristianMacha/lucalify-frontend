import { createSelector } from '@ngrx/store';
import { AppState } from '../../../app.state';

export const selectTradeFeature = (state: AppState) => state.trade;

export const selectFilteredTrades = createSelector(
  selectTradeFeature,
  (state) => state.filteredTrades
);
export const selectFilterTrade = createSelector(selectTradeFeature, (state) =>  state.filters)
export const selectPaginationTrade = createSelector(selectTradeFeature, (state) => state.pagination)
