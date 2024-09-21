import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then((r) => r.routes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./backoffice/backoffice.routes').then((r) => r.routes),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Page Not Found',
  },
];
