import { PaginationInterface } from "./pagination.interface";

export interface ResponseList<T> extends PaginationInterface {
  data: T[];
}
