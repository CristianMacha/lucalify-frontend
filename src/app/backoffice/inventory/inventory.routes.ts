import { Routes } from '@angular/router';

import { InventoryOverviewComponent } from './inventory-overview.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { _categoryReducer } from './categories/state/category.reducer';
import { _productReducer } from './products/state/product.reducer';
import { _clientReducer } from '../clients/state/client.reducer';

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
  },
];
