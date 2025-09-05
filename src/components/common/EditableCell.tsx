import React from "react";
import { TableCell, TextField, Tooltip, Typography } from "@mui/material";
type EditableCellProps = {
  rowIndex: number;
  colIndex: number;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    rowIndex: number,
    colIndex: number
  ) => void;
};
const EditableCell = React.memo<EditableCellProps>(
  ({ rowIndex, colIndex, value, onChange }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    return (
      <TableCell
        onClick={() => setIsEditing(true)}
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
    // ➤ 自定義 shouldComponentUpdate 邏輯（重要）
    return prevProps.value === nextProps.value;
  }
);
export default EditableCell;
