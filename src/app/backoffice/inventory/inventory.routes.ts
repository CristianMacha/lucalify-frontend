import { Routes } from '@angular/router';
import { InventoryOverviewComponent } from './inventory-overview.component';
import { ProductsComponent } from './products/products.component';

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
    ],
  },
];
