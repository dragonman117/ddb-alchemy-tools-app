import { UrlTools } from './urlTools'
import store, { StoreKeys } from './LocalStore'
import { GetTokenResponse } from '../models/AuthModels'

export async function authTools(urlTool: UrlTools): Promise<any> {
  const [authUrl, authHeader] = urlTool.getAuthUrl()
  // eslint-disable-next-line no-undef
  const res = await fetch(authUrl, { method: 'POST', headers: authHeader as HeadersInit })
  return (await res.json()) as GetTokenResponse
}

export async function getAuth(): Promise<any> {
  const urlTool = new UrlTools()
  const cobalt = await store.get(StoreKeys.cobaltToken)
  urlTool.setCobaltToken(cobalt as string)
  const raw = await authTools(urlTool)
  await store.set(StoreKeys.jwtToken, raw.token)
}
