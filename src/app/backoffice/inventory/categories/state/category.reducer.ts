import { Category, FilterCategory } from '@interfaces/category.interface';
import { createReducer, on } from '@ngrx/store';
import {
  loadCreateCategory,
  loadCreateCategorySuccess,
  loadFilterCategory,
  loadFilteredCategories,
  loadFilteredCategoriesFailure,
  loadFilteredCategoriesSuccess,
  loadUpdateCategory,
  loadUpdateCategorySuccess,
} from './category.actions';
import { PaginationInterface } from '@interfaces/pagination.interface';
import { PAGINATION } from '@consts/pagination';

export const categoryFeatureKey = 'category';

export interface CategoryState {
  filteredCategories: Category[];
  loading: boolean;
  filters: FilterCategory;
  pagination: PaginationInterface;
  error: any;
}

export const initialState: CategoryState = {
  filteredCategories: [],
  loading: false,
  filters: { textSearch: '', page: 1, perPage: PAGINATION.CATEGORY_PER_PAGE },
  pagination: {
    currentPage: 1,
    perPage: PAGINATION.CATEGORY_PER_PAGE,
    totalPages: 0,
    totalItems: 0,
  },
  error: null,
};

export const _categoryReducer = createReducer(
  initialState,
  on(loadFilteredCategories, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadFilteredCategoriesSuccess, (state, { reponseList }) => ({
    ...state,
    filteredCategories: reponseList.data,
    pagination: {
      currentPage: reponseList.currentPage,
      perPage: reponseList.perPage,
      totalPages: reponseList.totalPages,
      totalItems: reponseList.totalItems
    },
    loading: false,
  })),
  on(loadFilteredCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(loadCreateCategory, (state) => ({ ...state, loading: true, error: null })),
  on(loadCreateCategorySuccess, (state, { category }) => {
    const updatedCategories = state.filteredCategories.length < state.pagination.perPage
      ? [category, ...state.filteredCategories]
      : [category, ...state.filteredCategories.slice(0, -1)];

    return {
      ...state,
      filteredCategories: updatedCategories,
      pagination: { ...state.pagination, totalItems: state.pagination.totalItems + 1 },
      loading: false,
    };
  }),
  on(loadUpdateCategory, (state) => ({ ...state, loading: true, error: null })),
  on(loadUpdateCategorySuccess, (state, { category }) => {
    const categories = state.filteredCategories.map((c) =>
      c.id === category.id ? category : c
    );
    return { ...state, filteredCategories: categories, loading: false };
  }),
  on(loadFilteredCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(loadFilterCategory, (state, { filter }) => ({...state, filters: {...filter}}))
);
