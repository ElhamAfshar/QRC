import { Merge } from "./merg_interface.ts";

export interface Reply<T> {
  success: boolean;
  body: Partial<T>[] | [];
}

type CRUD = "create" | "get" | "update" | "delete";
export interface details<R, T, E> {
  selected?: R;
  body?: Merge<T, E>;
}

export interface myBodies<R, T, E> {
  wants: CRUD;
  details: details<R, T, E>;
}
