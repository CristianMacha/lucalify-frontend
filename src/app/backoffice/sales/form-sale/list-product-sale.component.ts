import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../../app.state';
import {
  CreateProductSaleFront,
  ProductSale,
} from '@interfaces/product-sale.interface';
import { selectFormSaleProducts } from './state/form-sale.selector';
import { AsyncPipe, CurrencyPipe, NgFor } from '@angular/common';
import { ListProductSaleItemComponent } from './list-product-sale-item.component';

@Component({
  selector: 'app-list-product-sale',
  standalone: true,
  imports: [NgFor, AsyncPipe, ListProductSaleItemComponent, CurrencyPipe],
  template: `
    <div class="flex flex-col gap-2">
      <div class="flex flex-row gap-4 text-sm font-medium px-4 text-gray-500">
        <div class="flex-1">PRODUCTO</div>
        <div class="min-w-[170px] text-center">CANTIDAD</div>
        <div class="min-w-[170px] text-end">PRECIO UNITARIO</div>
        <div class="min-w-[170px] text-end">TOTAL</div>
      </div>
      <div class="flex flex-col gap-1">
        @for(productSale of productSales$ | async; track productSale.product.id)
        {
        <app-product-sale-item [productSale]="productSale" />
        } @if((productSales$ | async)?.length == 0){
        <div class="text-center text-gray-500">No hay productos agregados</div>
        }
      </div>
      @if((productSales$ | async)?.length != 0) {
      <div class="text-end px-4 text-xl font-medium">
        <span class="font-normal text-lg text-gray-500">Total: </span>
        {{ totalPrice | currency : 's/ ' }}
      </div>
      }
    </div>
  `,
})
export class ListProductSaleComponent implements OnInit {
  private store = inject(Store<AppState>);

  public totalPrice = 0;
  public productSales: ProductSale[] = [];

  public displayedColumns: string[] = [
    'product',
    'quantity',
    'price',
    'options',
  ];
  public productSales$: Observable<CreateProductSaleFront[]>;

  constructor() {
    this.productSales$ = this.store.select(selectFormSaleProducts);
  }

  ngOnInit(): void {
    this.store.select(selectFormSaleProducts).subscribe((products) => {
      this.productSales = products;
      this.getTotalPrice();
    });
  }

  public getTotalPrice(): void {
    this.totalPrice = this.productSales.reduce(
      (acc, product) => acc + product.product.price * product.quantity,
      0
    );
  }
}
