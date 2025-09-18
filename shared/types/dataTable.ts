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

export type DataValue = string | number | boolean | null | undefined;
export type DataRecord = Record<string, DataValue>;
export type DataRow = DataValue[];
export type DataTableRecordSchema = DataRecord[];
export type DataTableHeader = string;
export interface DataTableHeaderSchema {
  headers: DataTableHeader[];
  rows: DataRow[];
}
export interface DataTableWithInfo {
  info: DataTableInfo;
  data: DataTableHeaderSchema;
}
