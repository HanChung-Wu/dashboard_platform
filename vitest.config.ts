import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true, // 啟用全域測試的 API，避免每次都需要 import
      environment: "jsdom", // 模擬瀏覽器環境來運行測試
      setupFiles: "./src/vitest.setup.ts", // 你的初始化檔案，用來設置測試環境
      browser: {
        enabled: true,
        provider: "playwright",
        instances: [{ browser: "chromium" }],
      },
    },
  })
);
