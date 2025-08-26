export type ChartType = "line" | "bar" | "pie" | "scatter";

export interface DataSource {
  id: string;
  label: string;
  url: string;
  refreshInterval?: number; // 毫秒 (例：30000 = 30 秒)
}


export interface ChartStyle {
  colorScheme: "default" | "dark" | "pastel";
  showLegend: boolean;
  showGrid: boolean;
}

export interface ChartConfig {
  id: string;
  type: ChartType;
  dataSourceId: string;
  style: ChartStyle;
  refreshInterval?: number; // 毫秒 (例：30000 = 30 秒)
  fields?: string[]; // 要顯示的數據欄位
}


