import { PAGINATION } from '@consts/pagination';
import { PaginationInterface } from '@interfaces/pagination.interface';
import { FilterProduct, Product } from '@interfaces/product.interface';
import { createReducer, on } from '@ngrx/store';
import {
  loadCreateProduct,
  loadCreateProductFailure,
  loadCreateProductSuccess,
  loadFilterProduct,
  loadProductsFiltered,
  loadProductsFilteredFailure,
  loadProductsFilteredSuccess,
  loadUpdateProduct,
  loadUpdateProductSuccess,
} from './product.actions';
import { loadUpdateCategoryFailure } from '../../categories/state/category.actions';

export const productFeatureKey = 'product';

export interface ProductState {
  filteredProducts: Product[];
  loading: boolean;
  totalProducts: number;
  filter: FilterProduct;
  pagination: PaginationInterface;
  error: any;
}

export const initialState: ProductState = {
  filteredProducts: [],
  loading: false,
  totalProducts: 0,
  filter: { textSearch: '', page: 1, perPage: PAGINATION.PRODUCT_PER_PAGE },
  pagination: {
    currentPage: 1,
    perPage: PAGINATION.PRODUCT_PER_PAGE,
    totalPages: 0,
    totalItems: 0,
  },
  error: null,
};

export const _productReducer = createReducer(
  initialState,
  on(loadProductsFiltered, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadProductsFilteredSuccess, (state, { response }) => ({
    ...state,
    filteredProducts: response.data,
    pagination: {
      currentPage: response.currentPage,
      perPage: response.perPage,
      totalPages: response.totalPages,
      totalItems: response.totalItems,
    },
    loading: false,
  })),
  on(loadProductsFilteredFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(loadCreateProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadCreateProductSuccess, (state, { product }) => {
    const updatedProducts =
      state.filteredProducts.length < state.pagination.perPage
        ? [product, ...state.filteredProducts]
        : [product, ...state.filteredProducts.slice(0, -1)];

    return {
      ...state,
      filteredProducts: updatedProducts,
      pagination: {
        ...state.pagination,
        totalItems: state.pagination.totalItems + 1,
      },
      loading: false,
    };
  }),
  on(loadCreateProductFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(loadUpdateProduct, (state) => ({ ...state, loading: true, error: null })),
  on(loadUpdateProductSuccess, (state, { product }) => {
    const products = state.filteredProducts.map((p) =>
      p.id === product.id ? product : p
    );
    return { ...state, filteredProducts: products, loading: false };
  }),
  on(loadUpdateCategoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(loadFilterProduct, (state, { filter }) => ({
    ...state,
    filter: { ...filter },
  }))
);
