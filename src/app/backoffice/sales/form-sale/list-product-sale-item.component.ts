import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CreateProductSaleFront } from '@interfaces/product-sale.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import {
  addProductSale,
  updateQuantityProductSale,
} from './state/form-sale.actions';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-sale-item',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  template: `
    <div class="px-4 py-2 flex flex-row gap-4 items-center">
      <div class="flex-1">
        <h2 class="font-medium">{{ productSale.product.name }}</h2>
        <p class="text-gray-400">{{ productSale.product.description }}</p>
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
          class="px-1"
          class="w-[100px] text-center"
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

      <div class="min-w-[170px] text-end">{{productSale.product.price | currency:'s/ '}}</div>
      <div class="min-w-[170px] text-end">{{(productSale.product.price * productSale.quantity) | currency:'s/ '}}</div>
    </div>
  `,
})
export class ListProductSaleItemComponent implements OnInit, OnChanges {
  @Input() productSale!: CreateProductSaleFront;
  private store = inject(Store<AppState>);
  public quantityControl = new FormControl(0);

  ngOnInit(): void {
    this.quantityControl.setValue(this.productSale.quantity);
    this.quantityControl.valueChanges.subscribe((quantity) => {
      this.store.dispatch(
        updateQuantityProductSale({
          id: this.productSale.product.id,
          quantity: parseFloat(`${quantity}`),
        })
      );
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productSale']) {
      this.quantityControl.setValue(this.productSale.quantity);
    }
  }

  public incrementQuantity(): void {
    this.store.dispatch(
      updateQuantityProductSale({
        id: this.productSale.product.id,
        quantity: this.productSale.quantity + 1,
      })
    );
  }

  public decrementQuantity(): void {
    if (this.productSale.quantity > 1) {
      this.store.dispatch(
        updateQuantityProductSale({
          id: this.productSale.product.id,
          quantity: this.productSale.quantity - 1,
        })
      );
    }
  }
}
