<template lang="pug">
  .text-blue.font-size-15.q-pt-xs(
    @click="click()"
  )
    svg.leftimg(width="9" height="17")
      use(xlink:href="go-back.svg#go-back")
    span {{ title }}
</template>

<script>
export default {
  name: 'HeaderLink',
  props: {
    title: {
      type: String,
      required: false
    },
    to: {
      type: String,
      required: false,
      default: ''
    },
    general: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    click () {
      if (this.general) {
        this.$router.go(-1)
      } else {
        if (this.to !== '') {
          this.$router.push(this.to)
        }
        if (this.$listeners.click) {
          this.$emit('click')
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .leftimg {
    float:left; /* Выравнивание по левому краю */
    margin: 1px 7px 7px 0; /* Отступы вокруг картинки */
   }
</style>
