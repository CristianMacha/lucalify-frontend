import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { FilterSale } from '@interfaces/sale.interface';
import { PaginationInterface } from '@interfaces/pagination.interface';
import { selectFilterSale, selectPaginationSale } from './state/sale.selector';
import { loadFilteredSale } from './state/sale.actions';
import { TableSaleComponent } from './table-sale.component';
import { PaginationComponent } from '../../shared/pagination.component';
import { BreadcrumbsComponent } from '../../shared/breadcrumbs.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sales-overview',
  standalone: true,
  imports: [
    TableSaleComponent,
    PaginationComponent,
    NgIf,
    BreadcrumbsComponent,
    RouterLink,
  ],
  templateUrl: './sales.component.html',
})
export class SalesComponent implements OnInit {
  private store = inject(Store<AppState>);

  private filterSale!: FilterSale;
  public pagination: PaginationInterface | null = null;

  ngOnInit(): void {
    this.store.select(selectFilterSale).subscribe((filterSale) => {
      this.store.dispatch(loadFilteredSale({ filter: filterSale }));
      this.filterSale = filterSale;
    });

    this.store.select(selectPaginationSale).subscribe((pagination) => {
      this.pagination = pagination;
    });
  }

  public handlePaginationChange(pagination: PaginationInterface): void {
    this.store.dispatch(
      loadFilteredSale({
        filter: {
          ...this.filterSale,
          page: pagination.currentPage,
          perPage: pagination.perPage,
        },
      })
    );
  }
}
