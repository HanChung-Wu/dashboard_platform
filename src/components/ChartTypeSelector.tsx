import React from "react";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { type ChartType } from "../types";

interface Props {
  value: ChartType;
  onChange: (value: ChartType) => void;
}

export const ChartTypeSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>圖表類型</InputLabel>
      <Select
        value={value}
        label="圖表類型"
        onChange={(e) => onChange(e.target.value as ChartType)}
      >
        <MenuItem value="line">折線圖</MenuItem>
        <MenuItem value="bar">長條圖</MenuItem>
        <MenuItem value="pie">圓餅圖</MenuItem>
        <MenuItem value="scatter">散點圖</MenuItem>
      </Select>
    </FormControl>
  );
};
