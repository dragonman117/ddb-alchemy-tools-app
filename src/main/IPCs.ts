import { BrowserWindow, ipcMain, shell } from 'electron'
import Constants from './utils/Constants'
import { createModalWindow } from './utils/WindowTools'
import store, { StoreKeys } from './utils/LocalStore'
import { UrlTools } from './utils/UrlTools'
import { getAuth } from './utils/AuthTools'
import { monsterFetch } from './utils/MonsterFetch'

/*
 * IPC Communications
 * */
export default class IPCs {
  static initialize(window: BrowserWindow): void {
    // Get application version
    ipcMain.on('msgRequestGetVersion', () => {
      window.webContents.send('msgReceivedVersion', Constants.APP_VERSION)
    })

    // Open url via web browser
    ipcMain.on('msgOpenExternalLink', async (event, url: string) => {
      await shell.openExternal(url)
    })

    // Get The Cobalt Token
    ipcMain.on('getCobaltToken', (event, args) => {
      const win = createModalWindow(
        'https://www.dndbeyond.com/sign-in?returnUrl=https://www.dndbeyond.com',
        window
      )
      return new Promise<void>((resolve) => {
        win.webContents.on('will-navigate', async (event, url) => {
          if (url.split('?')[0] === 'https://www.dndbeyond.com/login-callback') {
            win.hide() // hides the window on initial re-direct
          }
          if (url === 'https://www.dndbeyond.com/') {
            const token = await win.webContents.session.cookies.get({
              url: 'https://www.dndbeyond.com',
              name: 'CobaltSession'
            })
            store.set(StoreKeys.cobaltToken, (token as any).pop().value)
            win.hide() // ensure window is hidden we no longer want to look at dnd beyond :)
            win.close()
            resolve()
          }
        })
      })
    })

    // Check the cobalt token
    ipcMain.on('checkToken', (event, args) => {
      const token = store.get(StoreKeys.cobaltToken)
      if (token) {
        return token
      }
      return null
    })

    // Fetch a single monster
    ipcMain.on('monsterFetch', async (event, args) => {
      console.log(args)
      // eslint-disable-next-line no-unused-vars
      const urlTools = new UrlTools()
      const token = await store.get(StoreKeys.jwtToken)
      if (!token) {
        await getAuth()
      }
      urlTools.setAuthToken(token as string)
      const fetchRes = await monsterFetch(args, urlTools)
      if (fetchRes == null) {
        return null
      }
      return fetchRes
    })
  }
}
