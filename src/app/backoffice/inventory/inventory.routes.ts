import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { InventoryOverviewComponent } from './inventory-overview.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import {
  _categoryReducer,
  categoryFeatureKey,
} from './categories/state/category.reducer';
import { CategoryEffects } from './categories/state/category.effects';
import {
  _productReducer,
  productFeatureKey,
} from './products/state/product.reducer';
import { ProductEfects } from './products/state/product.effects';

export const routes: Routes = [
  {
    path: '',
    component: InventoryOverviewComponent,
    children: [
      {
        path: '',
        component: ProductsComponent,
        title: 'Products',
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categorias',
      },
    ],
    providers: [
      provideState({ name: categoryFeatureKey, reducer: _categoryReducer }),
      provideState({ name: productFeatureKey, reducer: _productReducer }),
      provideEffects([CategoryEffects, ProductEfects]),
    ],
  },
];
