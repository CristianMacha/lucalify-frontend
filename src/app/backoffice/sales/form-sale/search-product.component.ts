import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

import { ProductService } from '@services/product.service';
import { Product } from '@interfaces/product.interface';

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, CurrencyPipe],
  template: `
    <div class="relative">
      <input
        type="text"
        placeholder="buscar producto"
        [formControl]="searchProductControl"
        class="w-full"
      />
      @if(products.length > 0) {
      <div
        class="absolute top-[44px] w-full bg-white dark:bg-gray-900 shadow-sm rounded-lg shadow-gray-400 dark:shadow-gray-400 max-h-[400px] overflow-y-auto overflow-x-hidden"
      >
        @for (product of products; track product.id) {
        <div
          class="px-4 py-2 hover:bg-gray-100 hover:cursor-pointer flex flex-row gap-4 items-center"
          (click)="selectProduct(product)"
        >
          <div class="flex-1">{{ product.name }}</div>
          <div class="">{{ product.stock }}</div>
          <div class="">{{ product.price | currency }}</div>
        </div>
        }
      </div>
      }
    </div>
  `,
})
export class SearchProductComponent implements OnInit, OnDestroy {
  @Output() public productSelected = new EventEmitter<Product>();
  private subscription = new Subscription();
  private productService = inject(ProductService);
  public searchProductControl = new FormControl('');
  public products: Product[] = [];

  ngOnInit(): void {
    this.searchProductChange();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private searchProductChange(): void {
    this.subscription.add(
      this.searchProductControl.valueChanges
        .pipe(debounceTime(300))
        .subscribe((value) => {
          if (!value) {
            this.products = [];
            return;
          }
          this.getProducts(value);
        })
    );
  }

  private getProducts(value: string): void {
    if (!value) return;
    this.productService.search(value).subscribe({
      next: (products) => (this.products = products),
      error: (error) => console.error(error),
    });
  }

  public selectProduct(product: Product): void {
    this.productSelected.emit(product);
    this.products = [];
    this.searchProductControl.reset();
  }
}
