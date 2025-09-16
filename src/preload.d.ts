export {};
import type {
  DataTableHeaderSchema,
  DataTableInfo,
  DataTableWithInfo,
} from "shared/types/dataTable";
import type { Message } from "shared/types";
import type { ChartInfo } from "shared/types/chart";
interface DataTableAPI {
  uploadTable: (
    tableInfo: { name: string; description?: string },
    content: DataTableHeaderSchema
  ) => Promise<DataTableInfo>;
  getAllTableInfos: () => Promise<DataTableInfo[]>;
  getTable: (id: number) => Promise<DataTableWithInfo>;
  deleteTable: (id: number) => Promise<Message>;
  updateTable: (
    id: number,
    name: string,
    data: DataTableHeaderSchema
  ) => Promise<DataTableWithInfo>;
}

interface ChartAPI {
  uploadChart: (
    chartInfo: { name: string; description?: string },
    config: unknown
  ) => Promise<ChartInfo>;
  deleteChart: (id: number) => Promise<Message>;
}

declare global {
  interface Window {
    api: DataTableAPI & ChartAPI;
  }
}
