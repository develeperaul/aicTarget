<template lang="pug">
  q-page.wrapper
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Назад"
            to="/home/merchant/training-testing"
          )
          header-settings
            q-list(style="width: 239px")
              q-item(clickable)
                q-item-section(no-wrap)
                  router-link.col.q-pt-sm(
                    tag="span"
                    :to="{ name: 'merchant-info' }"
                  ) Изменить личные данные
              q-item.q-pl-sm(clickable)
                q-item-section.text-red-2
                  q-btn(
                    no-caps
                    align="left"
                    dense
                    @click="dialog.open = true"
                  )
                    .q-pl-xs Выйти
    q-item
      q-item-section
        q-item-label
          .text-h4.text-weight-bolder.q-mb-md
            | Обучающие материалы и тесты
    q-item
      q-item-section
        q-item-label(style="height: 45px")
          .bg-grey-2.border-radius-10.row.justify-between.items-center.no-wrap.q-pa-xs(
          )
            q-btn.full-width.font-size-15.text-no-wrap(
              padding=""
              no-caps
              :class="{ 'bg-white shadow-2': currentIsActive }"
              @click="selectCurrent()"
            ) Материалы
            q-btn.full-width.font-size-15.text-no-wrap(
              padding=""
              no-caps
              :class="{ 'bg-white shadow-2': testingIsActive }"
              @click="selectTesting()"
            ) Тестирования
    transition(
      :enter-active-class="`animated ${enterSlide}`"
      :leave-active-class="`animated ${leaveSlide}`"
      mode="out-in"
    )
      component(
        :is="`tutorial-${tab}`"
      )
    q-dialog(
      content-class="q-dialog-padding-fixed"
      v-model="dialog.open"
      persistant
    )
      q-card.full-width
        q-card-section
          q-item.q-px-xs
            q-item-section
              q-item-label
                .text-h6.text-center.text-weight-bold.q-mt-md Выход
                .text-grey.q-my-md.text-center.text-body1 Вы действительно хотите выйти из учетной записи?
                OriginalButton.q-mt-sm.full-width(
                  @click="logOut()"
                ) Да, хочу выйти
                OriginalButton.q-mt-sm.full-width.text-red-2(
                  @click="dialog.open = false"
                ) Отмена
</template>
<script>
import components from './index'
import HeaderSettings from 'components/HeaderSettings'

export default {
  props: [
    'openTab'
  ],
  components: { ...components, HeaderSettings },
  data: () => ({
    tab: 'current',
    enterSlide: 'slideInLeft',
    leaveSlide: 'slideOutRight',
    currentIsActive: true,
    testingIsActive: false,
    dialog: {
      open: false
    }
  }),
  watch: {
    tab () {
      if (this.tab === 'current') {
        this.enterSlide = 'slideInLeft'
        this.leaveSlide = 'slideOutRight'
      } else if (this.tab === 'testing') {
        this.enterSlide = 'slideInRight'
        this.leaveSlide = 'slideOutLeft'
      }
    }
  },
  mounted () {
    if (this.openTab && this.openTab === 'testings') {
      this.$nextTick(() => {
        this.selectTesting()
      })
    }
  },
  methods: {
    logOut () {
      this.$q.localStorage.remove('token')
      this.$router.push('/auth')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
    turnOn (button) {
      if (button === 'current') {
        this.currentIsActive = true
        this.testingIsActive = false
      } else if (button === 'testing') {
        this.testingIsActive = true
        this.currentIsActive = false
      }
    },
    selectCurrent () {
      this.tab = 'current'
      this.turnOn('current')
    },
    selectTesting () {
      this.tab = 'testing'
      this.turnOn('testing')
    }
  }
}
</script>
<style lang="scss">
.border-radius-10 {
  border-radius: 10px;
}
.click-menu {
  height: 30px;
}
</style>
