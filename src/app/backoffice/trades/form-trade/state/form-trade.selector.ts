import { createSelector } from '@ngrx/store';
import { AppState } from '../../../../app.state';

export const selectFormTradeFeature = (state: AppState) => state.formTrade;

export const selectFormTradeProducts = createSelector(selectFormTradeFeature, (state) => state.productTrades);
export const selectFormTradeClient = createSelector(selectFormTradeFeature, (state) => state.client);
export const selectFormTradePayments = createSelector(selectFormTradeFeature, (state) => state.payments);
