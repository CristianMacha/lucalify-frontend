import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoryService } from '@services/category.service';
import { AppState } from '../../../../app.state';
import { Category } from '@interfaces/category.interface';
import {
  FormControl,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Product } from '@interfaces/product.interface';
import { NgFor } from '@angular/common';
import { loadCreateProduct, loadUpdateProduct } from '../state/product.actions';

@Component({
  selector: 'app-modal-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './modal-product-form.component.html',
})
export class ModalProductFormComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private store = inject(Store<AppState>);

  public dialogRef = inject(DialogRef<boolean>);
  public data = inject<{ product: Product }>(DIALOG_DATA);
  public productForm = new UntypedFormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl('', Validators.required),
    stock: new FormControl(0, Validators.required),
    code: new FormControl('', Validators.required),
    categoryId: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });
  public categories: Category[] = [];
  public isEditMode = !!this.data;

  ngOnInit(): void {
    this.isEditMode && this.setProductFormValues();
    this.getCategories();
  }

  private getCategories(): void {
    this.categoryService.getListActiveCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });
  }

  private setProductFormValues(): void {
    const { name, description, price, stock, code, category } =
      this.data.product;
    this.productForm.patchValue({
      name,
      description,
      price,
      stock,
      code,
      categoryId: category.id,
    });
    this.productForm.controls['stock'].disable();
  }

  private saveProduct(): void {
    const productFormValue = this.productForm.value;
    this.store.dispatch(loadCreateProduct({ createProduct: productFormValue }));
    this.dialogRef.close(true);
  }

  private updateProduct(): void {
    const productFormValue = this.productForm.value;
    const product = this.data.product;
    this.store.dispatch(
      loadUpdateProduct({ id: product.id, updateProduct: productFormValue })
    );
    this.dialogRef.close(true);
  }

  private handleAction(): void {
    this.isEditMode ? this.updateProduct() : this.saveProduct();
  }

  public handleSaveProduct(): void {
    const productFormIsInvalid = this.productForm.invalid;
    productFormIsInvalid
      ? this.productForm.markAllAsTouched()
      : this.handleAction();
  }

  public onNoClick(): void {
    this.dialogRef.close(false);
  }
}
