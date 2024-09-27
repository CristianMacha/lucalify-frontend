import { TypeDocument } from './type-document.interface';

export interface Client {
  id: string;
  name: string;
  typeDocument: TypeDocument;
  documentNumber: string;
  email: string;
  phone: string;
  address: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FilterClient {
  textSearch: string;
  page: number;
  perPage: number;
}

export interface CreateClient {
  name: string;
  typeDocumentId: string;
  documentNumber: string;
  email: string;
  phone: string;
  address: string;
}

export interface UpdateClient extends CreateClient {}
