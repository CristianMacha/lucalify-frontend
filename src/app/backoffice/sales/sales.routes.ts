import { Routes } from '@angular/router';
import { SalesOverviewComponent } from './sales-overview.component';
import { SalesComponent } from './sales.component';

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
    ],
  },
];
