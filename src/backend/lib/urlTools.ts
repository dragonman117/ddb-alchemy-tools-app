export class UrlTools {
    private baseUrl = "https://character-service.dndbeyond.com/character/v5";
    private authUrl = "https://auth-service.dndbeyond.com/v1/cobalt-token";
    private monsterBaseUrl = "https://monster-service.dndbeyond.com/v1/Monster";

    private cobaltToken: string | null = null;
    private authToken: string | null = null;

    constructor() {
    }

    public getAuthUrl(): [string, object] {
        const header = {
            "Content-Type": "application/json",
            Cookie: `CobaltSession=${this.cobaltToken}`,
        };
        return [this.authUrl, header];
    }

    public setAuthToken(token: string) {
        this.authToken = token;
    }

    public setCobaltToken(token: string) {
        this.cobaltToken = token;
    }

    public getMonsterUrl(id: string): [string, object] {
        const header = {
            "Authorization" : `Bearer ${this.authToken}`,
        };
        return [`${this.monsterBaseUrl}?ids=${encodeURI(id)}`, header];
    }
}
