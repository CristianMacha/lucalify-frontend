import { createSelector } from '@ngrx/store';
import { AppState } from '../../../../app.state';

export const selectFormSaleFeature = (state: AppState) => state.formSale;

export const selectFormSaleProducts = createSelector(selectFormSaleFeature, (state) => state.productSales);
export const selectFormSaleClient = createSelector(selectFormSaleFeature, (state) => state.client);
export const selectFormSalePayments = createSelector(selectFormSaleFeature, (state) => state.payments);
