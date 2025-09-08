// src/components/common/EditableCell.tsx
import React from "react";
import { TableCell, TextField, Tooltip, Typography } from "@mui/material";
type EditableCellProps = {
  rowIndex: number;
  colIndex: number;
  value: string | number;
  disabled?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    rowIndex: number,
    colIndex: number
  ) => void;
};
const EditableCell = React.memo<EditableCellProps>(
  ({ rowIndex, colIndex, value, onChange, disabled = false }) => {
    const [isEditing, setIsEditing] = React.useState(false);

    const handleClick = () => {
      if (!disabled) {
        setIsEditing(true);
      }
    };

    return (
      <TableCell
        onClick={handleClick}
        sx={{
          minWidth: "150px",
          maxWidth: "250px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {isEditing ? (
          <TextField
            value={value}
            onChange={(e) => onChange(e, rowIndex, colIndex)}
            onBlur={() => setIsEditing(false)}
            autoFocus
            variant="standard"
            size="small"
            sx={{ width: "100%", "& .MuiInputBase-root": { padding: 0 } }}
          />
        ) : (
          <Tooltip title={value}>
            <Typography component="span">{value}</Typography>
          </Tooltip>
        )}
      </TableCell>
    );
  },
  (prevProps, nextProps) => {
    // 自定義 shouldComponentUpdate 邏輯
    return (
      prevProps.value === nextProps.value &&
      prevProps.disabled === nextProps.disabled
    );
  }
);
export default EditableCell;
