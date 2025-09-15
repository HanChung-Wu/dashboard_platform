// src/context/LayoutContext.tsx
import { createContext } from "react";
import type { LayoutState } from "../stores/layoutStore";

export interface LayoutContextType extends LayoutState {
  toggleRightPanelEnabled: () => void;
}

export const LayoutContext = createContext<LayoutContextType | undefined>(
  undefined
);
