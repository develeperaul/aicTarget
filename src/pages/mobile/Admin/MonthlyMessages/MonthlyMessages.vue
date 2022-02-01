<template lang="pug">
  q-page.wrapper
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Назад"
            to="/home/admin"
          )
          header-settings
            q-list(style="width: 239px")
              q-item(clickable)
                q-item-section(no-wrap)
                  router-link.col.q-pt-sm(
                    tag="span"
                    :to="{ name: 'admin-info' }"
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
            | Ежемесячные сообщения
    q-item
      q-item-section
        q-item-label(style="height: 45px")
          .bg-grey-2.border-radius-10.row.justify-between.items-center.no-wrap.q-pa-xs(
          )
            q-btn.full-width.font-size-15.text-no-wrap(
              padding="xs lg"
              no-caps
              label="Новая рассылка"
              :class="{ 'bg-white shadow-2': newMailingListIsActive }"
              @click="selectNewMailingList()"
            )
            q-btn.full-width.font-size-15(
              padding="xs lg"
              no-caps
              label="Текущие"
              :class="{ 'bg-white shadow-2': currentIsActive }"
              @click="selectCurrent()"
            )
    transition(
      :enter-active-class="`animated ${enterSlide}`"
      :leave-active-class="`animated ${leaveSlide}`"
      mode="out-in"
    )
      component(
        :is="`monthly-${tab}`"
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
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'

export default {
  components: { ...components, HeaderSettings, OriginalButton, InactiveButton },
  data: () => ({
    dialog: {
      open: false
    },
    tab: 'new-mailing-list',
    enterSlide: 'slideInLeft',
    leaveSlide: 'slideOutRight',
    newMailingListIsActive: true,
    currentIsActive: false
  }),
  watch: {
    tab () {
      if (this.tab === 'new-mailing-list') {
        this.enterSlide = 'slideInLeft'
        this.leaveSlide = 'slideOutRight'
      } else if (this.tab === 'current') {
        this.enterSlide = 'slideInRight'
        this.leaveSlide = 'slideOutLeft'
      }
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
      if (button === 'new-mailing-list') {
        this.newMailingListIsActive = true
        this.currentIsActive = false
      } else if (button === 'current') {
        this.currentIsActive = true
        this.newMailingListIsActive = false
      }
    },
    selectNewMailingList () {
      this.tab = 'new-mailing-list'
      this.turnOn('new-mailing-list')
    },
    selectCurrent () {
      this.tab = 'current'
      this.turnOn('current')
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
