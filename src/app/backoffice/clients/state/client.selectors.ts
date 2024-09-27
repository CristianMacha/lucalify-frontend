import { createSelector } from "@ngrx/store";
import { AppState } from "../../../app.state";

export const selectClientFeature = (state: AppState) => state.client;

export const selectFilteredClients = createSelector(selectClientFeature, (state) => state.filteredClients);
export const selectFilterClient = createSelector(selectClientFeature, (state) => state.filters);
export const selectPaginationClient = createSelector(selectClientFeature, (state) => state.pagination);
