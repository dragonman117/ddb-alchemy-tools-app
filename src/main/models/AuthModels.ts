export interface GetTokenRequest {
  cobalt: string
}

export interface GetTokenResponse {
  token: string
  ttl: number
}
