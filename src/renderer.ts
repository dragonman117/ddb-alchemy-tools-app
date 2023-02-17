import './index.css';
import {monsterParse} from "./shared/lib/monsterTools";

(async function(){
    let callback: null | any = null;
    const existingCobalt = await (window as any).electronApi.checkToken();
    document.getElementById('getToken').addEventListener('click', async () => {
        await (window as any).electronApi.getToken();
        document.getElementById('dnd-beyond-login').style.display = 'none';
        document.getElementById('monster-download').style.display = 'flex';
    });
    document.getElementById('fetch').addEventListener('click', async () => {
        document.getElementById('loader').style.display = 'block';
        callback = setTimeout(() => {
            document.getElementById('error').style.display = 'block';
        }, 30000)
        const monsterUrl = (document.getElementById('monster') as HTMLInputElement).value;
        const monsterId = monsterUrl.split("/").slice(-1)[0].split("-")[0];
        const res = await (window as any).electronApi.fetchMonster(monsterId);
        clearTimeout(callback);
        callback = null;
        console.log(res);
        //parse
        const parsed = monsterParse(res);
        document.getElementById('loader').style.display = 'none';
        //Download Result
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(parsed));
        const dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href",     dataStr     );
        dlAnchorElem.setAttribute("download", `${parsed.name}-${monsterId}.json`);
        dlAnchorElem.click();
    });
    if (existingCobalt) {
        document.getElementById('monster-download').style.display = 'flex';
    } else {
        document.getElementById('dnd-beyond-login').style.display = 'flex';
    }
})();