import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import {
  loadCreateCategory,
  loadUpdateCategory,
} from './state/category.actions';
import { AppState } from '../../../app.state';
import { Category } from '@interfaces/category.interface';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-modal-category-form',
  standalone: true,
  imports: [DialogModule, ReactiveFormsModule],
  template: `
    <div class="px-4">
      <div class="bg-white dark:bg-black border dark:border-gray-700 rounded-xl p-4">
        <div>
          <h1 class="text-xl font-semibold">{{ isEditMode ? 'Actualizar' : 'Crear nueva' }} categoria</h1>
          <p class="text-gray-500 dark:text-gray-300 text-sm">
            Complete los detalles de la nueva categoria. Haga clic en
            <strong
              >{{ isEditMode ? 'Actualizar' : 'Guardar' }} categoria</strong
            >
            cuando haya terminado.
          </p>
        </div>
        <div class="mt-8">
          <form
            [formGroup]="categoryForm"
            class="flex flex-col gap-4"
            (submit)="handleSaveCategory()"
          >
            <div class="gap-2 items-center grid grid-cols-4">
              <label for="name" class="text-left md:text-right font-medium"
                >Nombre</label
              >
              <input
                type="text"
                id="name"
                class="w-full col-span-4 md:col-span-3"
                formControlName="name"
              />
            </div>
            <div class="gap-2 items-center grid grid-cols-4">
              <label
                for="description"
                class="text-left md:text-right font-medium"
                >Descripción</label
              >
              <textarea
                id="description"
                class="w-full col-span-4 md:col-span-3"
                formControlName="description"
              ></textarea>
            </div>
            <div class="flex justify-end gap-2">
              <label for="active" class="text-left md:text-right font-medium"
                >Activo</label
              >
              <input
                type="checkbox"
                id="active"
                class="checked:bg-gray-800"
                formControlName="active"
              />
            </div>
            <div class="flex justify-end">
              <button type="submit" class="btn btn-primary w-full md:w-auto">
                {{ isEditMode ? 'Actualizar' : 'Guardar' }} categoria
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class ModalCategoryFormComponent implements OnInit {
  private store = inject(Store<AppState>);
  public categoryForm = new UntypedFormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    active: new FormControl(true, Validators.required),
  });
  public dialogRef = inject(DialogRef<boolean>);
  public data = inject<{ category: Category }>(DIALOG_DATA);
  public isEditMode = !!this.data;

  ngOnInit(): void {
    this.isEditMode && this.setCategoryFormValues();
  }

  public handleSaveCategory(): void {
    const categoryFormIsInvalid = this.categoryForm.invalid;
    categoryFormIsInvalid
      ? this.categoryForm.markAllAsTouched()
      : this.handleAction();
  }

  private handleAction(): void {
    this.isEditMode ? this.updateCategory() : this.saveCategory();
  }

  private saveCategory(): void {
    const categoryFormValue = this.categoryForm.value;
    this.store.dispatch(
      loadCreateCategory({ createCategory: categoryFormValue })
    );
    this.dialogRef.close(true);
  }

  private setCategoryFormValues(): void {
    const { name, description, active } = this.data.category;
    this.categoryForm.patchValue({ name, description, active });
  }

  private updateCategory(): void {
    const categoryFormValue = this.categoryForm.value;
    const category = this.data.category;
    this.store.dispatch(
      loadUpdateCategory({ id: category.id, updateCategory: categoryFormValue })
    );
    this.dialogRef.close(true);
  }
}
