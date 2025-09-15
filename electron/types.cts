import { IpcMainInvokeEvent } from "electron";

export interface DataTableInfo {
  id: number;
  name: string;
  description?: string;
  file_path: string;
  created_at: string;
  updated_at: string;
}
export type ColumnType = "string" | "number" | "boolean" | "date";
export interface ColumnInfo {
  name: string;
  desc?: string;
  type: ColumnType;
}
export type DataType = string | number | boolean | null | undefined;
export type DataRow = Record<string, DataType>;
export type DataTable = DataRow[];
export interface DataTableWithInfo {
  info: DataTableInfo;
  data: DataTable;
}

export interface ChartInfo {
  id: number;
  name: string;
  description?: string;
  config_path: string;
  preview_path?: string;
  created_at: string;
  updated_at: string;
}

export type IpcMainListener = (
  event: IpcMainInvokeEvent,
  ...args: any[]
) => Promise<any> | any;

export type Result<T, E> = Ok<T, E> | Err<T, E>;
export class Ok<T, _> {
  readonly type = "ok" as const;
  constructor(public value: T) {}
}

export class Err<_, E> {
  readonly type = "err" as const;
  constructor(public error: E) {}
}
