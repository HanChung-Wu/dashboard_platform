import { ipcMain } from "electron";
import { FileManager } from "../models/FileManager.cjs";
import { ChartManager } from "../models/ChartManager.cjs";

export const ChartAPI = {
  init: () => {
    // 上傳圖表設定檔
    ipcMain.handle("upload-chart", (_event, { chartInfo, config }) => {
      const { name, description } = chartInfo;
      const chartDirectory = FileManager.getUserDataPath(
        "charts",
        `${Date.now()}_${name}`
      );
      FileManager.ensureDirectory(chartDirectory);

      const configPath = FileManager.saveFile(
        chartDirectory,
        "config.json",
        config
      );
      const previewPath = FileManager.saveFile(
        chartDirectory,
        "preview.png",
        ""
      ); // 空檔案占位

      ChartManager.addChart({
        name,
        description,
        config_path: configPath,
        preview_path: previewPath,
      });

      return { name, description, configPath, previewPath };
    });

    // 刪除圖表
    ipcMain.handle("delete-chart", (_event, id) => {
      const chart = ChartManager.getChartById(id);
      if (!chart) throw new Error("圖表不存在");

      FileManager.deleteFile(chart.config_path);
      if (chart.preview_path) FileManager.deleteFile(chart.preview_path);
      ChartManager.deleteChart(id);

      return { message: "圖表已刪除" };
    });
  },
};
