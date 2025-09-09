import { app, BrowserWindow } from "electron";
import path from "path";
import { isDevelopment } from "./utils.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({});

  // Load the Vite dev server URL
  if (isDevelopment()) {
    mainWindow.loadURL("http://localhost:5173"); // Replace with your Vite dev server port
  } else {
    // Load the local file for production builds
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
});
