<template>
  <navigation></navigation>
  <div class="flex grow bg-stone-50 m-2 drop-shadow-lg flex-col">
    <h2 class="p-2 text-2xl text-red-800 border-slate-500 border-b"> Debug </h2>
    <div class="flex flex-row p-2">
      <div class="flex font-bold min-w-fit">Cobalt Token: </div>
      <div class="flex break-words pl-2">{{ cobaltToken }}</div>
    </div>
    <div class="p-2">
      <div class="flex grow">
        <input
          class="w-full p-2 bg-gray-100 border-transparent"
          v-model="monster_url"
          placeholder="D&D Beyond Monster Url"
        />
        <div class="button ml-2">
          <span class="text-stone-50 px-4" @click="addMonsterFromUrl">Add</span>
        </div>
      </div>
    </div>
    <div class="flex grow p-2">
      <pre class="bg-gray-100 flex grow overflow-auto pre-max">{{ res }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navigation from '@/renderer/components/Navigation.vue'
import { MonsterData } from '@/main/models/MonsterModels'

export default defineComponent({
  name: 'DebugScreen',
  components: { Navigation },
  data() {
    return {
      cobaltToken: '',
      monster_url: '',
      res: ''
    }
  },
  methods: {
    async addMonsterFromUrl() {
      const monsterId = this.monster_url.split('/').slice(-1)[0].split('-')[0]
      // const raw: MonsterData = (await (window as any).electronApi.fetchMonster(monsterId)) as MonsterData;
      const raw: MonsterData = await window.mainApi.send('monsterFetch', monsterId)
      this.res = raw as any
      this.monster_url = ''
    }
  },
  async created() {
    this.cobaltToken = await window.mainApi.send('checkToken')
  }
})
</script>

<style scoped>
.pre-max {
  max-width: calc(100vw - 88px);
  max-height: calc(100vh - 206px);
}
</style>
