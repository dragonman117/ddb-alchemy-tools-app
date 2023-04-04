import { UrlTools } from './UrlTools'
import { MonsterData } from '../models/MonsterModels'

export async function monsterFetch(id: string, urlTool: UrlTools): Promise<any | null> {
  const [monsterUrl, monsterHeader] = urlTool.getMonsterUrl(id)
  // eslint-disable-next-line no-undef
  const res = await fetch(monsterUrl, { method: 'GET', headers: monsterHeader as HeadersInit })
  if (res.status === 200) {
    const data = await res.json()
    return data
  } else return null
}

export async function bulkMonsterFetch(
  skip: number,
  take: number,
  search: string,
  urlTool: UrlTools
): Promise<any | null> {
  const [monsterUrl, monsterHeader] = urlTool.getMonsterSearchUrl(skip, take, search)
  // eslint-disable-next-line no-undef
  const res = await fetch(new URL(monsterUrl as string), {
    method: 'GET',
    headers: monsterHeader as HeadersInit
  })
  if (res.status === 200) return await res.json()
  else return null
}
