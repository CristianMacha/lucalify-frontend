import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TradeType } from '@interfaces/trade.interface';

@Injectable({ providedIn: 'root' })
export class TradesService {
  private router = inject(Router);
  public getTradeType(): {
    tradeType: TradeType;
    title: string;
  } {
    const tradeUrl = this.router.url.split('/')[1];
    switch (tradeUrl) {
      case 'sales':
        return { tradeType: TradeType.SALE, title: 'ventas' };
      case 'purchases':
        return { tradeType: TradeType.PURCHASE, title: 'compras' };
      default:
        return { tradeType: TradeType.SALE, title: 'ventas' };
    }
  }
}
