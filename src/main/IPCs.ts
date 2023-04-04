import { BrowserWindow, ipcMain } from 'electron'
import { createModalWindow } from './utils/WindowTools'
import store, { StoreKeys } from './utils/LocalStore'
import { UrlTools } from './utils/UrlTools'
import { getAndCheckAuthToken } from './utils/AuthTools'
import { bulkMonsterFetch, monsterFetch } from './utils/MonsterFetch'
import { MonsterData } from '@/main/models/MonsterModels'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/*
 * IPC Communications
 * */
export default class IPCs {
  static initialize(window: BrowserWindow): void {
    // Get The Cobalt Token
    ipcMain.handle('getCobaltToken', (event, args) => {
      const win = createModalWindow(
        'https://www.dndbeyond.com/sign-in?returnUrl=https://www.dndbeyond.com/',
        window
      )
      return new Promise<void>((resolve) => {
        win.webContents.on('will-navigate', async (event, url) => {
          const dndBeyond = /^https:\/\/www.dndbeyond.com/
          const googleCallback = /^https:\/\/www.dndbeyond.com\/google-login-callback/
          const appleLogin = /^https:\/\/www.dndbeyond.com\/oauth-apple-login/
          const wizardsLogin = /^https:\/\/www.dndbeyond.com\/oauth-wizards-login/
          const wizardsCallback = /^https:\/\/www.dndbeyond.com\/oauth-wizards-callback/
          if (dndBeyond.test(url)) {
            if (appleLogin.test(url) || wizardsLogin.test(url)) {
              return
            }
            win.hide()
            if (googleCallback.test(url) || wizardsCallback.test(url)) {
              await delay(1000)
            }
            const token = (
              (await win.webContents.session.cookies.get({
                url: 'https://www.dndbeyond.com',
                name: 'CobaltSession'
              })) as any
            ).pop().value
            if (token === undefined) {
              await win.loadURL(
                'https://www.dndbeyond.com/sign-in?returnUrl=https://www.dndbeyond.com/'
              )
              win.show()
              return
            }
            if (token !== undefined) {
              await store.set(StoreKeys.cobaltToken, token)
            }
            await delay(1000)
            win.close()
            resolve()
          }
        })
      })
    })

    // Check the cobalt token
    ipcMain.handle('checkToken', (event, args) => {
      const token = store.get(StoreKeys.cobaltToken)
      if (token) {
        return token
      }
      return null
    })

    // Fetch a single monster
    ipcMain.handle('monsterFetch', async (event, args) => {
      // eslint-disable-next-line no-unused-vars
      const urlTools = new UrlTools()
      const token = await getAndCheckAuthToken()
      urlTools.setAuthToken(token as string)
      const fetchRes = await monsterFetch(args, urlTools)
      if (fetchRes == null) {
        return null
      }
      return fetchRes.data[0] as MonsterData
    })

    // Search Monsters with paging
    ipcMain.handle('monsterSearch', async (event, args) => {
      const urlTools = new UrlTools()
      const token = await getAndCheckAuthToken()
      urlTools.setAuthToken(token as string)
      return await bulkMonsterFetch(args[1], args[2], args[0], urlTools)
    })
  }
}
