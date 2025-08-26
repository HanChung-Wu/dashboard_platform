import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { type DataSource } from "../types";

interface Props {
  value: string;
  onChange: (value: string) => void;
  dataSources: DataSource[];
}

export const DataSourceSelector: React.FC<Props> = ({
  value,
  onChange,
  dataSources,
}) => {
  return (
    <Autocomplete
      options={dataSources}
      getOptionLabel={(o) => o.label}
      value={dataSources.find((d) => d.id === value) || null}
      onChange={(_, newVal) => onChange(newVal?.id || "")}
      renderInput={(params) => <TextField {...params} label="資料來源" />}
    />
  );
};
