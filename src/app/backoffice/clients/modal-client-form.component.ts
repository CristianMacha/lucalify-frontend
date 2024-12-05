import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TypeDocumentService } from '@services/type-document.service';
import { AppState } from '../../app.state';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Client } from '@interfaces/client.interface';
import {
  FormControl,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { TypeDocument } from '@interfaces/type-document.interface';
import {
  loadCreateClientSuccess,
  loadUpdateClientSuccess,
} from './state/client.actions';
import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { IdentityService } from '@services/Identity.service';
import { CODE_DOCUMENTS } from '@consts/identity';
import { startWith } from 'rxjs';
import { ClientService } from '@services/client.service';

@Component({
  selector: 'app-modal-client-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, JsonPipe, NgIf, NgClass],
  template: `
    <div class="px-4">
      <div
        class="bg-white dark:bg-black border dark:border-gray-700 rounded-xl p-4"
      >
        <div class="pb-0 md:pb-5">
          <div class="flex flex-row justify-between gap-4 items-start">
            <h1 class="text-xl font-semibold">
              {{ isEditMode ? 'Actualizar' : 'Crear nuevo' }} cliente / provedor
            </h1>
            <div>
              <button
                type="button"
                (click)="onNoClick()"
                class="hover:text-gray-500"
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="my-4 md:h-auto h-[350px] overflow-y-auto">
          <form [formGroup]="clientForm" class="flex flex-col gap-4">
            <div class="gap-2 items-center grid grid-cols-4">
              <label
                for="typeDocument"
                class="text-left font-medium col-span-4 md:col-span-1"
                >Tipo de documento</label
              >
              <select
                name="typeDocument"
                id="typeDocument"
                formControlName="typeDocumentId"
                class="w-full col-span-4 md:col-span-3"
              >
                <option
                  *ngFor="let typeDocument of typeDocuments; let i = index"
                  [value]="typeDocument.id"
                >
                  {{ typeDocument.name }}
                </option>
              </select>
            </div>
            @if (typeDocumentControl.value !==
            codeDocuments.DOC_SIN_DOC_IDENTIDAD) {
            <div class="gap-2 items-center grid grid-cols-4 flex-1">
              <label
                for="documentNumber"
                class="text-left font-medium col-span-4 md:col-span-1"
                >Número de documento</label
              >
              <div class="flex flex-row gap-2 col-span-4 md:col-span-3">
                <div class="w-full">
                  <input
                    type="text"
                    id="documentNumber"
                    class="w-full"
                    [class.has-error]="
                      documentNumberControl.invalid &&
                      (documentNumberControl.dirty ||
                        documentNumberControl.touched)
                    "
                    cdkFocusInitial
                    formControlName="documentNumber"
                  />
                  <div
                    *ngIf="
                      documentNumberControl.invalid &&
                      (documentNumberControl.dirty ||
                        documentNumberControl.touched)
                    "
                  >
                    <small class="text-red-500">
                      @switch (typeDocumentControl.value) { @case
                      (codeDocuments.DOC_RUC) { El RUC debe tener 11 dígitos }
                      @case (codeDocuments.DOC_NAC_IDENTIDAD) { El DNI debe
                      tener 8 dígitos } @default { El número de documento es
                      necesario } }
                    </small>
                  </div>
                </div>
                @if (typeDocumentControl.value === codeDocuments.DOC_RUC ||
                typeDocumentControl.value === codeDocuments.DOC_NAC_IDENTIDAD) {
                <button
                  class="btn btn-primary"
                  (click)="getClientDataByDocumentNumber()"
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
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
                }
              </div>
            </div>
            }
            <div class="gap-2 items-center grid grid-cols-4">
              <label
                for="name"
                class="text-left font-medium col-span-4 md:col-span-1"
                >Nombre</label
              >
              <div class="w-full col-span-4 md:col-span-3">
                <input
                  type="text"
                  id="name"
                  class="w-full"
                  [class.has-error]="
                    nameControl.invalid &&
                    (nameControl.dirty || nameControl.touched)
                  "
                  formControlName="name"
                />
                <div
                  *ngIf="
                    nameControl.invalid &&
                    (nameControl.dirty || nameControl.touched)
                  "
                >
                  <small class="text-red-500">El nombre es necesario</small>
                </div>
              </div>
            </div>
            <div class="gap-2 items-center grid grid-cols-4">
              <label
                for="email"
                class="text-left font-medium col-span-4 md:col-span-1"
                >Correo electrónico</label
              >
              <input
                type="email"
                id="email"
                class="w-full col-span-4 md:col-span-3"
                formControlName="email"
              />
            </div>
            <div class="gap-2 items-center grid grid-cols-4">
              <label
                for="phone"
                class="text-left font-medium col-span-4 md:col-span-1"
                >Teléfono</label
              >
              <input
                type="text"
                id="phone"
                class="w-full col-span-4 md:col-span-3"
                formControlName="phone"
              />
            </div>
            <div class="gap-2 items-center grid grid-cols-4">
              <label
                for="address"
                class="text-left font-medium col-span-4 md:col-span-1"
                >Dirección</label
              >
              <input
                type="text"
                id="address"
                class="w-full col-span-4 md:col-span-3"
                formControlName="address"
              />
            </div>
          </form>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="btn btn-primary w-full md:w-auto"
            (click)="handleSaveClient()"
          >
            {{ isEditMode ? 'Actualizar' : 'Guardar' }} cliente / provedor
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ModalClientFormComponent implements OnInit {
  private typeDocumentService = inject(TypeDocumentService);
  private store = inject(Store<AppState>);
  private identityService = inject(IdentityService);
  private clientService = inject(ClientService);

  public dialogRef = inject(DialogRef<Client>);
  public data = inject<{ client: Client }>(DIALOG_DATA);

  public typeDocuments: TypeDocument[] = [];
  public isEditMode = !!this.data;
  public codeDocuments = CODE_DOCUMENTS;
  public clientForm = new UntypedFormGroup({
    name: new FormControl('', [Validators.required]),
    documentNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]*$/),
    ]),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl('', [Validators.minLength(9)]),
    address: new FormControl(''),
    typeDocumentId: new FormControl(this.codeDocuments.DOC_NAC_IDENTIDAD, [
      Validators.required,
    ]),
  });

  ngOnInit(): void {
    this.isEditMode && this.setClientFormValues();
    this.getTypeDocuments();
    this.typeDocumentControl.valueChanges
      .pipe(startWith(''))
      .subscribe((value) => this.validateDocumentNumber(value));
  }

  get typeDocumentControl(): FormControl {
    return this.clientForm.controls['typeDocumentId'] as FormControl;
  }

  get documentNumberControl(): FormControl {
    return this.clientForm.controls['documentNumber'] as FormControl;
  }

  get nameControl(): FormControl {
    return this.clientForm.controls['name'] as FormControl;
  }

  private validateDocumentNumber(value: string): void {
    switch (value) {
      case this.codeDocuments.DOC_NAC_IDENTIDAD:
        this.documentNumberControl.setValidators([
          Validators.required,
          Validators.pattern(/^[0-9]*$/),
          Validators.minLength(8),
          Validators.maxLength(8),
        ]);
        this.documentNumberControl.updateValueAndValidity();
        break;
      case this.codeDocuments.DOC_RUC:
        this.documentNumberControl.setValidators([
          Validators.required,
          Validators.pattern(/^[0-9]*$/),
          Validators.minLength(11),
          Validators.maxLength(11),
        ]);
        this.documentNumberControl.updateValueAndValidity();
        break;

      default:
        this.documentNumberControl.setValidators([]);
        this.documentNumberControl.updateValueAndValidity();
        break;
    }
  }

  private getTypeDocuments(): void {
    this.typeDocumentService.getAll().subscribe({
      next: (typeDocuments) => {
        this.typeDocuments = typeDocuments;
      },
    });
  }

  private setClientFormValues(): void {
    const { name, documentNumber, email, phone, address, typeDocument } =
      this.data.client;
    this.clientForm.patchValue({
      name,
      documentNumber,
      email,
      phone,
      address,
      typeDocumentId: typeDocument.id,
    });
  }

  private saveClient(): void {
    const client = this.clientForm.value;
    this.clientService.create(client).subscribe({
      next: (client) => {
        this.store.dispatch(loadCreateClientSuccess({ client }));
        this.dialogRef.close(client);
      },
    });
  }

  private updateClient(): void {
    const clientFormValue = this.clientForm.value;
    const client = this.data.client;
    this.clientService.update(client.id, clientFormValue).subscribe({
      next: (client) => {
        this.store.dispatch(loadUpdateClientSuccess({ client }));
        this.dialogRef.close(client);
      },
    });
  }

  private GetByDni(documentNumber: string): void {
    this.identityService.getByDni(documentNumber).subscribe({
      next: (data) =>
        this.nameControl.setValue(
          `${data.nombres} ${data.apellidoPaterno} ${data.apellidoMaterno}`
        ),
    });
  }

  private GetByRuc(ruc: string): void {
    this.identityService.getByRuc(ruc).subscribe({
      next: (data) => {
        this.nameControl.setValue(data.razonSocial);
        this.clientForm.patchValue({
          address: data.direccion,
        });
      },
    });
  }

  public getClientDataByDocumentNumber(): void {
    const documentNumberControl = this.clientForm.controls['documentNumber'];
    const typeDocumentControl = this.clientForm.controls['typeDocumentId'];
    const documentNumber = documentNumberControl.value;
    const typeDocument = typeDocumentControl.value;
    if (typeDocument == this.codeDocuments.DOC_RUC) {
      this.GetByRuc(documentNumber);
      return;
    }

    if (typeDocument == this.codeDocuments.DOC_NAC_IDENTIDAD) {
      this.GetByDni(documentNumber);
      return;
    }
  }

  public handleAction(): void {
    this.isEditMode ? this.updateClient() : this.saveClient();
  }

  public handleSaveClient(): void {
    const clientFormIsInvalid = this.clientForm.invalid;
    clientFormIsInvalid
      ? this.clientForm.markAllAsTouched()
      : this.handleAction();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
