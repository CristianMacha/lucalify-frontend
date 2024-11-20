import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Client } from '@interfaces/client.interface';
import { Store } from '@ngrx/store';
import { ClientService } from '@services/client.service';
import { debounceTime, Subscription } from 'rxjs';
import { AppState } from '../../../../app.state';
import { addClient } from '../state/form-sale.actions';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-client-selection',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './client-selection.component.html',
  styles: ``,
})
export class ClientSelectionComponent implements OnInit {
  private subscription = new Subscription();
  private clientService = inject(ClientService);
  private store = inject(Store<AppState>);

  public searchClientControl = new FormControl('');
  public clients: Client[] = [];
  public clientSelected: Client | null = null;

  ngOnInit(): void {
    this.searchClientChange();
  }

  private searchClientChange(): void {
    this.subscription.add(
      this.searchClientControl.valueChanges
        .pipe(debounceTime(300))
        .subscribe((value) => {
          if (!value) {
            this.clients = [];
            return;
          }
          this.getResultSearch(value);
        })
    );
  }

  private getResultSearch(value: string): void {
    this.clientService.search(value).subscribe({
      next: (clients) => {
        this.clients = clients;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public selectClient(client: Client): void {
    this.store.dispatch(addClient({ client }));
    this.clientSelected = client;
    this.clients = [];
    this.searchClientControl.setValue('', { emitEvent: false });
  }
}
