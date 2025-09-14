import { ipcMain } from "electron";
import { FileManager } from "../models/FileManager.cjs";
import { DatabaseManager } from "../models/DatabaseManager.cjs";

export const DataTableAPI = {
  init: () => {
    // 上傳資料表格
    ipcMain.handle("upload-table", (_event, { tableInfo, content }) => {
      const { name, description } = tableInfo;
      const directory = FileManager.getUserDataPath("tables");

      const fileName = `${Date.now()}_${name}.json`;
      const filePath = FileManager.saveFile(directory, fileName, content);

      DatabaseManager.run(
        "INSERT INTO tables (name, description, file_path) VALUES (?, ?, ?)",
        [name, description, filePath]
      );

      return { name, description, filePath };
    });

    // 獲取所有資料表格
    ipcMain.handle("get-tables", () => {
      return DatabaseManager.query("SELECT * FROM tables");
    });

    // 刪除資料表格
    ipcMain.handle("delete-table", (_event, id) => {
      const table = DatabaseManager.get<{ file_path: string }>(
        "SELECT file_path FROM tables WHERE id = ?",
        [id]
      );
      if (!table) throw new Error("資料表不存在");

      FileManager.deleteFile(table.file_path);
      DatabaseManager.run("DELETE FROM tables WHERE id = ?", [id]);

      return { message: "資料表已刪除" };
    });
  },
};
