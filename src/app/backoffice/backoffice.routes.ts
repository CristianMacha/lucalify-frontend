import { Routes } from '@angular/router';
import { BackofficeOverviewComponent } from './backoffice-overview.component';

export const routes: Routes = [
  {
    path: 'overview',
    component: BackofficeOverviewComponent,
    title: 'Backoffice Overview',
  },
  {
    path: 'products',
    loadChildren: () => import('./inventory/inventory.routes').then((r) => r.routes),
  }
];
