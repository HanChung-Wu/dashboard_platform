console.log("Preload script loaded");
import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("api", {
  uploadTable: (
    tableInfo: { name: string; description?: string },
    content: Record<string, string | number | boolean | null | undefined>[]
  ) => ipcRenderer.invoke("upload-table", { tableInfo, content }),
  getAllTableInfos: () => ipcRenderer.invoke("get-all-table-infos"),
  getTable: (id: number) => ipcRenderer.invoke("get-table", id),
  deleteTable: (id: number) => ipcRenderer.invoke("delete-table", id),
  uploadChart: (
    chartInfo: { name: string; description?: string },
    config: unknown
  ) => ipcRenderer.invoke("upload-chart", { chartInfo, config }),
  deleteChart: (id: number) => ipcRenderer.invoke("delete-chart", id),
});
console.log("Preload script end");
