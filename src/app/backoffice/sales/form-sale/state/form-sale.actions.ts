import { Client } from "@interfaces/client.interface";
import { CreatePaymentSale } from "@interfaces/payment.interface";
import { Product } from "@interfaces/product.interface";
import { createAction, props } from "@ngrx/store";

export const addProductSale = createAction('[Form Sale] Add Product Sale', props<{ product: Product }>());
export const removeProductSale = createAction('[Form Sale] Remove Product Sale', props<{ id: string }>());
export const updateQuantityProductSale = createAction('[Form Sale] Update Quantity Product Sale', props<{ id: string, quantity: number }>());

export const addClient = createAction('[Form Sale] Add Client', props<{ client: Client }>());
export const removeClient = createAction('[Form Sale] Remove Client');
export const clearFormSale = createAction('[Form Sale] Clear Form Sale');

export const addPayment = createAction('[Form Sale] Add Payment', props<{ payment: CreatePaymentSale }>());
export const removePayment = createAction('[Form Sale] Remove Payment', props<{ id: string }>());
