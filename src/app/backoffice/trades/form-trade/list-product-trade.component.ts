import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../app.state';
import { ProductTrade } from '@interfaces/product-trade.interface';
import { selectFormTradeProducts } from './state/form-trade.selector';
import { CurrencyPipe, NgFor } from '@angular/common';
import { ListProductTradeItemComponent } from './list-product-trade-item.component';

@Component({
  selector: 'app-list-product-trade',
  standalone: true,
  imports: [NgFor, ListProductTradeItemComponent, CurrencyPipe],
  template: `
    <div class="flex flex-col gap-2">
      <div class="flex flex-row gap-4 text-sm font-medium px-4 text-gray-500">
        <div class="flex-1">PRODUCTO</div>
        <div class="min-w-[170px] text-center">CANTIDAD</div>
        <div class="min-w-[170px] text-end">PRECIO</div>
        <div class="min-w-[170px] text-end">TOTAL</div>
      </div>
      <div class="flex flex-col gap-1">
        @for(productTrade of productTrades; track productTrade.product.id) {
        <app-product-trade-item [productTrade]="productTrade" />
        } @if(productTrades.length == 0){
        <div class="text-center text-gray-500">No hay productos agregados</div>
        }
      </div>
      @if(productTrades.length != 0) {
      <div class="text-end px-4 text-xl font-medium">
        <span class="font-normal text-lg text-gray-500">Total: </span>
        {{ totalPrice | currency : 's/ ' }}
      </div>
      }
    </div>
  `,
})
export class ListProductTradeComponent implements OnInit {
  private store = inject(Store<AppState>);

  public totalPrice = 0;
  public productTrades: ProductTrade[] = [];

  public displayedColumns: string[] = [
    'product',
    'quantity',
    'price',
    'options',
  ];

  ngOnInit(): void {
    this.store.select(selectFormTradeProducts).subscribe((products) => {
      this.productTrades = products;
      this.calculateTotalPrice();
    });
  }

  private calculateTotalPrice(): void {
    this.totalPrice = this.productTrades.reduce(
      (acc, productTrade) => acc + productTrade.price * productTrade.quantity,
      0
    );
  }
}
