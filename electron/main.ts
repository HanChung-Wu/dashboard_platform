import { app, BrowserWindow } from "electron";
import path from "path";
import { isDevelopment } from "./utils.js";

app.on("ready", () => {
  console.log(`This platform is ${process.platform}`);

  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(app.getAppPath(), "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load the Vite dev server URL
  if (isDevelopment()) {
    mainWindow.loadURL("http://localhost:5173"); // Replace with your Vite dev server port
  } else {
    // Load the local file for production builds
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    console.log("App closed");
  }
});
