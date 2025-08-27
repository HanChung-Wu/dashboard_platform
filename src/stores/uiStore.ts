// stores/uiStore.ts
import { create } from "zustand";

interface UIState {
  rightPanelVisible: boolean;
  toggleRightPanel: (visible: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  rightPanelVisible: false,
  toggleRightPanel: (visible) => set({ rightPanelVisible: visible }),
}));
