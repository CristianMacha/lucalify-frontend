import { Component, inject, Input } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from '@interfaces/product.interface';
import { AppState } from '../../../app.state';
import { selectFilteredProducts } from './state/product.selector';
import { CdkTableModule } from '@angular/cdk/table';
import { CurrencyPipe } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { CdkMenuModule } from '@angular/cdk/menu';
import { ModalProductFormComponent } from './modal-product-form/modal-product-form.component';

@Component({
  selector: 'app-table-product-actions',
  standalone: true,
  imports: [CdkMenuModule],
  template: `
    <button
      [cdkMenuTriggerFor]="menu"
      class="px-1 border flex items-center rounded-xl hover:border-gray-600"
    >
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
          d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
    </button>

    <ng-template #menu>
      <div
        cdkMenu
        class="bg-white dark:bg-black border dark:border-gray-700 py-2 flex flex-col shadow-xl rounded-xl items-start"
      >
        <button
          class="py-1 px-4 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800"
          cdkMenuItem
          (click)="handleOpenMenuEdit()"
        >
          Editar
        </button>
        <button class="py-1 px-4 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800" cdkMenuItem>
          Historial de ventas
        </button>
        <button class="py-1 px-4 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800" cdkMenuItem>
          Historial de compras
        </button>
        <button class="py-1 px-4 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800" cdkMenuItem>
          Eliminar
        </button>
      </div>
    </ng-template>
  `,
})
export class TableProductActionsComponent {
  @Input() product: Product | undefined;
  private dialog = inject(Dialog);

  public handleOpenMenuEdit(): void {
    this.dialog.open<boolean>(ModalProductFormComponent, {
      width: '600px',
      data: { product: this.product },
      disableClose: true,
    });
  }
}

@Component({
  selector: 'app-table-product',
  standalone: true,
  imports: [CdkTableModule, CurrencyPipe, TableProductActionsComponent],
  template: `
  <div class="table-container relative">
    <table cdk-table [dataSource]="dataSource" class="w-full">
      <ng-container cdkColumnDef="code">
        <th cdk-header-cell *cdkHeaderCellDef>Código</th>
        <td cdk-cell *cdkCellDef="let product">{{ product.code }}</td>
      </ng-container>
      <ng-container cdkColumnDef="name">
        <th cdk-header-cell *cdkHeaderCellDef>Nombre</th>
        <td
          cdk-cell
          *cdkCellDef="let product"
          class="w-[200px] break-words whitespace-normal"
        >
          {{ product.name }}
        </td>
      </ng-container>
      <ng-container cdkColumnDef="price">
        <th cdk-header-cell *cdkHeaderCellDef>Precio</th>
        <td cdk-cell *cdkCellDef="let product" class="text-end">
          {{ product.price | currency:'s/ ' }}
        </td>
      </ng-container>
      <ng-container cdkColumnDef="category">
        <th cdk-header-cell *cdkHeaderCellDef>Categoria</th>
        <td cdk-cell *cdkCellDef="let product">{{ product.category.name }}</td>
      </ng-container>
      <ng-container cdkColumnDef="quantity">
        <th cdk-header-cell *cdkHeaderCellDef>Cantidad</th>
        <td cdk-cell *cdkCellDef="let product" class="text-end">
          {{ product.stock }}
        </td>
      </ng-container>
      <ng-container cdkColumnDef="description">
        <th cdk-header-cell *cdkHeaderCellDef>Descripción</th>
        <td
          cdk-cell
          *cdkCellDef="let product"
          class="w-[300px] break-words whitespace-normal"
        >
          {{ product.description }}
        </td>
      </ng-container>
      <ng-container cdkColumnDef="actions">
        <th cdk-header-cell *cdkHeaderCellDef></th>
        <td cdk-cell *cdkCellDef="let product">
          <app-table-product-actions [product]="product" />
        </td>
      </ng-container>
      <tr cdk-header-row *cdkHeaderRowDef="displayedColumns"></tr>
      <tr
        cdk-row
        *cdkRowDef="let row; columns: displayedColumns; let i = index"
        [class.bg-tr]="i % 2 !== 0"
      ></tr>
    </table>
  </div>`,
})
export class TableProductComponent {
  private store = inject(Store<AppState>);
  public products$: Observable<Product[]>;
  public displayedColumns: string[] = [
    'code',
    'name',
    'price',
    'category',
    'quantity',
    'description',
    'actions',
  ];
  public dataSource = new TableProductDataSource();

  constructor() {
    this.products$ = this.store.select(selectFilteredProducts);
    this.products$.subscribe((products) => this.dataSource.data.next(products));
  }
}

export class TableProductDataSource extends DataSource<Product> {
  data = new BehaviorSubject<Product[]>([]);

  connect(): Observable<Product[]> {
    return this.data;
  }

  disconnect(): void {}
}
