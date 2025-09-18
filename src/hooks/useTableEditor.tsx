// src/hooks/useTableEditor.tsx
import { useState, useEffect } from "react";
import type {
  DataTableHeaderSchema,
  DataTableHeader,
  DataValue,
} from "shared/types/dataTable";

interface UseTableEditorReturn {
  tableName: string;
  setTableName: (name: string) => void;
  isEditingName: boolean;
  setIsEditingName: (editing: boolean) => void;
  data: DataTableHeaderSchema | null;
  handleCellChange: (
    rowIndex: number,
    colIndex: number,
    newValue: DataValue
  ) => void;
  updateData: (newData: DataTableHeaderSchema | null) => void;
  handleHeaderChange: (colIndex: number, newHeader: DataTableHeader) => void;
}

export const useTableEditor = (
  initialData: DataTableHeaderSchema | null,
  initialName: string
): UseTableEditorReturn => {
  const [tableName, setTableName] = useState(initialName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [data, setData] = useState<DataTableHeaderSchema | null>(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    setTableName(initialName);
  }, [initialName]);

  const updateData = (newData: DataTableHeaderSchema | null) => {
    setData(newData);
  };

  const handleCellChange = (
    rowIndex: number,
    colIndex: number,
    newValue: DataValue
  ) => {
    if (!data) return;
    const newData = { ...data };
    newData.rows[rowIndex][colIndex] = newValue;
    setData(newData);
  };

  const handleHeaderChange = (colIndex: number, newHeader: DataTableHeader) => {
    if (!data) return;
    const newHeaders = [...data.headers];
    newHeaders[colIndex] = newHeader;
    setData({ ...data, headers: newHeaders });
  };

  return {
    tableName,
    setTableName,
    isEditingName,
    setIsEditingName,
    data,
    updateData,
    handleCellChange,
    handleHeaderChange,
  };
};
