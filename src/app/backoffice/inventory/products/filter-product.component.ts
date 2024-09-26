import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { debounceTime, Subscription } from 'rxjs';
import { FilterProduct } from '@interfaces/product.interface';
import { loadFilterProduct } from './state/product.actions';
import { selectFilterProduct } from './state/product.selector';

@Component({
  selector: 'app-filter-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <input
      type="text"
      placeholder="buscar producto"
      [formControl]="searchCategoryControl"
      class="w-full md:w-auto"
    />
  `,
})
export class FilterProductComponent implements OnInit, OnDestroy {
  private store = inject(Store<AppState>);
  private subscription = new Subscription();
  public searchCategoryControl = new FormControl('');

  private filterProduct!: FilterProduct;

  ngOnInit(): void {
    this.subscription.add(
      this.searchCategoryControl.valueChanges
        .pipe(debounceTime(300))
        .subscribe((text) =>
          this.store.dispatch(
            loadFilterProduct({
              filter: {
                ...this.filterProduct,
                textSearch: text || '',
                page: 1,
              },
            })
          )
        )
    );

    this.subscription.add(
      this.store.select(selectFilterProduct).subscribe((filterProduct) => {
        this.searchCategoryControl.setValue(filterProduct.textSearch, {
          emitEvent: false,
        });
        this.filterProduct = filterProduct;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
