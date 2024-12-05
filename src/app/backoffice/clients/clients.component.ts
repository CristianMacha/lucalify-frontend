import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../../shared/breadcrumbs.component';
import { TableClientComponent } from './table-client.component';
import { Store } from '@ngrx/store';
import { Dialog } from '@angular/cdk/dialog';

import { AppState } from '../../app.state';
import {
  selectFilterClient,
  selectPaginationClient,
} from './state/client.selectors';
import { loadFilteredClients } from './state/client.actions';
import { FilterClientComponent } from './filter-client.component';
import { FilterCategoryComponent } from '../inventory/categories/filter-category.component';
import { PaginationInterface } from '@interfaces/pagination.interface';
import { Client, FilterClient } from '@interfaces/client.interface';
import { PaginationComponent } from '../../shared/pagination.component';
import { DialogPositionStrategy } from '@services/dialog-position-strategy.service';
import { ModalClientFormComponent } from './modal-client-form.component';

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
  private dialog = inject(Dialog);
  private dialogPositionStrategy = inject(DialogPositionStrategy);

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

  public handleOpenModal(): void {
    this.dialog.open<Client>(ModalClientFormComponent, {
      width: '600px',
      positionStrategy: this.dialogPositionStrategy.centerTop(),
      disableClose: true,
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
