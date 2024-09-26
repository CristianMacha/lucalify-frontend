import { createSelector } from '@ngrx/store';
import { AppState } from '../../../../app.state';

export const selectCategoryFeature = (state: AppState) => state.category;

export const selectFilteredCategories = createSelector(
  selectCategoryFeature,
  (state) => state.filteredCategories
);

export const selectFilterCategory = createSelector(
  selectCategoryFeature,
  (state) => state.filters
);
export const selectPaginationCategory = createSelector(
  selectCategoryFeature,
  (state) => state.pagination
);
