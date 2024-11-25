import { PAGINATION } from '@consts/pagination';
import { PaginationInterface } from '@interfaces/pagination.interface';
import { FilterTrade, Trade, TradeType } from '@interfaces/trade.interface';
import { createReducer, on } from '@ngrx/store';
import {
  loadFilteredTrade,
  loadFilteredTradeFailure,
  loadFilteredTradeSuccess,
} from './trade.actions';

export const tradeFeatureKey = 'trade';

export interface TradeState {
  filteredTrades: Trade[];
  loading: boolean;
  filters: FilterTrade;
  pagination: PaginationInterface;
  error: any;
}

export const initialState: TradeState = {
  filteredTrades: [],
  loading: false,
  filters: {
    textSearch: '',
    page: 1,
    perPage: PAGINATION.SALE_PER_PAGE,
    type: TradeType.SALE,
  },
  pagination: {
    currentPage: 1,
    perPage: PAGINATION.SALE_PER_PAGE,
    totalPages: 0,
    totalItems: 0,
  },
  error: null,
};

export const _tradeReducer = createReducer(
  initialState,
  on(loadFilteredTrade, (state) => ({ ...state, loading: true, error: null })),
  on(loadFilteredTradeSuccess, (state, { response }) => ({
    ...state,
    filteredTrades: response.data,
    pagination: {
      currentPage: response.currentPage,
      perPage: response.perPage,
      totalPages: response.totalPages,
      totalItems: response.totalItems,
    },
    loading: false,
  })),
  on(loadFilteredTradeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
