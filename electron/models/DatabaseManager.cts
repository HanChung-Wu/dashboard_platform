import Database, {
  type Database as DatabaseType,
  type Statement,
  type RunResult,
} from "better-sqlite3";

// 資料庫交互模組
export const DatabaseManager = {
  db: null as DatabaseType | null,

  /**
   * 初始化資料庫
   * @param dbPath 資料庫檔案路徑
   * @returns 初始化後的 Database 實例
   */
  init: (dbPath: string): DatabaseType => {
    const db = new Database(dbPath, { verbose: console.log });
    DatabaseManager.db = db;
    return db;
  },

  /**
   * 執行 SQL 查詢（返回多筆資料）
   * @param sql SQL 查詢語句
   * @param params 綁定的查詢參數
   * @returns 查詢結果（陣列形式）
   */
  query<T = unknown>(sql: string, params: unknown[] = []): T[] {
    if (!DatabaseManager.db) throw new Error("資料庫尚未初始化");
    const stmt: Statement<unknown[], T> = DatabaseManager.db.prepare(sql);
    return stmt.all(...params);
  },

  /**
   * 執行 SQL 查詢（返回單筆資料）
   * @param sql SQL 查詢語句
   * @param params 綁定的查詢參數
   * @returns 查詢結果（單筆資料或 undefined）
   */
  get<T = unknown>(sql: string, params: unknown[] = []): T | undefined {
    if (!DatabaseManager.db) throw new Error("資料庫尚未初始化");
    const stmt: Statement<unknown[], T> = DatabaseManager.db.prepare(sql);
    return stmt.get(...params);
  },

  /**
   * 執行 SQL 更新或插入
   * @param sql SQL 更新或插入語句
   * @param params 綁定的參數
   * @returns 更新或插入操作的結果
   */
  run(sql: string, params: unknown[] = []): RunResult {
    if (!DatabaseManager.db) throw new Error("資料庫尚未初始化");
    const stmt: Statement<unknown[]> = DatabaseManager.db.prepare(sql);
    return stmt.run(...params);
  },
};
