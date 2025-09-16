// src/hooks/useFileParser.ts
import { useState, useEffect } from "react";
import { parseDataFile } from "../utils";
import type { DataTableHeaderSchema } from "shared/types/dataTable";

interface UseFileParserReturn {
  loading: boolean;
  data: DataTableHeaderSchema | null;
  error: string | null;
}

export const useFileParser = (file: File | null): UseFileParserReturn => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataTableHeaderSchema | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processFile = async () => {
      if (!file) {
        setError("無檔案資料。請返回資料表格列表頁重新上傳。");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const parsedData = await parseDataFile(file);
        setData(parsedData);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("解析檔案時發生未知錯誤");
        }
      } finally {
        setLoading(false);
      }
    };

    processFile();
  }, [file]);

  return { loading, data, error };
};
