export interface DataTableInfo {
  id: number;
  name: string;
  description?: string;
  file_path: string;
  created_at: string;
  updated_at: string;
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
