import { Client, CreateClient, FilterClient, UpdateClient } from "@interfaces/client.interface";
import { ResponseList } from "@interfaces/response.interface";
import { createAction, props } from "@ngrx/store";

export const loadFilteredClients = createAction('[Client] Load Filtered Clients', props<{ filter: FilterClient }>());
export const loadFilteredClientsSuccess = createAction('[Client] Load Filtered Clients Success', props<{ response: ResponseList<Client> }>());
export const loadFilteredClientsFailure = createAction('[Client] Load Filtered Clients Failure', props<{ error: any }>());

export const loadCreateClient = createAction('[Client] Load Create Client', props<{ createClient: CreateClient }>());
export const loadCreateClientSuccess = createAction('[Client] Load Create Client Success', props<{ client: Client }>());
export const loadCreateClientFailure = createAction('[Client] Load Create Client Failure', props<{ error: any }>());

export const loadUpdateClient = createAction('[Client] Load Update Client', props<{ id: string; updateClient: UpdateClient }>());
export const loadUpdateClientSuccess = createAction('[Client] Load Update Client Success', props<{ client: Client }>());
export const loadUpdateClientFailure = createAction('[Client] Load Update Client Failure', props<{ error: any }>());

export const loadFilterClient = createAction('[Client] Load Filter Client', props<{ filter: FilterClient }>());
