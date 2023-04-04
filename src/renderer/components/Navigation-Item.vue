<template>
<router-link class="relative overflow-hidden cursor-pointer group hover:overflow-visible focus-visible:outline-none h-14 hover:bg-stone-800" v-bind:to="link" >
  <div class="p-1">
    <svg width="100%" height="100%" class="icon" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" v-html="icon"></svg>
  </div>

  <span role="tooltip" class="tooltip-right">
    {{name}}
  </span>
</router-link>
</template>

<script>
export default {
  name: "Navigation-Item",
  props: {
    name: String,
    icon: String,
    link: String,
  }
}
</script>

<style scoped>
svg{
  @apply fill-stone-50
}
.router-link-active{
  @apply border-l-4 border-red-900
}
</style>