console.log("Preload script loaded");
import { contextBridge, ipcRenderer } from "electron";

interface Message {
  message: string;
}
type ColumnType = "string" | "number" | "boolean" | "date";
interface ColumnInfo {
  name: string;
  desc?: string;
  type: ColumnType;
}

interface DataTableInfo {
  id: string;
  name: string;
  description?: string;
  file_path: string;
  created_at: string;
  updated_at: string;
  fileSize?: string | number;
  columnInfos?: ColumnInfo[];
}

type DataType = string | number | boolean | null | undefined;
// type DataRecord = Record<string, DataType>;
type DataRow = DataType[];
// type DataTableRecordSchema = DataRecord[];
interface DataTableHeaderSchema {
  headers: string[];
  rows: DataRow[];
}
interface DataTableWithInfo {
  info: DataTableInfo;
  data: DataTableHeaderSchema;
}

interface ChartInfo {
  id: number;
  name: string;
  description?: string;
  config_path: string;
  preview_path?: string;
  created_at: string;
  updated_at: string;
}
// interface ChartConfig {
//   title: string;
//   type: "bar" | "line" | "pie" | "scatter" | "histogram";
//   xAxis: string;
//   yAxis: string;
//   series?: string[];
//   options?: Record<string, unknown>;
// }
// interface ChartWithConfig {
//   info: ChartInfo;
//   config: ChartConfig;
// }
// interface ChartWithPreview extends ChartWithConfig {
//   previewPath?: string;
// }
// interface ChartWithData extends ChartWithConfig {
//   data: Record<string, unknown>[];
// }
// interface ChartWithDataAndPreview extends ChartWithData {
//   previewPath?: string;
// }
// type ChartType =
//   | ChartWithConfig
//   | ChartWithData
//   | ChartWithPreview
//   | ChartWithDataAndPreview;
// type ChartTypeName = ChartType["info"]["name"];

contextBridge.exposeInMainWorld("api", {
  uploadTable: (
    tableInfo: { name: string; description?: string },
    content: DataTableHeaderSchema
  ): Promise<DataTableInfo> =>
    ipcRenderer.invoke("upload-table", { tableInfo, content }),
  getAllTableInfos: (): Promise<DataTableInfo[]> =>
    ipcRenderer.invoke("get-all-table-infos"),
  getTable: (id: number): Promise<DataTableWithInfo> =>
    ipcRenderer.invoke("get-table", id),
  updateTable: (
    id: number,
    name: string,
    data: DataTableHeaderSchema
  ): Promise<DataTableWithInfo> =>
    ipcRenderer.invoke("update-table", { id, name, data }),
  deleteTable: (id: number): Promise<Message> =>
    ipcRenderer.invoke("delete-table", id),
  uploadChart: (
    chartInfo: { name: string; description?: string },
    config: unknown
  ): Promise<ChartInfo> =>
    ipcRenderer.invoke("upload-chart", { chartInfo, config }),
  deleteChart: (id: number): Promise<Message> =>
    ipcRenderer.invoke("delete-chart", id),
});
console.log("Preload script end");
