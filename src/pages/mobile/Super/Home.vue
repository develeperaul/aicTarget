<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label
          .row.justify-between
            .text-h6.text-weight-bolder.text-left(class="morphable-title")
              div Добрый день,
              div {{ userInfo.firstname }}!
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
          .bg-grey-2.border-radius-10.row.justify-between.items-center.no-wrap.q-pa-xs(
          )
            q-btn.full-width.font-size-15(
              padding="xs lg"
              no-caps
              label="Актуальные"
              :class="{ 'bg-white': actualIsActive }"
              @click="selectActual()"
            )
            q-btn.full-width.font-size-15(
              text-color="red"
              padding="xs lg"
              no-caps
              label="Удаленные"
              :class="{ 'bg-white': deletedIsActive }"
              @click="selectDeleted()"
            )
    transition(
      :enter-active-class="`animated ${enterSlide}`"
      :leave-active-class="`animated ${leaveSlide}`"
      mode="out-in"
    )
      component(
        :is="`super-${tab}`"
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
import OriginalButton from 'components/OriginalButton'

export default {
  components: { ...components, HeaderSettings, OriginalButton },
  data: () => ({
    dialog: {
      open: false
    },
    tab: 'actual',
    enterSlide: 'slideInLeft',
    leaveSlide: 'slideOutRight',
    actualIsActive: true,
    deletedIsActive: false
  }),
  computed: {
    userInfo () {
      return this.$store.getters['user/info']
    }
  },
  watch: {
    tab () {
      if (this.tab === 'actual') {
        this.enterSlide = 'slideInLeft'
        this.leaveSlide = 'slideOutRight'
      } else if (this.tab === 'deleted') {
        this.enterSlide = 'slideInRight'
        this.leaveSlide = 'slideOutLeft'
      }
    }
  },
  methods: {
    turnOn (button) {
      if (button === 'actual') {
        this.actualIsActive = true
        this.deletedIsActive = false
      } else if (button === 'deleted') {
        this.deletedIsActive = true
        this.actualIsActive = false
      }
    },
    selectActual () {
      this.tab = 'actual'
      this.turnOn('actual')
    },
    selectDeleted () {
      this.tab = 'deleted'
      this.turnOn('deleted')
    },
    logOut () {
      this.$q.localStorage.remove('token')
      this.$router.push('/auth')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    }
  }
}
</script>
<style scoped lang="scss">
.border-radius-10 {
  border-radius: 10px;
}
</style>
