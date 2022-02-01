<template lang="pug">
  q-icon(
    name="mdi-account"
    size="29px"
    :class="menu ? 'text-primary' : 'text-grey' "
  )
    q-menu(
      v-model="menu"
      transition-show="jump-down"
      transition-hide="jump-up"
      :offset="[0, 10]"
    )
      slot
</template>
<script>
export default {
  name: 'HeaderAvatar',
  data: () => ({
    menu: false
  })
}
</script>
<style scoped>

</style>
