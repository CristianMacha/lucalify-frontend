import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dialog } from '@angular/cdk/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogPositionStrategy } from '@services/dialog-position-strategy.service';
import { loadFilteredCategories } from './state/category.actions';
import { TableCategoryComponent } from './table-category.component';
import { AppState } from '../../../app.state';
import { ModalCategoryFormComponent } from './modal-category-form.component';
import { FilterCategoryComponent } from './filter-category.component';
import {
  selectFilterCategory,
  selectPaginationCategory,
} from './state/category.selectors';
import { PaginationComponent } from '../../../shared/pagination.component';
import { NgIf } from '@angular/common';
import { PaginationInterface } from '@interfaces/pagination.interface';
import { FilterCategory } from '@interfaces/category.interface';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    TableCategoryComponent,
    ReactiveFormsModule,
    FilterCategoryComponent,
    PaginationComponent,
    NgIf,
  ],
  templateUrl: './categories.component.html',
  styles: ``,
})
export class CategoriesComponent implements OnInit {
  private store = inject(Store<AppState>);
  private dialog = inject(Dialog);
  private dialogPositionStrategy = inject(DialogPositionStrategy);

  private filterCategory!: FilterCategory;
  public pagination: PaginationInterface | null = null;

  ngOnInit(): void {
    this.store.select(selectFilterCategory).subscribe((filterCategory) => {
      this.store.dispatch(loadFilteredCategories({ filterCategory }));
      this.filterCategory = filterCategory;
    });

    this.store.select(selectPaginationCategory).subscribe((pagination) => {
      this.pagination = pagination;
    });
  }

  public handleOpenModal(): void {
    this.dialog.open<boolean>(ModalCategoryFormComponent, {
      width: '500px',
      positionStrategy: this.dialogPositionStrategy.centerTop(),
    });
  }

  public handlePaginationChange(pagination: PaginationInterface): void {
    this.store.dispatch(
      loadFilteredCategories({
        filterCategory: {
          ...this.filterCategory,
          page: pagination.currentPage,
          perPage: pagination.perPage,
        },
      })
    );
  }
}
