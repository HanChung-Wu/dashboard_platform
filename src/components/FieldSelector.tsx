import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from "@mui/material";

interface Props {
    availableFields: string[];
    selectedFields: string[];
    onChange: (fields: string[]) => void;
}

export const FieldSelector: React.FC<Props> = ({
    availableFields,
    selectedFields,
    onChange,
}) => {
    return (
        <FormControl fullWidth margin="normal">
            <InputLabel>顯示欄位</InputLabel>
            <Select
                multiple
                value={selectedFields}
                onChange={(e) => onChange(e.target.value as string[])}
                renderValue={(selected) => (selected as string[]).join(", ")}
            >
                {availableFields.map((field) => (
                    <MenuItem key={field} value={field}>
                        <Checkbox checked={selectedFields.includes(field)} />
                        <ListItemText primary={field} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
