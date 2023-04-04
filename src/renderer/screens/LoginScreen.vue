<template>
  <div class="flex flex-col place-content-center grow bg-stone-800 content-center items-center ">
    <div class="flex flex-col content-center self-center w-64 items-center bg-slate-100 drop-shadow-xl">
      <div class="w-full p-2 border-b-2 border-b-red-900 grow flex content-center place-content-center">
        <h2 class="text-2xl">Login</h2>
      </div>
      <div class="p-4">
        <p>In order to access your purchased content from D&D Beyond please use the button below to login to your account.</p>
      </div>
      <div class="p-2 border-t-2 border-t-red-900 w-full">
        <div class="button" @click="login()">Login</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginScreen",
  methods:{
    async login() {
      await window.mainApi.send("getCobaltToken");
      this.$router.push({ path: "/" });
    },
  },
})
</script>

<style scoped>

</style>
