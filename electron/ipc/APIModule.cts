import { ipcMain } from "electron";
import { ChartAPIHandlers } from "./ChartAPIHandlers.cjs";
import { DashboardAPIHandlers } from "./DashboardAPIHandlers.cjs";
import { DataTableAPIHandlers } from "./DataTableAPIHandlers.cjs";
import { IpcMainListener } from "../types.cjs";

function registerIpcHandlers(handlers: Record<string, IpcMainListener>) {
  Object.entries(handlers).forEach(([key, handler]) => {
    ipcMain.handle(key, async (...args) => {
      try {
        return await handler(...args);
      } catch (err) {
        console.error(`[IPC Error] ${key}:`, err);
        throw err;
      }
    });
  });
}

// API 模組
export const APIModule = {
  init: () => {
    registerIpcHandlers(DataTableAPIHandlers);
    registerIpcHandlers(ChartAPIHandlers);
    registerIpcHandlers(DashboardAPIHandlers);
  },
};
