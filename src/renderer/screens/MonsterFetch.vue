<template>
  <navigation></navigation>
  <div class="flex flex-row place-content-center grow bg-stone-300">
    <div class="flex flex-col grow m-2 bg-stone-50 drop-shadow-lg">
      <div class="flex flex-row bg-stone-700 p-2 place-content-center">
        <h1 class="text-stone-50 text-lg">D&D Beyond Monsters</h1>
      </div>
      <div class="flex flex-row bg-stone-700 p-2">
        <div class="flex grow">
          <input class="w-full p-2 bg-gray-100 border-transparent" placeholder="Search Monsters" v-model="search_url" @keyup.enter="searchMonsters"/>
        </div>
        <div class="button ml-2 ">
          <span class="text-stone-50 px-4" @click="searchMonsters">Search</span>
        </div>
      </div>
      <div class="flex flex-col overflow-auto altHeight">
        <div class="loader" v-if="loading">Loading...</div>
        <monster-item v-for="monster in searchedMonsters" :key="monster.name" :monster="monster" :show-add="true" @add="addHit(monster)" />
      </div>
      <div class="flex flex-row grow bg-stone-700 p-2 place-content-center content-center justify-center">
        <div class="stone-button p-1 px-3 mx-2 z-10" v-if="(current_page - 1) > 0" @click="loadPage(current_page -1)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </div>
        <div class="stone-button p-1 px-5 mx-2 w-10 z-10" v-if="(current_page - 2) > 0" @click="loadPage(current_page -2)">
          {{current_page - 2}}
        </div>
        <div class="stone-button p-1 px-5 mx-2 w-10 z-10" v-if="(current_page -1) > 0" @click="loadPage(current_page -1)">
          {{current_page - 1}}
        </div>
        <div class="px-5 mx-2 w-4 w-10 flex flex-row place-content-center content-center items-center text-white" v-if="current_page > 0">
          {{current_page}}
        </div>
        <div class="stone-button p-1 px-5 mx-2 w-10 z-10" v-if="(current_page + 1) <= total_pages" @click="loadPage(current_page + 1)">
          {{current_page + 1}}
        </div>
        <div class="stone-button p-1 px-5 mx-2 w-10 z-10" v-if="(current_page + 2) <= total_pages" @click="loadPage(current_page - 2)">
          {{current_page + 2}}
        </div>
        <div class="stone-button p-1 px-3 mx-2 z-10" v-if="(current_page + 1) <= total_pages" @click="loadPage(current_page + 1)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </div>
      </div>
    </div>
    <div class="flex flex-col grow m-2 bg-stone-50 drop-shadow-lg max-w-md max-h-screen">
      <div class="flex flex-row bg-stone-700 p-2 place-content-center">
        <h1 class="text-stone-50 text-lg">Alchemy Import List</h1>
      </div>
      <div class="flex flex-col overflow-auto add-content" :class="{ altHeight:url_import_visible }">
        <div class="flex flex-col absolute w-full h-full z-30 add-content bg-stone-50 opacity-70 place-content-center" :class="{ altHeight:url_import_visible }" v-if="generating">
          <div class="loader absolute" >Building...</div>
          <div class="text-center p-3">Generating JSON</div>
        </div>
        <monster-item v-for="(monster, index) in selectedMonsters" :key="monster.name" :monster="monster" @remove="removeHit(index)" />
      </div>
      <div class="flex flex-row bg-stone-700 p-2" v-show="url_import_visible">
        <div class="flex grow">
          <input class="w-full p-2 bg-gray-100 border-transparent" v-model="monster_url" placeholder="D&D Beyond Monster Url"/>
        </div>
        <div class="button ml-2 ">
          <span class="text-stone-50 px-4" @click="addMonsterFromUrl">Add</span>
        </div>
      </div>
      <div class="flex flex-row bg-stone-700 p-2 place-content-center">
        <div class="stone-button has-tooltip z-10" v-show="!url_import_visible" @click="showUrlImport()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          <div class="tooltip bottom-12 bg-stone-800 p-2 w-24 text-stone-50 text-xs flex place-content-center rounded-md">Add By Url</div>
        </div>
        <div class="stone-button z-10" v-show="url_import_visible" @click="hideUrlImport()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        <div class="button flex grow ml-2" @click="generate()">
          <span class="text-stone-50 px-4" >Generate</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MonsterData } from "@/main/models/MonsterModels";
import Navigation from "@/renderer/components/Navigation.vue";
import MonsterItem from "@/renderer/components/Monster-Item.vue";
import { monsterParse } from "@/renderer/services/MonsterService";

export default defineComponent({
  name: "MonsterFetch",
  components: { MonsterItem, Navigation },
  data() {
    return {
      monster_url: "",
      search_url: "",
      pagination: null,
      current_page: 0,
      total_pages: 0,
      loading: false,
      generating: false,
      url_import_visible: false,
      selectedMonsters: [] as Array<MonsterData>,
      searchedMonsters: [] as Array<MonsterData>,
    };
  },
  methods: {
    showUrlImport() {
      this.url_import_visible = true;
    },
    hideUrlImport() {
      this.url_import_visible = false;
    },
    removeHit(index:number) {
      this.selectedMonsters.splice(index, 1);
    },
    addHit(monster: MonsterData){
      this.selectedMonsters.push(monster);
    },
    async addMonsterFromUrl() {
      const monsterId = this.monster_url.split("/").slice(-1)[0].split("-")[0];
      // const raw: MonsterData = (await (window as any).electronApi.fetchMonster(monsterId)) as MonsterData;
      const raw: MonsterData = await window.mainApi.send("monsterFetch", monsterId);
      this.selectedMonsters.push(raw);
      this.monster_url = "";
    },
    async searchMonsters(){
      this.searchedMonsters = [];
      this.loading = true;
      const res = await window.mainApi.send("monsterSearch", [this.search_url, 0, 50]);
      this.loading = false;
      this.searchedMonsters = res.data;
      this.pagination = res.pagination;
      this.total_pages = Math.ceil((this.pagination as any).total / 50);
      this.current_page = 1;
    },
    async loadPage(pg:number){
      this.searchedMonsters = [];
      this.loading = true;
      const res = await window.mainApi.send('monsterSearch', [this.search_url, (pg -1) * 50, 50, true]);
      this.loading = false;
      this.searchedMonsters = res.data;
      this.current_page = pg;
    },
    async generate(){
      this.generating = true;
      const parsed = await Promise.all(this.selectedMonsters.map(async x => {
        const monster =(await window.mainApi.send("monsterFetch", x.id)) as MonsterData
        return monsterParse(monster);
      }));
      if (parsed.length === 0){
        this.generating = false;
        return;
      }
      const final = {
        "characters": parsed,
      }
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(final));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", "monsters.json");
      downloadAnchorNode.click();
      this.selectedMonsters = [];
      this.generating = false;
    }
  },
});
</script>

<style scoped>
.stone-button{
  @apply px-2 bg-stone-500 flex flex-row place-content-center content-center items-center hover:bg-stone-600 cursor-pointer;
}
.add-content{
  max-height: calc(100vh - 116px);
  min-height: calc(100vh - 116px);
  height: calc(100vh - 116px);
}

.altHeight{
  max-height: calc(100vh - 172px);
  min-height: calc(100vh - 172px);
  height: calc(100vh - 172px);
}

.loader,
.loader:before,
.loader:after {
  @apply bg-stone-600;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.loader {
  @apply text-stone-600;
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: '';
}
.loader:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 1.5em;
}
@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}

</style>
