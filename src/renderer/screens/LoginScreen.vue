<template>
  <div class="flex flex-row place-content-center grow bg-stone-800 content-center items-center">
    <div
      class="flex flex-col content-center self-center w-64 items-center bg-slate-100 drop-shadow-xl mx-2"
    >
      <div
        class="w-full p-2 border-b-2 border-b-red-900 grow flex content-center place-content-center"
      >
        <h2 class="text-2xl">D&D Beyond Login</h2>
      </div>
      <div class="p-4 h-40">
        <p
          >In order to access your purchased content from D&D Beyond please use the button below to
          login to your account.</p
        >
      </div>
      <div class="p-2 border-t-2 border-t-red-900 w-full" v-if="!dndBeyond">
        <div class="button" @click="login()">Login</div>
      </div>
      <div class="p-2 border-t-2 border-t-red-900 w-full" v-if="dndBeyond">
        <div class="button-green">Valid</div>
      </div>
    </div>
    <div
      class="flex flex-col content-center self-center w-64 items-center bg-slate-100 drop-shadow-xl mx-2"
    >
      <div
        class="w-full p-2 border-b-2 border-b-red-900 grow flex content-center place-content-center"
      >
        <h2 class="text-2xl">Alchemy Login</h2>
      </div>
      <div class="p-4 h-40">
        <p
        >In order to submit content on your behalf to Alchemy use the button below to login to your Alchemy account. Close the window when finished.</p
        >
      </div>
      <div class="p-2 border-t-2 border-t-red-900 w-full" v-if="!alchemyToken">
        <div class="button" @click="loginAlchemy()">Login</div>
      </div>
      <div class="p-2 border-t-2 border-t-red-900 w-full" v-if="alchemyToken">
        <div class="button-green">Valid</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginScreen',
  data() {
    return {
      dndBeyond: false,
      alchemyToken: false
    }
  },
  async mounted() {
    await this.checkStatus()
  },
  methods: {
    async login() {
      await window.mainApi.send('getCobaltToken')
      await this.checkStatus()
    },
    async loginAlchemy() {
      await window.mainApi.send('getAlchemyToken')
      await this.checkStatus()
    },
    async checkStatus(){
      this.dndBeyond = (await window.mainApi.send('checkToken')) !== null;
      this.alchemyToken = (await window.mainApi.send('checkAlchemyToken')) !== null;
      if(this.dndBeyond && this.alchemyToken){
        this.$router.push({ path: '/' })
      }
    }
  }
})
</script>

<style scoped>
.button-green {
  @apply bg-green-800 text-stone-50 p-2 flex content-center place-content-center drop-shadow-md select-none;
  user-select: none;
}
</style>
