import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PAGINATION } from '@consts/pagination';
import { PaginationInterface } from '@interfaces/pagination.interface';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex justify-between gap-4 flex-wrap p-4">
      <div>
        <span class="text-xs font-semibold mr-2">{{pagination?.currentPage}}/{{pagination?.totalPages}}</span>
        <select
          name="perPage"
          id="perPage"
          [formControl]="perPageControl"
          class="text-xs p-1"
        >
          <option [value]="5">5</option>
          <option [value]="10">10</option>
          <option [value]="15">15</option>
          <option [value]="20">20</option>
        </select>
      </div>
      <div class="flex flex-row gap-2">
        <div>
          <span class="text-xs font-semibold">Resultado: </span>
          <span class="text-xs font-semibold">{{ from }}</span>
          <span class="text-xs"> - </span>
          <span class="text-xs font-semibold">{{ to }}</span>
          <span class="text-xs text-gray-400"> de </span>
          <span class="text-xs text-gray-400 font-semibold">{{
            pagination?.totalItems
          }}</span>
        </div>
        <div class="flex gap-2">
          <button (click)="previousPage()" [disabled]="isFirstPage" class="disabled:text-gray-400">
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
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button (click)="nextPage()" [disabled]="isLastPage" class="disabled:text-gray-400">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pagination: PaginationInterface | null = null;
  @Output() paginationChange = new EventEmitter<PaginationInterface>();

  public perPageControl = new FormControl(PAGINATION.CATEGORY_PER_PAGE);
  public from = 0;
  public to = 0;
  public isFirstPage = true;
  public isLastPage = false;

  ngOnInit(): void {
    this.perPageControl.valueChanges.pipe(distinctUntilChanged()).subscribe((perPage) => {
      this.paginationChange.emit({ ...this.pagination!, perPage: +`${perPage}` });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pagination']) {
      this.perPageControl.patchValue(this.pagination!.perPage, { emitEvent: false });
      this.calculateFromTo();
      this.updatePageStatus();
    }
  }

  public nextPage(): void {
    this.paginationChange.emit({
      ...this.pagination!,
      currentPage: this.pagination!.currentPage + 1,
    });
  }

  public previousPage(): void {
    this.paginationChange.emit({
      ...this.pagination!,
      currentPage: this.pagination!.currentPage - 1,
    });
  }

  private updatePageStatus(): void {
    if (this.pagination) {
      this.isFirstPage = this.pagination.currentPage === 1;
      this.isLastPage = this.pagination.currentPage === Math.ceil(this.pagination.totalItems / this.pagination.perPage);
    }
  }

  private calculateFromTo(): void {
    this.from =
      (this.pagination!.currentPage - 1) * this.pagination!.perPage + 1;
    this.to = Math.min(
      this.pagination!.currentPage * this.pagination!.perPage,
      this.pagination!.totalItems
    );
  }
}
