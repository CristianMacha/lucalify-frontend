import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../../shared/breadcrumbs.component';
import { TableClientComponent } from './table-client.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import {
  selectFilterClient,
  selectPaginationClient,
} from './state/client.selectors';
import { loadFilteredClients } from './state/client.actions';
import { FilterClientComponent } from './filter-client.component';
import { FilterCategoryComponent } from '../inventory/categories/filter-category.component';
import { PaginationInterface } from '@interfaces/pagination.interface';
import { FilterClient } from '@interfaces/client.interface';
import { PaginationComponent } from '../../shared/pagination.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    TableClientComponent,
    FilterClientComponent,
    FilterCategoryComponent,
    PaginationComponent
  ],
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {
  private store = inject(Store<AppState>);

  private filterClient!: FilterClient;
  public pagination: PaginationInterface | null = null;

  ngOnInit(): void {
    this.store.select(selectFilterClient).subscribe((filterClient) => {
      this.store.dispatch(loadFilteredClients({ filter: filterClient }));
    });

    this.store.select(selectPaginationClient).subscribe((pagination) => {
      this.pagination = pagination;
    });
  }

  public handlePaginationChange(pagination: PaginationInterface): void {
    this.store.dispatch(
      loadFilteredClients({
        filter: {
          ...this.filterClient,
          page: pagination.currentPage,
          perPage: pagination.perPage,
        },
      })
    );
  }
}
