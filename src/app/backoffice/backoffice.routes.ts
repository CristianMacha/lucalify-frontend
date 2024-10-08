import { Routes } from '@angular/router';
import { BackofficeOverviewComponent } from './backoffice-overview.component';
import { BackofficeComponent } from './backoffice.component';
import { ClientsComponent } from './clients/clients.component';
import { _clientReducer } from './clients/state/client.reducer';

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
      {
        path: 'clients',
        component: ClientsComponent,
        title: 'Clientes',
      },
      {
        path: 'sales',
        loadChildren: () => import('./sales/sales.routes').then((r) => r.routes),
      }
    ],
  },
];
