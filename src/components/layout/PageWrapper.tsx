// src/components/layout/PageWrapper.tsx
import { useEffect } from "react";
import { useLayoutContext } from "../../context/useLayoutContext";
import type { PageConfig } from "../../types";

export const PageWrapper = ({
  breadcrumbItems,
  rightPanelTitle,
  rightPanelContent,
  content,
}: Omit<PageConfig, "tocItems">) => {
  const {
    setBreadcrumbItems,
    setRightPanelTitle,
    setRightPanelContent,
    setRightPanelEnabled,
  } = useLayoutContext();

  useEffect(() => {
    setBreadcrumbItems(breadcrumbItems);
    if (rightPanelTitle || rightPanelContent) {
      setRightPanelTitle(rightPanelTitle);
      setRightPanelContent(rightPanelContent);
      setRightPanelEnabled(true);
    } else {
      setRightPanelEnabled(false);
      setRightPanelContent(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{content}</>;
};
