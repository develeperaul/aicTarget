<template lang="pug">
  //- q-icon(
  //-   name="svguse:web-settings.svg#web-settings|0 0 35 35"
  //- )
  div
    inline-svg(width="30" height="20" :src="menu ? require('assets/web-settings.svg') : require('assets/web-settings.svg')")
    q-menu(
      v-model="menu"
      transition-show="jump-down"
      transition-hide="jump-up"
      anchor="top end"
      self="bottom right"
    )
      slot
</template>
<script>
export default {
  name: 'HeaderSettings',
  data: () => ({
    menu: false
  })
}
</script>
<style scoped>
</style>
