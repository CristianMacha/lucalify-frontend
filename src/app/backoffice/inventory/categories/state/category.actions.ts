import {
  Category,
  CreateCategory,
  FilterCategory,
  UpdateCategory,
} from '@interfaces/category.interface';
import { ResponseList } from '@interfaces/response.interface';
import { createAction, props } from '@ngrx/store';

export const loadFilteredCategories = createAction(
  '[Category] Load Categories',
  props<{ filterCategory: FilterCategory }>()
);
export const loadFilteredCategoriesSuccess = createAction(
  '[Category] Loaded Categories Success',
  props<{ reponseList: ResponseList<Category> }>()
);
export const loadFilteredCategoriesFailure = createAction(
  '[Category] Load Categories Failure',
  props<{ error: any }>()
);

export const loadCreateCategory = createAction(
  '[Category] Load Create Category',
  props<{ createCategory: CreateCategory }>()
);
export const loadCreateCategorySuccess = createAction(
  '[Category] Loaded Create Category Success',
  props<{ category: Category }>()
);
export const loadCreateCategoryFailure = createAction(
  '[Category] Load Create Category Failure',
  props<{ error: any }>()
);

export const loadUpdateCategory = createAction(
  '[Category] Load Update Category',
  props<{ id: string; updateCategory: UpdateCategory }>()
);
export const loadUpdateCategorySuccess = createAction(
  '[Category] Loaded Update Category Success',
  props<{ category: Category }>()
);
export const loadUpdateCategoryFailure = createAction(
  '[Category] Load Update Category Failure',
  props<{ error: any }>()
);

export const loadFilterCategory = createAction(
  '[Category] Load Filter Category',
  props<{ filter: FilterCategory }>()
);
