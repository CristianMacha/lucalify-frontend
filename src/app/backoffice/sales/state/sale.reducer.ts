import { PAGINATION } from '@consts/pagination';
import { PaginationInterface } from '@interfaces/pagination.interface';
import { FilterSale, Sale } from '@interfaces/sale.interface';
import { createReducer, on } from '@ngrx/store';
import {
  loadFilteredSale,
  loadFilteredSaleFailure,
  loadFilteredSaleSuccess,
} from './sale.actions';

export const saleFeatureKey = 'sale';

export interface SaleState {
  filteredSales: Sale[];
  loading: boolean;
  filters: FilterSale;
  pagination: PaginationInterface;
  error: any;
}

export const initialState: SaleState = {
  filteredSales: [],
  loading: false,
  filters: { textSearch: '', page: 1, perPage: PAGINATION.SALE_PER_PAGE },
  pagination: {
    currentPage: 1,
    perPage: PAGINATION.SALE_PER_PAGE,
    totalPages: 0,
    totalItems: 0,
  },
  error: null,
};

export const _saleReducer = createReducer(
  initialState,
  on(loadFilteredSale, (state) => ({ ...state, loading: true, error: null })),
  on(loadFilteredSaleSuccess, (state, { response }) => ({
    ...state,
    filteredSales: response.data,
    pagination: {
      currentPage: response.currentPage,
      perPage: response.perPage,
      totalPages: response.totalPages,
      totalItems: response.totalItems,
    },
    loading: false,
  })),
  on(loadFilteredSaleFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
