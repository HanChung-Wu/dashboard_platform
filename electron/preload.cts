console.log("Preload script loaded");
import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("api", {
  getNames: () => ipcRenderer.invoke("getNames"),
  addUser: (name: string, email: string) =>
    ipcRenderer.invoke("addUser", name, email),
});
console.log("Preload script end");
