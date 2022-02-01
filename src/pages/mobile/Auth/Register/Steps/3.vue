<template lang="pug">
  div
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            v-if="section === 1"
            title="Работа с прилож..."
            @click="$emit('back')"
          )
          header-link(
            v-else-if="backSection"
            :title="`${backSection} шаг`"
            @click="section = backSection; backSection = null"
          )
          header-link(
            v-else
            :title="`${section - 1} шаг`"
            @click="back()"
          )
          .text-weight-bold
            router-link.text-blue.q-ml-sm.font-size-15(tag="span" to="/auth") Выйти
    q-item
      q-item-section
        q-item-label
          div.text-h4.text-weight-bolder.text-left
            | Загрузка фото документов
    component(
      :is="`register-step-3-section-${section}`"
      @next="next()"
      @next-native="nextNative"
      @back-native="backNative"
      @back="back()"
    )
</template>
<script>
import components from './Step3/index'

export default {
  components: components,
  props: ['section-stored'],
  data: () => ({
    section: 1,
    backSection: null,
    maxSection: 10
  }),
  mounted () {
    if (this.sectionStored) {
      this.section = this.sectionStored
    }
  },
  methods: {
    next () {
      this.section++
      this.backSection = null
    },
    nextNative (step, back) {
      this.backSection = back || null
      this.$emit('next-native', step)
    },
    sectionChange (section) {
      this.section = section
    },
    back () {
      this.section--
      this.backSection = null
    },
    backNative () {

    }
  }
}
</script>
