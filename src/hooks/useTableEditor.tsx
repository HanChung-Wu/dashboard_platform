// src/hooks/useTableEditor.ts
import { useState, useCallback } from "react";
import type { DataTableHeaderSchema } from "shared/types/dataTable";

interface UseTableEditorReturn {
  tableName: string;
  setTableName: (name: string) => void;
  isEditingName: boolean;
  setIsEditingName: (editing: boolean) => void;
  data: DataTableHeaderSchema | null;
  handleCellChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    rowIndex: number,
    colIndex: number
  ) => void;
  updateData: (newData: DataTableHeaderSchema | null) => void;
}

export const useTableEditor = (
  initialData: DataTableHeaderSchema | null,
  initialTableName: string
): UseTableEditorReturn => {
  const [tableName, setTableName] = useState(initialTableName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [data, setData] = useState<DataTableHeaderSchema | null>(initialData);

  const handleCellChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      rowIndex: number,
      colIndex: number
    ) => {
      if (!data) return;

      const newData = { ...data };
      newData.rows[rowIndex][colIndex] = e.target.value;
      setData(newData);
    },
    [data]
  );

  const updateData = useCallback((newData: DataTableHeaderSchema | null) => {
    setData(newData);
  }, []);

  return {
    tableName,
    setTableName,
    isEditingName,
    setIsEditingName,
    data,
    handleCellChange,
    updateData,
  };
};
