import { PAGINATION } from '@consts/pagination';
import { Client, FilterClient } from '@interfaces/client.interface';
import { PaginationInterface } from '@interfaces/pagination.interface';
import { createReducer, on } from '@ngrx/store';
import {
  loadCreateClient,
  loadCreateClientFailure,
  loadCreateClientSuccess,
  loadFilterClient,
  loadFilteredClients,
  loadFilteredClientsFailure,
  loadFilteredClientsSuccess,
  loadUpdateClient,
  loadUpdateClientFailure,
  loadUpdateClientSuccess,
} from './client.actions';

export const clientFeatureKey = 'client';

export interface ClientState {
  filteredClients: Client[];
  loading: boolean;
  filters: FilterClient;
  pagination: PaginationInterface;
  error: any;
}

export const initialState: ClientState = {
  filteredClients: [],
  loading: false,
  filters: { textSearch: '', page: 1, perPage: PAGINATION.CLIENT_PER_PAGE },
  pagination: {
    currentPage: 1,
    perPage: PAGINATION.CLIENT_PER_PAGE,
    totalPages: 0,
    totalItems: 0,
  },
  error: null,
};

export const _clientReducer = createReducer(
  initialState,
  on(loadFilteredClients, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadFilteredClientsSuccess, (state, { response }) => ({
    ...state,
    filteredClients: response.data,
    pagination: {
      currentPage: response.currentPage,
      perPage: response.perPage,
      totalPages: response.totalPages,
      totalItems: response.totalItems,
    },
    loading: false,
  })),
  on(loadFilteredClientsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(loadCreateClient, (state) => ({ ...state, loading: true, error: null })),
  on(loadCreateClientSuccess, (state, { client }) => {
    const filteredClientsWithNewClient =
      state.filteredClients.length < state.pagination.perPage
        ? [client, ...state.filteredClients]
        : [client, ...state.filteredClients.slice(0, -1)];

    return {
      ...state,
      filteredClients: filteredClientsWithNewClient,
      pagination: {
        ...state.pagination,
        totalItems: state.pagination.totalItems + 1,
      },
      loading: false,
    };
  }),
  on(loadCreateClientFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(loadUpdateClient, (state) => ({ ...state, loading: true, error: null })),
  on(loadUpdateClientSuccess, (state, { client }) => {
    const clients = state.filteredClients.map((c) =>
      c.id === client.id ? client : c
    );
    return { ...state, filteredClients: clients, loading: false };
  }),
  on(loadUpdateClientFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(loadFilterClient, (state, { filter }) => ({
    ...state,
    filters: { ...filter },
  }))
);
