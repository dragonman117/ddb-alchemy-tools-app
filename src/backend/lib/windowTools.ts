import {BrowserWindow, ipcMain} from "electron";
import {registerIPCChannels} from "./IpcCommunication";

export const createWindow = (url: string): BrowserWindow => {
    // Create the browser window.
    const window = new BrowserWindow({
        height: 600,
        width: 800,
    });

    // and load the index.html of the app.
    window.loadURL(url);

    // Open the DevTools.
    // window.webContents.openDevTools();
    return window;
};

export const createModalWindow = (url: string, parent: BrowserWindow): BrowserWindow => {
    // Create the browser window.
    const window = new BrowserWindow({
        height: 600,
        width: 800,
        parent: parent,
        modal: true,
        autoHideMenuBar: true
    });

    // and load the index.html of the app.
    window.loadURL(url);

    // Open the DevTools.
    // window.webContents.openDevTools();
    return window;
};