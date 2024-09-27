import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, Subscription } from 'rxjs';

import { FilterClient } from '@interfaces/client.interface';
import { AppState } from '../../app.state';
import { loadFilteredClients } from './state/client.actions';
import { selectFilterClient } from './state/client.selectors';

@Component({
  selector: 'app-filter-client',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <input
      type="text"
      placeholder="buscar client"
      [formControl]="searchClientControl"
      class="w-full"
    />
  `,
})
export class FilterClientComponent implements OnInit, OnDestroy {
  private store = inject(Store<AppState>);
  private subscription = new Subscription();

  private filterClient!: FilterClient;
  public searchClientControl = new FormControl('');

  ngOnInit(): void {
    this.subscription.add(
      this.searchClientControl.valueChanges
        .pipe(debounceTime(300))
        .subscribe((text) =>
          this.store.dispatch(
            loadFilteredClients({
              filter: {
                ...this.filterClient,
                textSearch: text || '',
                page: 1,
              },
            })
          )
        )
    );

    this.subscription.add(
      this.store.select(selectFilterClient).subscribe((filterClient) => {
        this.searchClientControl.setValue(filterClient.textSearch, {
          emitEvent: false,
        });
        this.filterClient = filterClient;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
