import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CreateProductTradeFront } from '@interfaces/product-trade.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import {
  updatePriceProductTrade,
  updateQuantityProductTrade,
} from './state/form-trade.actions';
import { CurrencyPipe } from '@angular/common';
import { TradesService } from '../trades.service';
import { TradeType } from '@interfaces/trade.interface';

@Component({
  selector: 'app-product-trade-item',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  template: `
    <div class="px-4 py-2 flex flex-row gap-4 items-center">
      <div class="flex-1">
        <h2 class="font-medium">{{ productTrade.product.name }}</h2>
        <p class="text-gray-400">{{ productTrade.product.description }}</p>
      </div>

      <div class="flex flex-row gap-2 min-w-[170px]">
        <button (click)="decrementQuantity()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
          </svg>
        </button>
        <input
          type="number"
          [formControl]="quantityControl"
          min="1"
          class="px-1 w-[100px] text-center"
        />
        <button (click)="incrementQuantity()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>

      <div class="min-w-[170px] text-end">
        <input
          type="number"
          [formControl]="priceControl"
          min="1"
          class="px-1 w-[100px] text-center"
        />
      </div>
      <div class="min-w-[170px] text-end">
        {{ totalPrice | currency : 's/ ' }}
      </div>
    </div>
  `,
})
export class ListProductTradeItemComponent implements OnInit, OnChanges {
  @Input() productTrade!: CreateProductTradeFront;
  private store = inject(Store<AppState>);
  private tradesService = inject(TradesService);

  public tradeType: TradeType = TradeType.SALE;
  public quantityControl = new FormControl(0);
  public priceControl = new FormControl(0);
  public totalPrice = 0;

  ngOnInit(): void {
    this.tradeType = this.tradesService.getTradeType().tradeType;

    this.quantityControl.setValue(this.productTrade.quantity);
    this.priceControl.setValue(this.productTrade.price);

    this.quantityControl.valueChanges.subscribe((quantity) => {
      this.store.dispatch(
        updateQuantityProductTrade({
          id: this.productTrade.product.id,
          quantity: parseFloat(`${quantity}`),
        })
      );
    });

    this.priceControl.valueChanges.subscribe((price) => {
      this.store.dispatch(
        updatePriceProductTrade({
          id: this.productTrade.product.id,
          price: parseFloat(`${price}`),
        })
      );
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productTrade']) {
      this.quantityControl.setValue(this.productTrade.quantity);
      this.priceControl.setValue(this.productTrade.price);
      this.calculateTotalPrice();
    }
  }

  private calculateTotalPrice(): void {
    this.totalPrice = this.productTrade.price * this.productTrade.quantity;
  }

  public incrementQuantity(): void {
    this.store.dispatch(
      updateQuantityProductTrade({
        id: this.productTrade.product.id,
        quantity: this.productTrade.quantity + 1,
      })
    );
  }

  public decrementQuantity(): void {
    if (this.productTrade.quantity > 1) {
      this.store.dispatch(
        updateQuantityProductTrade({
          id: this.productTrade.product.id,
          quantity: this.productTrade.quantity - 1,
        })
      );
    }
  }
}
