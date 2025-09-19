// src/components/layout/RightPanel.tsx
import { useLayoutStore } from "../../stores/layoutStore";
import "./layout.css";

export const RightPanel = () => {
  const { rightPanelEnabled, rightPanelTitle, rightPanelContent } =
    useLayoutStore();

  if (!rightPanelEnabled) return null;

  return (
    <div className="right-panel">
      <div className="right-panel-title">{rightPanelTitle}</div>
      <div className="right-panel-content">{rightPanelContent}</div>
    </div>
  );
};
