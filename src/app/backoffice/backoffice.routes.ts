import { Routes } from '@angular/router';
import { BackofficeOverviewComponent } from './backoffice-overview.component';
import { BackofficeComponent } from './backoffice.component';
import { ClientsComponent } from './clients/clients.component';
import { _clientReducer } from './clients/state/client.reducer';
import { accessGuard } from '@guards/access.guard';

export const routes: Routes = [
  {
    path: '',
    component: BackofficeComponent,
    canActivate: [accessGuard],
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
        loadChildren: () =>
          import('./trades/trades.routes').then((r) => r.routes),
        title: 'Ventas',
      },
      {
        path: 'purchases',
        loadChildren: () =>
          import('./trades/trades.routes').then((r) => r.routes),
        title: 'Compras',
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.routes').then((r) => r.routes),
        title: 'Reportes',
      },
    ],
  },
];
