<template>
  <div
    class="overflow-hidden relative bg-white flex min-w-full items-center border-y border-stone-100 row-item"
  >
    <img class="absolute -left-4 w-24 h-24 rounded-full shadow-lg" :src="monster.avatarUrl" />
    <div class="w-20"> </div>
    <div class="p-4 grow">
      {{ monster.name }} <span class="legacy" v-if="monster.isLegacy">Legacy</span>
    </div>
    <div class="p-2 row-item">
      <div v-if="showAdd" class="button" @click="$emit('add')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
      <div v-else class="button" @click="$emit('remove')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { MonsterData } from '@/renderer/models/monsterModels'
export default defineComponent({
  name: 'MonsterItem',
  props: {
    monster: {
      type: Object as () => MonsterData,
      required: true
    },
    showAdd: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['add', 'remove']
})
</script>

<style scoped>
.row-item {
  min-height: 56px;
  height: 56px;
}
.legacy {
  @apply text-red-800 text-xs bg-stone-300 p-1 drop-shadow-sm rounded-sm;
}
</style>
