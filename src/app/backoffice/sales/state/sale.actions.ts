import { ResponseList } from "@interfaces/response.interface";
import { FilterSale, Sale } from "@interfaces/sale.interface";
import { createAction, props } from "@ngrx/store";

export const loadFilteredSale = createAction('[Sale] Load Sale Filtered', props<{ filter: FilterSale }>());
export const loadFilteredSaleSuccess = createAction('[Sale] Load Sale Filtered Success', props<{ response: ResponseList<Sale> }>());
export const loadFilteredSaleFailure = createAction('[Sale] Load Sale Filtered Failure', props<{ error: any }>());
