// src/stores/layoutStore.ts
import { create } from "zustand";
import type { BreadcrumbItem, PageConfig } from "../types";

export interface LayoutState extends Omit<PageConfig, "content" | "tocItems"> {
  setBreadcrumbItems: (items: BreadcrumbItem[]) => void;

  setRightPanelContent: (content: React.ReactNode | null) => void;

  rightPanelEnabled: boolean;
  setRightPanelEnabled: (enabled: boolean) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  breadcrumbItems: [],
  setBreadcrumbItems: (items) => set({ breadcrumbItems: items }),

  rightPanelContent: null,
  setRightPanelContent: (content) => set({ rightPanelContent: content }),

  rightPanelEnabled: false,
  setRightPanelEnabled: (enabled) => set({ rightPanelEnabled: enabled }),
}));
