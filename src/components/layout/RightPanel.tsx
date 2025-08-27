// components/layout/RightPanel.tsx
import React, { useState } from "react";
import { Box } from "@mui/material";
import { useUIStore } from "../../stores/uiStore";

export const RightPanel: React.FC = () => {
  const { rightPanelEnabled, rightPanelContent } = useUIStore();
  const [visible, setVisible] = useState(false);

  if (!rightPanelEnabled) return null;

  return (
    <Box
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      sx={{
        position: "fixed",
        top: 60, // 避開 TopNav
        right: 0,
        width: visible ? "300px" : "0px",
        height: "calc(100vh - 60px)",
        overflow: "hidden",
        transition: "width 0.3s ease",
        bgcolor: "#f5f5f5",
        zIndex: 1200,
        boxShadow: visible ? "-2px 0 5px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <Box sx={{ p: 2 }}>{rightPanelContent}</Box>
    </Box>
  );
};
