import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found.component';
import { routeGuard } from '@guards/route.guard';
import { loginGuard } from '@guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [loginGuard],
    loadChildren: () => import('./auth/auth.routes').then((r) => r.routes),
  },
  {
    path: '',
    canActivate: [routeGuard],
    loadChildren: () =>
      import('./backoffice/backoffice.routes').then((r) => r.routes),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Page Not Found',
  },
];
