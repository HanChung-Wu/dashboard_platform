// src/stores/layoutStore.ts
import { create } from "zustand";
import type { BreadcrumbItem, PageConfig, TocItem } from "../types";

export interface LayoutState extends Omit<PageConfig, "content"> {
  setTocItems: (items: TocItem[]) => void;

  setBreadcrumbItems: (items: BreadcrumbItem[]) => void;

  setRightPanelContent: (content: React.ReactNode | null) => void;

  rightPanelEnabled: boolean;
  setRightPanelEnabled: (enabled: boolean) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  tocItems: [],
  setTocItems: (items) => set({ tocItems: items }),

  breadcrumbItems: [],
  setBreadcrumbItems: (items) => set({ breadcrumbItems: items }),

  rightPanelContent: null,
  setRightPanelContent: (content) => set({ rightPanelContent: content }),

  rightPanelEnabled: false,
  setRightPanelEnabled: (enabled) => set({ rightPanelEnabled: enabled }),
}));
