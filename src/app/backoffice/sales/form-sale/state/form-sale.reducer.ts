import { Client } from '@interfaces/client.interface';
import { CreatePaymentSale } from '@interfaces/payment.interface';
import {
  CreateProductSaleFront,
  ProductSale,
} from '@interfaces/product-sale.interface';
import { createReducer, on } from '@ngrx/store';
import {
  addClient,
  addPayment,
  addProductSale,
  clearFormSale,
  removeClient,
  removePayment,
  removeProductSale,
  updateQuantityProductSale,
} from './form-sale.actions';

export const formSaleFeatureKey = 'formSale';

export interface FormSaleState {
  productSales: ProductSale[];
  client: Client | null;
  payments: CreatePaymentSale[];
}

export const initialState: FormSaleState = {
  productSales: [],
  client: null,
  payments: [],
};

export const _formSaleReducer = createReducer(
  initialState,
  on(addProductSale, (state, { product }) => {
    const existingProductIndex = state.productSales.findIndex(
      (productSaleSelect) => productSaleSelect.product.id === product.id
    );
    if (existingProductIndex === -1) {
      const newProductSale: ProductSale = {
        product,
        quantity: 1,
        price: product.price,
        createdBy: '',
        createdAt: new Date(),
        id: '',
        updatedAt: new Date(),
        updatedBy: '',
      };
      return {
        ...state,
        productSales: [
          ...state.productSales,
          newProductSale
        ],
      };
    } else {
      const productSales = state.productSales.map(
        (productSaleSelect, index) => {
          if (index === existingProductIndex) {
            return {
              ...productSaleSelect,
              quantity: productSaleSelect.quantity + 1,
            };
          }
          return productSaleSelect;
        }
      );
      return {
        ...state,
        productSales,
      };
    }
  }),
  on(removeProductSale, (state, { id }) => ({
    ...state,
    productSales: state.productSales.filter(
      (productSale) => productSale.product.id !== id
    ),
  })),
  on(updateQuantityProductSale, (state, { id, quantity }) => {
    const productSales = state.productSales.map((productSaleSelect) => {
      if (productSaleSelect.product.id === id) {
        return {
          ...productSaleSelect,
          quantity,
        };
      }
      return productSaleSelect;
    });
    return {
      ...state,
      productSales,
    };
  }),
  on(clearFormSale, (state) => ({
    ...state,
    productSales: [],
    client: null,
    payments: [],
  })),
  on(addClient, (state, { client }) => ({ ...state, client })),
  on(removeClient, (state) => ({ ...state, client: null })),
  on(addPayment, (state, { payment }) => ({
    ...state,
    payments: [...state.payments, payment],
  })),
  on(removePayment, (state, { id }) => ({
    ...state,
    payments: state.payments.filter((payment) => payment.id !== id),
  }))
);
