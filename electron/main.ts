import { app, BrowserWindow } from "electron";
import path from "path";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({});

  // Load the Vite dev server URL
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173"); // Replace with your Vite dev server port
  } else {
    // Load the local file for production builds
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
});
