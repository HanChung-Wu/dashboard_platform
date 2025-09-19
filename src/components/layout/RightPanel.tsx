// src/components/layout/RightPanel.tsx
import IconButton from "@mui/material/IconButton";
import LeftArrow from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CloseIcon from "@mui/icons-material/Close";
import { useLayoutStore } from "../../stores/layoutStore";
import "./layout.css";

export const RightPanel = () => {
  const {
    rightPanelEnabled,
    rightPanelTitle,
    rightPanelContent,
    setRightPanelEnabled,
  } = useLayoutStore();
  const handleOpen = () => {
    setRightPanelEnabled(true);
  };

  const handleClose = () => {
    setRightPanelEnabled(false);
  };

  if (!rightPanelEnabled)
    return (
      <div className="right-panel-collapsed" onClick={handleOpen}>
        <IconButton
          aria-label="open"
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
          }}
        >
          <LeftArrow />
        </IconButton>
      </div>
    );

  return (
    <div className="right-panel">
      <div className="right-panel-title">
        {rightPanelTitle || "右側面板標題"}
      </div>{" "}
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <div className="right-panel-content">{rightPanelContent || "無內容"}</div>
    </div>
  );
};
