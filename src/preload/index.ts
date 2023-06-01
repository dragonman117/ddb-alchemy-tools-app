import { contextBridge, ipcRenderer } from 'electron'

// Whitelist of valid channels used for IPC communication (Send message from Renderer to Main)
const mainAvailChannels: string[] = [
  'getCobaltToken',
  'checkToken',
  'monsterFetch',
  'monsterSearch',
  'getAlchemyToken',
  'checkAlchemyToken'
]
const rendererAvailChannels: string[] = ['msgReceivedVersion']

contextBridge.exposeInMainWorld('mainApi', {
  send: async (channel: string, ...data: any[]) => {
    if (mainAvailChannels.includes(channel)) {
      // const res = ipcRenderer.send.apply(null, [channel, ...data])
      const res = await ipcRenderer.invoke(channel, ...data)
      return res
    } else {
      throw new Error(`Send failed: Unknown ipc channel name: ${channel}`)
    }
  },
  receive: (channel: string, cbFunc: Function): void => {
    if (rendererAvailChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => cbFunc(event, ...args))
    } else {
      throw new Error(`Receive failed: Unknown ipc channel name: ${channel}`)
    }
  },
  invoke: async (channel: string, ...data: any[]): Promise<any> => {
    if (mainAvailChannels.includes(channel)) {
      const result = await ipcRenderer.invoke.apply(null, [channel, ...data])
      return result
    }
    throw new Error(`Invoke failed: Unknown ipc channel name: ${channel}`)
  }
})
