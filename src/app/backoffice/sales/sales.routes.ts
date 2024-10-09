import { Routes } from '@angular/router';
import { SalesOverviewComponent } from './sales-overview.component';
import { SalesComponent } from './sales.component';
import { FormSaleComponent } from './form-sale/form-sale.component';

export const routes: Routes = [
  {
    path: '',
    component: SalesOverviewComponent,
    children: [
      {
        path: '',
        component: SalesComponent,
        title: 'Ventas',
      },
      {
        path: 'add-edit/:id',
        component: FormSaleComponent,
        title: 'Formulario de venta',
      }
    ],
  },
];
