import { Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { KardexComponent } from './kardex/kardex.component';
import { MovementsComponent } from './movements/movements.component';

export const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: 'kardex',
        component: KardexComponent,
        title: 'Kardex',
      },
      {
        path: 'movements',
        component: MovementsComponent,
        title: 'Movimientos',
      },
    ],
  },
];
