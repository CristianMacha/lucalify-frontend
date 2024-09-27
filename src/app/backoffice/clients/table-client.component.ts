import { Component, inject } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Client } from '@interfaces/client.interface';
import { AppState } from '../../app.state';
import { CdkTableModule } from '@angular/cdk/table';
import { NgClass } from '@angular/common';
import { selectFilteredClients } from './state/client.selectors';

@Component({
  selector: 'app-table-client',
  standalone: true,
  imports: [CdkTableModule, NgClass],
  template: `
    <div class="table-container">
      <table cdk-table [dataSource]="dataSource" class="w-full">
        <ng-container cdkColumnDef="name">
          <th cdk-header-cell *cdkHeaderCellDef="">Nombre / Razón social</th>
          <td cdk-cell *cdkCellDef="let client">{{ client.name }}</td>
        </ng-container>
        <ng-container cdkColumnDef="document">
          <th cdk-header-cell *cdkHeaderCellDef="">Documento</th>
          <td cdk-cell *cdkCellDef="let client">
          <strong>{{ client.typeDocument.name }}</strong> {{ client.documentNumber }}
          </td>
        </ng-container>
        <ng-container cdkColumnDef="address">
          <th cdk-header-cell *cdkHeaderCellDef="">Dirección</th>
          <td cdk-cell *cdkCellDef="let client">{{client.address}}</td>
        </ng-container>
        <ng-container cdkColumnDef="phone">
          <th cdk-header-cell *cdkHeaderCellDef="">Teléfono</th>
          <td cdk-cell *cdkCellDef="let client">{{client.phone}}</td>
        </ng-container>
        <ng-container cdkColumnDef="actions">
          <th cdk-header-cell *cdkHeaderCellDef=""></th>
          <td cdk-cell *cdkCellDef="let client">
            ...
            <!-- <app-table-category-actions [category]="category" /> -->
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
export class TableClientComponent {
  private store = inject(Store<AppState>);
  public clients$: Observable<Client[]>;
  public displayedColumns: string[] = [
    'name',
    'document',
    'address',
    'phone',
    'actions',
  ];
  public dataSource = new TableClientDataSource();

  constructor() {
    this.clients$ = this.store.select(selectFilteredClients);
    this.clients$.subscribe((clients) => {
      this.dataSource.data.next(clients);
    });
  }
}

export class TableClientDataSource extends DataSource<Client> {
  data = new BehaviorSubject<Client[]>([]);

  connect(): Observable<Client[]> {
    return this.data;
  }

  disconnect() {}
}
