import { ResponseList } from "@interfaces/response.interface";
import { FilterTrade, Trade } from "@interfaces/trade.interface";
import { createAction, props } from "@ngrx/store";

export const loadFilteredTrade = createAction('[Trade] Load Trade Filtered', props<{ filter: FilterTrade }>());
export const loadFilteredTradeSuccess = createAction('[Trade] Load Trade Filtered Success', props<{ response: ResponseList<Trade> }>());
export const loadFilteredTradeFailure = createAction('[Trade] Load Trade Filtered Failure', props<{ error: any }>());
