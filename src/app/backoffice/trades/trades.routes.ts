import { Routes } from '@angular/router';
import { TradesOverviewComponent } from './trades-overview.component';
import { TradesComponent } from './trades.component';
import { FormTradeComponent } from './form-trade/form-trade.component';

export const routes: Routes = [
  {
    path: '',
    component: TradesOverviewComponent,
    children: [
      {
        path: '',
        component: TradesComponent,
      },
      {
        path: 'add-edit/:id',
        component: FormTradeComponent,
        title: 'Formulario',
        canDeactivate: [
          (component: FormTradeComponent) => {
            const result = confirm('¿Estás seguro de que deseas salir?');
            return result;
          },
        ],
      },
    ],
  },
];
