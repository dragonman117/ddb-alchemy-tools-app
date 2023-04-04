import { UrlTools } from './urlTools'
import store, { StoreKeys } from './LocalStore'
import { GetTokenResponse } from '../models/AuthModels'
import moment from "moment";
import { DatetimeFormat } from "vue-i18n";

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
  await store.set(StoreKeys.jwtDateTime, moment().format())
}

export async function getAndCheckAuthToken(): Promise<string> {
  const token = await store.get(StoreKeys.jwtToken)
  const tokenDate = await store.get(StoreKeys.jwtDateTime)
  if (token && tokenDate) {
    const now = moment();
    const expires = moment(tokenDate).add(5, 'minutes');
    if (expires > now) {
      return token as string;
    }
  }
  await getAuth()
  return await store.get(StoreKeys.jwtToken) as string
}
