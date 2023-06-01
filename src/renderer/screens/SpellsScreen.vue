<template>
  <navigation></navigation>
  <div class="flex flex-row place-content-center grow bg-stone-300">
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navigation from "@/renderer/components/Navigation.vue";

export default defineComponent({
  name: "SpellsScreen",
  components: { Navigation }
});
</script>

<style scoped>

</style>
