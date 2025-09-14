import { app } from "electron";
import path from "path";
const userDataPath = app.getPath("userData");
const appPath = app.getAppPath();
const isDevelopment: boolean = process.env.NODE_ENV === "development";
const preloadPath = path.join(appPath, "dist-electron", "preload.cjs");
const indexHtmlPath = path.join(appPath, "dist-react", "index.html");
const localhost = "http://localhost:5173"; // Replace with your Vite dev server port

export { userDataPath, isDevelopment, preloadPath, indexHtmlPath, localhost };
