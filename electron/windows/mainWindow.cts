import { BrowserWindow } from "electron";
import {
  indexHtmlPath,
  isDevelopment,
  localhost,
  preloadPath,
} from "../constants.cjs";

export const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      sandbox: true,
      preload: preloadPath,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load the Vite dev server URL
  if (isDevelopment) {
    mainWindow.loadURL(localhost); // Replace with your Vite dev server port
  } else {
    // Load the local file for production builds
    mainWindow.loadFile(indexHtmlPath);
  }

  // 開發時可以打開開發者工具
  mainWindow.webContents.openDevTools();
};
