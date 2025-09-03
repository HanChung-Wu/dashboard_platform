// src/components/layout/PageWrapper.tsx
import { useEffect } from "react";
import { useLayoutContext } from "../../context/useLayoutContext";
import type { PageConfig } from "../../types";

export const PageWrapper = ({
  breadcrumbItems: breadcrumb,
  rightPanelContent: rightPanel,
  content,
}: Omit<PageConfig, "tocItems">) => {
  const {
    setBreadcrumbItems: setBreadcrumb,
    setRightPanelContent,
    setRightPanelEnabled,
  } = useLayoutContext();

  useEffect(() => {
    setBreadcrumb(breadcrumb);
    if (rightPanel) {
      setRightPanelContent(rightPanel);
      setRightPanelEnabled(true);
    } else {
      setRightPanelEnabled(false);
      setRightPanelContent(null);
    }
  }, []);

  return <>{content}</>;
};
