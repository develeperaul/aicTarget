<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Назад"
            to="/home/merchant"
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
            | Управление территорией
    q-list.q-px-md(separator)
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="/home/super/territory/replacement")
              | Заявка на замену
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="/home/super/territory/probation")
              | Обратная связь по результатам стажировки
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="/home/super/territory/vacation-schedule")
              | График отпусков
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="/home/super/territory/tutorial")
              | Обучающие материалы и тесты
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-separator
    q-dialog(
        position="bottom"
        v-model="modal.paysheet"
      )
        q-swipe-to-close(v-model="modal.paysheet")
          q-card.no-border-radius
            q-card-section.q-py-sm.q-px-none.bg-grey-3
              q-item
                q-item-section
                  q-item-label
                    | Заполните пустые поля
                q-item-section(side)
                  q-btn.bg-grey-4(
                    size="sm"
                    flat
                    round
                    color="grey-5"
                    icon="mdi-window-close"
                    @click="modal.paysheet=false"
                  )
            q-card-section.q-px-none.q-pt-md
              q-item
                q-item-section
                  q-item-label.text-h6.text-weight-bold
                    | Запрос расчетного листа
              q-item
                q-item-section
                  q-item-label.text-grey
                    | Укажите период за который необходимо предоставить расчетный лист
              q-item
                q-item-section
                  q-select(
                    v-model="month"
                    label="Месяц"
                    options-cover
                    :options="optMonths"
                  )
                q-item-section
                  q-item-label
                    q-select(
                      v-model="year"
                      label="Год"
                      options-cover
                      :options="optYears"
                    )
              q-item
                q-item-section
                  q-item-label
                    OriginalButton(
                      v-if="everythingIsFull()"
                      color="red-2"
                      to="/home/merchant/information/paysheet"
                    ) Запросить
                    InactiveButton(
                      v-else
                    ) Запросить
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
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import HeaderSettings from 'components/HeaderSettings'

export default {
  components: { OriginalButton, InactiveButton, HeaderSettings },
  data: () => ({
    dialog: {
      open: false
    },
    month: null,
    optMonths: [],
    year: null,
    optYears: [],
    modal: {
      paysheet: false
    }
  }),
  methods: {
    logOut () {
      this.$q.localStorage.remove('token')
      this.$router.push('/auth')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
    everythingIsFull () {
      if (this.month === '' || this.month === null || this.year === '' || this.year === null) {
        return false
      } return true
    }
  },
  mounted () {
    const year = 2018
    const nowYear = this.$moment().format('YYYY')
    this.optMonths = this.$utils.calendarLocale.months
    this.optYears = []
    // this.optYears =
    // TODO: Years from start work
    for (let inyear = year; inyear < nowYear; inyear++) {
      this.optYears.push(inyear)
    }
    // this.optYear =
  }
}
</script>
