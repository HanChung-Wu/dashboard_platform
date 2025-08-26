import { create } from "zustand";
import { type ChartConfig } from "../types";

interface ChartStore {
  charts: ChartConfig[];
  addChart: (config: ChartConfig) => void;
  updateChart: (id: string, updates: Partial<ChartConfig>) => void;
  removeChart: (id: string) => void;
}

export const useChartStore = create<ChartStore>((set) => ({
  charts: [],
  addChart: (config) =>
    set((state) => ({ charts: [...state.charts, config] })),
  updateChart: (id, updates) =>
    set((state) => ({
      charts: state.charts.map((chart) =>
        chart.id === id ? { ...chart, ...updates } : chart
      ),
    })),
  removeChart: (id) =>
    set((state) => ({
      charts: state.charts.filter((chart) => chart.id !== id),
    })),
}));
