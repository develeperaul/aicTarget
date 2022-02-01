<template lang="pug">
  q-btn.q-py-sm.text-weight-550.pd(
    :class="{'full-width': mode !== 'web'}"
    no-caps
    color="grey-1"
    disable
  )
    slot(name="first")
    slot(default)
    slot(name="last")
</template>

<script>
export default {
  name: 'InactiveButton',
  props: {
    label: {
      type: String,
      required: false
    }
  },
  computed: {
    mode () {
      return process.env.TYPE
    }
  }
}
</script>
<style scoped lang="scss">
  .pd {
  padding-top: 6.145px;
  padding-bottom: 6.145px;
}
</style>
