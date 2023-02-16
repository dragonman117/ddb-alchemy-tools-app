import {createModalWindow} from "./windowTools";
import store, {StoreKeys} from "./LocalStore";
import {UrlTools} from "./urlTools";
import {getAuth} from "./authTools";
import {monsterParse, monsterTools} from "./monsterTools";


export function registerIPCChannels(ipc: Electron.IpcMain, mainWindow: Electron.BrowserWindow) {
    ipc.handle('get-cobalt',(event, args) => {
        const win  = createModalWindow("https://www.dndbeyond.com/sign-in?returnUrl=https://www.dndbeyond.com", mainWindow);
        return new Promise<void>((resolve) => {
            win.webContents.on('will-navigate', async (event, url) => {
                if (url.split('?')[0] == "https://www.dndbeyond.com/login-callback"){
                    win.hide(); // hides the window on initial re-direct
                }
                if (url == "https://www.dndbeyond.com/"){
                    const token = await win.webContents.session.cookies.get({url: 'https://www.dndbeyond.com', name: 'CobaltSession'});
                    store.set(StoreKeys.cobaltToken, token.pop().value);
                    win.hide(); // ensure window is hidden we no longer want to look at dnd beyond :)
                    win.close();
                    resolve();
                }
            });
        });
    });

    ipc.handle('check', (event, args) => {
        const token = store.get(StoreKeys.cobaltToken);
        if (token){
            return token;
        }
        return null;
    });

    ipc.handle('monster', async (event, args) => {
        console.log(args);
        const urlTools = new UrlTools();
        const token = await store.get(StoreKeys.jwtToken);
        if (!token) {
            await getAuth();
        }
        urlTools.setAuthToken(token as string);
        const fetchRes = await monsterTools(args, urlTools);
        return monsterParse(fetchRes);
    });
}

