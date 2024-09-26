import { CreateProduct, FilterProduct, Product, UpdateProduct } from '@interfaces/product.interface';
import { ResponseList } from '@interfaces/response.interface';
import { createAction, props } from '@ngrx/store';

export const loadProductsFiltered = createAction(
  '[Product] Load Products Filtered',
  props<{ filter: FilterProduct }>()
);
export const loadProductsFilteredSuccess = createAction(
  '[Product] Load Products Filtered Success',
  props<{ response: ResponseList<Product> }>()
);
export const loadProductsFilteredFailure = createAction(
  '[Product] Load Products Filtered Failure',
  props<{ error: any }>()
);

export const loadCreateProduct = createAction(
  '[Product] Load Create Product',
  props<{ createProduct : CreateProduct }>()
);
export const loadCreateProductSuccess = createAction(
  '[Product] Load Create Product Success',
  props<{ product: Product }>()
);
export const loadCreateProductFailure = createAction(
  '[Product] Load Create Product Failure',
  props<{ error: any }>()
);

export const loadUpdateProduct = createAction(
  '[Product] Load Update Product',
  props<{ id: string; updateProduct: UpdateProduct }>()
);
export const loadUpdateProductSuccess = createAction(
  '[Product] Load Update Product Success',
  props<{ product: Product }>()
);
export const loadUpdateProductFailure = createAction(
  '[Product] Load Update Product Failure',
  props<{ error: any }>()
);

export const loadFilterProduct = createAction(
  '[Product] Load Filter Product',
  props<{ filter: FilterProduct }>()
);
