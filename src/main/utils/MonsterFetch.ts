import { UrlTools } from './UrlTools'
import { MonsterData } from '../models/MonsterModels'

export async function monsterFetch(id: string, urlTool: UrlTools): Promise<any | null> {
  const [monsterUrl, monsterHeader] = urlTool.getMonsterUrl(id)
  // eslint-disable-next-line no-undef
  const res = await fetch(monsterUrl, { method: 'GET', headers: monsterHeader as HeadersInit })
  if (res.status === 200) return (await res.json()).data[0] as MonsterData
  else return null
}
