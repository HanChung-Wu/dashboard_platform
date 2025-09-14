// import { DataTableInfo } from "../types.js";
// import { RunResult } from "better-sqlite3";

// db.exec(`CREATE TABLE IF NOT EXISTS tableInfos (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL UNIQUE,
//     description TEXT,
//     file_path TEXT NOT NULL UNIQUE,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
// );`);

// const getAllTableInfos = (): DataTableInfo[] => {
//   const sql =
//     "SELECT id, name, description, file_path, created_at, updated_at FROM tables";
//   return db.prepare<[], DataTableInfo>(sql).all();
// };
// const getTableInfoById = (id: number): DataTableInfo | undefined => {
//   const sql =
//     "SELECT id, name, description, file_path, created_at, updated_at FROM tables WHERE id = ?";
//   return db.prepare<[number], DataTableInfo>(sql).get(id);
// };
// const getTableInfoByName = (name: string): DataTableInfo | undefined => {
//   const sql =
//     "SELECT id, name, description, file_path, created_at, updated_at FROM tables WHERE name = ?";
//   return db.prepare<[string], DataTableInfo>(sql).get(name);
// };
// const addTableInfo = (info: {
//   name: string;
//   description?: string;
//   file_path: string;
// }): DataTableInfo => {
//   const sql =
//     "INSERT INTO tables (name, description, file_path) VALUES (?, ?, ?)";
//   const result = db
//     .prepare<[string, string | undefined, string], RunResult>(sql)
//     .run(info.name, info.description, info.file_path);
//   // 驚嘆號是 ts 標註，表示不可能是 undefined 或 null
//   return getTableInfoById(result.lastInsertRowid as number)!;
// };
// const updateTableInfo = (info: {
//   id: number;
//   name?: string;
//   description?: string;
//   file_path?: string;
// }): DataTableInfo => {
//   const fields = [];
//   const values = [];
//   if (info.name !== undefined) {
//     fields.push("name = ?");
//     values.push(info.name);
//   }
//   if (info.description !== undefined) {
//     fields.push("description = ?");
//     values.push(info.description);
//   }
//   if (info.file_path !== undefined) {
//     fields.push("file_path = ?");
//     values.push(info.file_path);
//   }
//   if (fields.length === 0) {
//     throw new Error("No fields to update");
//   }
//   values.push(info.id);
//   const sql = `UPDATE tables SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
//   db.prepare(sql).run(...values);
//   return getTableInfoById(info.id)!;
// };
// const deleteTableInfo = (id: number): void => {
//   const sql = "DELETE FROM tables WHERE id = ?";
//   db.prepare(sql).run(id);
// };

// export {
//   getAllTableInfos,
//   getTableInfoById,
//   getTableInfoByName,
//   addTableInfo,
//   updateTableInfo,
//   deleteTableInfo,
// };
