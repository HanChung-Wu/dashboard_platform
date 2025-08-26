import { create } from "zustand";
import { type DataSource } from "../types";

interface DataState {
  dataCache: Record<string, any[]>;
  loading: Record<string, boolean>;
  error: Record<string, string | null>;
  timers: Record<string, number>; // 存放 setInterval ID
  fetchData: (ds: DataSource) => Promise<void>;
}

export const useDataStore = create<DataState>((set, get) => ({
  dataCache: {},
  loading: {},
  error: {},
  timers: {},
  fetchData: async (ds: DataSource) => {
    const { timers } = get();

    // 如果已經在 polling，就直接回傳
    if (timers[ds.id]) return;

    const load = async () => {
      set((state) => ({
        loading: { ...state.loading, [ds.id]: true },
        error: { ...state.error, [ds.id]: null },
      }));

      try {
        const res = await fetch(ds.url + `?t=${Date.now()}`); // 加 timestamp 防快取
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        set((state) => ({
          dataCache: { ...state.dataCache, [ds.id]: json },
          loading: { ...state.loading, [ds.id]: false },
        }));
      } catch (err: any) {
        set((state) => ({
          error: { ...state.error, [ds.id]: err.message },
          loading: { ...state.loading, [ds.id]: false },
        }));
      }
    };

    // 立即載入一次
    await load();

    // 如果有 refreshInterval，就啟動輪詢
    if (ds.refreshInterval) {
      const timerId = window.setInterval(load, ds.refreshInterval);
      set((state) => ({
        timers: { ...state.timers, [ds.id]: timerId },
      }));
    }
  },
}));
