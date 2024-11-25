import { Client } from '@interfaces/client.interface';
import { CreatePaymentTrade } from '@interfaces/payment.interface';
import {
  CreateProductTradeFront,
  ProductTrade,
} from '@interfaces/product-trade.interface';
import { createReducer, on } from '@ngrx/store';
import {
  addClient,
  addPayment,
  addProductTrade,
  clearFormTrade,
  removeClient,
  removePayment,
  removeProductTrade,
  updatePriceProductTrade,
  updateQuantityProductTrade,
} from './form-trade.actions';
import { TradeType } from '@interfaces/trade.interface';

export const formTradeFeatureKey = 'formTrade';

export interface FormTradeState {
  productTrades: ProductTrade[];
  client: Client | null;
  payments: CreatePaymentTrade[];
}

export const initialState: FormTradeState = {
  productTrades: [],
  client: null,
  payments: [],
};

export const _formTradeReducer = createReducer(
  initialState,
  on(addProductTrade, (state, { product, tradeType }) => {
    const existingProductIndex = state.productTrades.findIndex(
      (productTradeSelect) => productTradeSelect.product.id === product.id
    );
    if (existingProductIndex === -1) {
      const newProductTrade: ProductTrade = {
        product,
        quantity: 1,
        price: tradeType === TradeType.SALE ? product.price : product.pricePurchase,
        createdBy: '',
        createdAt: new Date(),
        id: '',
        updatedAt: new Date(),
        updatedBy: '',
      };
      return {
        ...state,
        productTrades: [
          ...state.productTrades,
          newProductTrade
        ],
      };
    } else {
      const productTrades = state.productTrades.map(
        (productTradeSelect, index) => {
          if (index === existingProductIndex) {
            return {
              ...productTradeSelect,
              quantity: productTradeSelect.quantity + 1,
            };
          }
          return productTradeSelect;
        }
      );
      return {
        ...state,
        productTrades,
      };
    }
  }),
  on(removeProductTrade, (state, { id }) => ({
    ...state,
    productTrades: state.productTrades.filter(
      (productTrade) => productTrade.product.id !== id
    ),
  })),
  on(updateQuantityProductTrade, (state, { id, quantity }) => {
    const productTrades = state.productTrades.map((productTradeSelect) => {
      if (productTradeSelect.product.id === id) {
        return {
          ...productTradeSelect,
          quantity,
        };
      }
      return productTradeSelect;
    });
    return {
      ...state,
      productTrades,
    };
  }),
  on(updatePriceProductTrade, (state, { id, price }) => {
    const productTrades = state.productTrades.map((productTradeSelect) => {
      if (productTradeSelect.product.id === id) {
        return {
          ...productTradeSelect,
          price,
        };
      }
      return productTradeSelect;
    });
    return {
      ...state,
      productTrades,
    };
  }),
  on(clearFormTrade, (state) => ({
    ...state,
    productTrades: [],
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
