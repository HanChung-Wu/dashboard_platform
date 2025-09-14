import { ChartAPI } from "./ChartAPI.cjs";
import { DashboardAPI } from "./DashboardAPI.cjs";
import { DataTableAPI } from "./DataTableAPI.cjs";

// API 模組
export const APIModule = {
  init: () => {
    DataTableAPI.init();
    ChartAPI.init();
    DashboardAPI.init();
  },
};
