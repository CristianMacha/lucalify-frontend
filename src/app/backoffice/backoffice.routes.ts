import { Routes } from '@angular/router';
import { BackofficeOverviewComponent } from './backoffice-overview.component';
import { BackofficeComponent } from './backoffice.component';

export const routes: Routes = [
  {
    path: '',
    component: BackofficeComponent,
    children: [
      {
        path: 'overview',
        component: BackofficeOverviewComponent,
        title: 'Backoffice Overview',
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./inventory/inventory.routes').then((r) => r.routes),
      },
    ],
  },
];
