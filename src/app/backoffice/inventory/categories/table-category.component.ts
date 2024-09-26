import { Component, inject, Input } from '@angular/core';
import { CdkTableModule, DataSource } from '@angular/cdk/table';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';

import { Category, FilterCategory } from '@interfaces/category.interface';
import {
  selectFilteredCategories,
  selectFilterCategory,
} from './state/category.selectors';
import { AppState } from '../../../app.state';
import { Dialog } from '@angular/cdk/dialog';
import { ModalCategoryFormComponent } from './modal-category-form.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-table-category-actions',
  standalone: true,
  imports: [],
  template: `
    <button (click)="handleEditCategory()">
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
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
    </button>
  `,
})
export class TableCategoryActionsComponent {
  @Input() category: Category | undefined;
  private dialog = inject(Dialog);

  public handleEditCategory(): void {
    this.dialog.open<boolean>(ModalCategoryFormComponent, {
      width: '500px',
      data: { category: this.category },
    });
  }
}

@Component({
  selector: 'app-table-category',
  standalone: true,
  imports: [CdkTableModule, TableCategoryActionsComponent, NgClass],
  template: `
    <div class="table-container">
      <table cdk-table [dataSource]="dataSource" class="w-full">
        <ng-container cdkColumnDef="name">
          <th cdk-header-cell *cdkHeaderCellDef="">Nombre</th>
          <td cdk-cell *cdkCellDef="let category">{{ category.name }}</td>
        </ng-container>
        <ng-container cdkColumnDef="description">
          <th cdk-header-cell *cdkHeaderCellDef="">Descripción</th>
          <td cdk-cell *cdkCellDef="let category">
            {{ category.description }}
          </td>
        </ng-container>
        <ng-container cdkColumnDef="active">
          <th cdk-header-cell *cdkHeaderCellDef="">Estado</th>
          <td cdk-cell *cdkCellDef="let category">
            <span
              class="badge"
              [class.badge-success]="category.active"
              [class.badge-fail]="!category.active"
              >{{ category.active ? 'activo' : 'no activo' }}</span
            >
          </td>
        </ng-container>
        <ng-container cdkColumnDef="actions">
          <th cdk-header-cell *cdkHeaderCellDef=""></th>
          <td cdk-cell *cdkCellDef="let category">
            <app-table-category-actions [category]="category" />
          </td>
        </ng-container>
        <tr cdk-header-row *cdkHeaderRowDef="displayedColumns"></tr>
        <tr
          cdk-row
          *cdkRowDef="let row; columns: displayedColumns; let i = index"
          [class.bg-tr]="i % 2 !== 0"
        ></tr>
      </table>
    </div>
  `,
})
export class TableCategoryComponent {
  private store = inject(Store<AppState>);
  public categories$: Observable<Category[]>;
  public displayedColumns: string[] = [
    'name',
    'description',
    'active',
    'actions',
  ];
  public dataSource = new TableCategoryDataSource();

  constructor() {
    this.categories$ = this.store.select(selectFilteredCategories);
    this.categories$.subscribe((categories) =>
      this.dataSource.data.next(categories)
    );
  }
}

export class TableCategoryDataSource extends DataSource<Category> {
  data = new BehaviorSubject<Category[]>([]);

  connect(): Observable<Category[]> {
    return this.data;
  }

  disconnect(): void {}
}
