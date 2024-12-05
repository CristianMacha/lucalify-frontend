import { Component, inject } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Client } from '@interfaces/client.interface';
import { AppState } from '../../app.state';
import { CdkTableModule } from '@angular/cdk/table';
import { NgClass } from '@angular/common';
import { selectFilteredClients } from './state/client.selectors';
import { Dialog } from '@angular/cdk/dialog';
import { DialogPositionStrategy } from '@services/dialog-position-strategy.service';
import { ModalClientFormComponent } from './modal-client-form.component';

@Component({
  selector: 'app-table-client',
  standalone: true,
  imports: [CdkTableModule, NgClass],
  template: `
    <div class="table-container">
      <table cdk-table [dataSource]="dataSource" class="w-full">
        <ng-container cdkColumnDef="name">
          <th cdk-header-cell *cdkHeaderCellDef="">Nombre / Razón social</th>
          <td cdk-cell *cdkCellDef="let client" class="w-[400px]">{{ client.name }}</td>
        </ng-container>
        <ng-container cdkColumnDef="document">
          <th cdk-header-cell *cdkHeaderCellDef="">Documento</th>
          <td cdk-cell *cdkCellDef="let client">
            <strong>{{ client.typeDocument.name }}</strong>
            {{ client.documentNumber }}
          </td>
        </ng-container>
        <ng-container cdkColumnDef="address">
          <th cdk-header-cell *cdkHeaderCellDef="">Dirección</th>
          <td cdk-cell *cdkCellDef="let client" class="w-[400px]">{{ client.address }}</td>
        </ng-container>
        <ng-container cdkColumnDef="phone">
          <th cdk-header-cell *cdkHeaderCellDef="">Teléfono</th>
          <td cdk-cell *cdkCellDef="let client">{{ client.phone }}</td>
        </ng-container>
        <ng-container cdkColumnDef="actions">
          <th cdk-header-cell *cdkHeaderCellDef=""></th>
          <td cdk-cell *cdkCellDef="let client">
            <button (click)="handleOpenModal(client)">
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
  private dialog = inject(Dialog);
  private dialogPositionStrategy = inject(DialogPositionStrategy);

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

  public handleOpenModal(client: Client): void {
    this.dialog.open<Client>(ModalClientFormComponent, {
      width: '600px',
      data: { client },
      positionStrategy: this.dialogPositionStrategy.centerTop(),
      disableClose: true,
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
