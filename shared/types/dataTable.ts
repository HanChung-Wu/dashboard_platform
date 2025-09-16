export type ColumnType = "string" | "number" | "boolean" | "date";
export interface ColumnInfo {
  name: string;
  desc?: string;
  type: ColumnType;
}

export interface DataTableInfo {
  id: string;
  name: string;
  description?: string;
  file_path: string;
  created_at: string;
  updated_at: string;
  fileSize?: string | number;
  columnInfos?: ColumnInfo[];
}

export type DataType = string | number | boolean | null | undefined;
export type DataRecord = Record<string, DataType>;
export type DataRow = DataType[];
export type DataTableRecordSchema = DataRecord[];
export interface DataTableHeaderSchema {
  headers: string[];
  rows: DataRow[];
}
export interface DataTableWithInfo {
  info: DataTableInfo;
  data: DataTableHeaderSchema;
}
