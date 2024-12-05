import { DataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { KardexResult } from '@interfaces/product.interface';
import { ProductService } from '@services/product.service';
import { format, startOfMonth } from 'date-fns';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-kardex',
  standalone: true,
  imports: [ReactiveFormsModule, CdkTableModule],
  templateUrl: './kardex.component.html',
  styles: ``,
})
export class KardexComponent {
  private productService = inject(ProductService);

  public displayedColumns: string[] = [
    'productCode',
    'productName',
    'salesCount',
    'purchaseCount',
    'totalStock',
  ];
  public kardexFilter = new UntypedFormGroup({
    startDate: new FormControl(
      format(startOfMonth(new Date()), 'yyyy-MM-dd'),
      Validators.required
    ),
    endDate: new FormControl(
      format(new Date(), 'yyyy-MM-dd'),
      Validators.required
    ),
    productCode: new FormControl(''),
  });
  public dataSource = new TableKardexDataSource();

  private getKardex(): void {
    this.productService.getKardex(this.kardexFilter.value).subscribe({
      next: (response) => this.dataSource.data.next(response),
    });
  }

  public handleFilter(): void {
    this.kardexFilter.invalid
      ? this.kardexFilter.markAllAsTouched()
      : this.getKardex();
  }
}

export class TableKardexDataSource extends DataSource<KardexResult> {
  data = new BehaviorSubject<KardexResult[]>([]);

  connect(): BehaviorSubject<KardexResult[]> {
    return this.data;
  }

  disconnect(): void {}
}
