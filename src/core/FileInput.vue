<template>
  <input ref="input" class="file-input" type="file" @change="onChange" v-on="$listeners"/>
</template>

<script>
export default {
  mounted () {
    this.files = this.$refs.input.files
  },
  data () {
    return {
      files: null
    }
  },
  methods: {
    onChange () {
      this.files = this.$refs.input.files
    },
    click () {
      if (!this.$refs.input) return
      return this.$refs.input.click()
    }
  }
}
</script>

<style scoped lang="scss">
.file-input {
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0;
}
</style>
