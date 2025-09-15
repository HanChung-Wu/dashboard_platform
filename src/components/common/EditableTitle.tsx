// src/components/common/EditableTitle.tsx
import React, { useCallback } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

interface EditableTitleProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  isEditing: boolean;
  onEditingChange: (editing: boolean) => void;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  label?: string;
  placeholder?: string;
}

const EditableTitle: React.FC<EditableTitleProps> = ({
  title,
  onTitleChange,
  isEditing,
  onEditingChange,
  variant = "h4",
  label = "標題",
  placeholder = "請輸入標題",
}) => {
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onTitleChange(e.target.value);
    },
    [onTitleChange]
  );

  const handleStartEditing = useCallback(() => {
    onEditingChange(true);
  }, [onEditingChange]);

  const handleStopEditing = useCallback(() => {
    onEditingChange(false);
  }, [onEditingChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleStopEditing();
      }
      if (e.key === "Escape") {
        handleStopEditing();
      }
    },
    [handleStopEditing]
  );

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant={variant} sx={{ mr: 1, fontWeight: "bold" }}>
        {label}
      </Typography>
      {isEditing ? (
        <TextField
          value={title}
          onChange={handleTitleChange}
          onBlur={handleStopEditing}
          onKeyDown={handleKeyDown}
          autoFocus
          variant="standard"
          placeholder={placeholder}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <EditIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      ) : (
        <Tooltip title={`點擊編輯${label}`}>
          <Box
            onClick={handleStartEditing}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": {
                "& .MuiTypography-root": {
                  color: "primary.main",
                  textDecoration: "underline",
                },
                "& .MuiSvgIcon-root": {
                  color: "primary.main",
                },
              },
            }}
          >
            <Typography
              variant={variant}
              component="span"
              sx={{ fontWeight: "bold" }}
            >
              {title}
            </Typography>
            <IconButton size="small" sx={{ ml: 0.5 }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
        </Tooltip>
      )}
    </Box>
  );
};

export default EditableTitle;
