import { DataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ProductTrade } from '@interfaces/product-trade.interface';
import { ProductTradeService } from '@services/product-trade.service';
import { format, startOfMonth } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [ReactiveFormsModule, CdkTableModule, DatePipe, CurrencyPipe, NgIf],
  templateUrl: './movements.component.html',
  styles: ``,
})
export class MovementsComponent {
  private productTradeService = inject(ProductTradeService);

  public filterForm = new UntypedFormGroup({
    startDate: new FormControl(
      format(startOfMonth(new Date()), 'yyyy-MM-dd'),
      Validators.required
    ),
    endDate: new FormControl(
      format(new Date(), 'yyyy-MM-dd'),
      Validators.required
    ),
    textSearch: new FormControl(''),
  });

  public displayedColumns: string[] = [
    'date',
    'trade',
    'product',
    'code',
    'category',
    'quantity',
    'price',
    'total',
  ];
  public dataSource = new TableMovementDataSource();

  private getMovements(): void {
    this.productTradeService.getFiltered(this.filterForm.value).subscribe({
      next: (response) => this.dataSource.data.next(response),
    });
  }

  public handleFilter(): void {
    this.filterForm.invalid
      ? this.filterForm.markAllAsTouched()
      : this.getMovements();
  }
}

export class TableMovementDataSource extends DataSource<ProductTrade> {
  data = new BehaviorSubject<ProductTrade[]>([]);

  connect(): Observable<readonly ProductTrade[]> {
    return this.data;
  }

  disconnect(): void {}
}
