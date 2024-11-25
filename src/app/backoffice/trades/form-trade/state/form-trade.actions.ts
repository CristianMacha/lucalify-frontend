import { Client } from "@interfaces/client.interface";
import { CreatePaymentTrade } from "@interfaces/payment.interface";
import { Product } from "@interfaces/product.interface";
import { TradeType } from "@interfaces/trade.interface";
import { createAction, props } from "@ngrx/store";

export const addProductTrade = createAction('[Form Trade] Add Product Trade', props<{ product: Product, tradeType: TradeType }>());
export const removeProductTrade = createAction('[Form Trade] Remove Product Trade', props<{ id: string }>());
export const updateQuantityProductTrade = createAction('[Form Trade] Update Quantity Product Trade', props<{ id: string, quantity: number }>());
export const updatePriceProductTrade = createAction('[Form Trade] Update Price Product Trade', props<{ id: string, price: number }>());

export const addClient = createAction('[Form Trade] Add Client', props<{ client: Client }>());
export const removeClient = createAction('[Form Trade] Remove Client');
export const clearFormTrade = createAction('[Form Trade] Clear Form Trade');

export const addPayment = createAction('[Form Trade] Add Payment', props<{ payment: CreatePaymentTrade }>());
export const removePayment = createAction('[Form Trade] Remove Payment', props<{ id: string }>());
