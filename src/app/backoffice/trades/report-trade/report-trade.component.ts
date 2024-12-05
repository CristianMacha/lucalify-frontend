import { Component, inject } from '@angular/core';
import { TradeService } from '@services/trade.service';
import { TradesService } from '../trades.service';
import {
  FormControl,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { format, startOfMonth } from 'date-fns';
import { finalize } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-report-trade',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './report-trade.component.html',
  styles: ``,
})
export class ReportTradeComponent {
  private dialogRef = inject<DialogRef<void>>(DialogRef);
  private tradesService = inject(TradesService);
  private tradeService = inject(TradeService);

  public firstDayOfMonth: Date;
  public reportForm = new UntypedFormGroup({
    startDate: new FormControl(
      format(startOfMonth(new Date()), 'yyyy-MM-dd'),
      Validators.required
    ),
    endDate: new FormControl(
      format(new Date(), 'yyyy-MM-dd'),
      Validators.required
    ),
    tradeType: new FormControl(
      this.tradesService.getTradeType().tradeType,
      Validators.required
    ),
  });

  constructor() {
    this.firstDayOfMonth = this.getFirstDayOfMonth();
  }

  private getFirstDayOfMonth(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }

  public generateReport(): void {
    this.tradeService
      .getReport(this.reportForm.value)
      .pipe(finalize(() => this.dialogRef.close()))
      .subscribe({
        next: (response) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        },
      });
  }
}
