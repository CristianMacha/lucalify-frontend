import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { selectFilterCategory } from './state/category.selectors';
import { FilterCategory } from '@interfaces/category.interface';
import { loadFilterCategory } from './state/category.actions';

@Component({
  selector: 'app-filter-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <input
      type="text"
      placeholder="buscar categoria"
      [formControl]="searchCategoryControl"
      class="w-full md:w-auto"
    />
  `,
})
export class FilterCategoryComponent implements OnInit, OnDestroy {
  private store = inject(Store<AppState>);
  private subscription = new Subscription();
  public searchCategoryControl = new FormControl('');

  private filterCategory!: FilterCategory;

  ngOnInit(): void {
    this.subscription.add(
      this.searchCategoryControl.valueChanges
        .pipe(debounceTime(300))
        .subscribe((text) =>
          this.store.dispatch(
            loadFilterCategory({
              filter: {
                ...this.filterCategory,
                textSearch: text || '',
                page: 1,
              },
            })
          )
        )
    );

    this.subscription.add(
      this.store.select(selectFilterCategory).subscribe((filterCategory) => {
        this.searchCategoryControl.setValue(filterCategory.textSearch, {
          emitEvent: false,
        });
        this.filterCategory = filterCategory;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
