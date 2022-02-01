<template lang="pug">
  q-input(
    outlined
    bg-color="grey-2"
    v-model="search"
    label="Поиск"
    color="red"
    style="width: 490px"
  )
</template>
<script>
export default {
  data: () => ({
    search: null
  }),
  watch: {
    search () {
      this.$root.$emit('header-search', this.search)
    }
  }
}
</script>
