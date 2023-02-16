// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


import {contextBridge, ipcRenderer} from "electron";

contextBridge.exposeInMainWorld('electronApi', {
    getToken: () => ipcRenderer.invoke('get-cobalt'),
    checkToken: () => ipcRenderer.invoke('check'),
    fetchMonster: (monsterId: string) => ipcRenderer.invoke('monster', monsterId)
});