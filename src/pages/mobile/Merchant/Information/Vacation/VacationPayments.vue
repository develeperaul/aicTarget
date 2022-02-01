<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Отпуск"
            to="/home/merchant/information/vacation"
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
            | Отпускные выплаты
    q-item
      q-item-section
        q-item-label
          .text-weight-550 Выберите период получения информации по отпускам:
    q-item.q-mb-md.q-pl-sm
      q-item-section
        q-item-label
          q-option-group.row(
            :options="optYears"
            type="radio",
            v-model="year"
          )
    q-item
      q-item-section
        q-item-label
          .text-weight-550 Периоды плановых ежегодных отпусков за выбранный год:
    q-item.q-pb-xl.q-pl-sm
      q-item-section
        q-item-label
          q-option-group(
            v-if="year"
            v-model="period"
            :options="periods"
            type="checkbox"
          )
          .q-pt-lg.text-grey.text-center(
            v-else
          ) Выберите год
    q-item
      q-item-section
        q-item-label
          .q-pt-lg.text-grey После запроса, Вы будете перемещены на стартовый экран с информацией о сумме выплат за выбранные периоды
    q-item
      q-item-section
        q-item-label
          OriginalButton(
            v-if="everythingIsFull()"
            color="red-2"
            to="#"
          ) Запросить сумму выплат
          InactiveButton(
            v-else
          ) Запросить сумму выплат
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
    year: null,
    optYears: [
      {
        label: '2019',
        value: '2019'
      },
      {
        label: '2020',
        value: '2020'
      }
    ],
    period: [],
    periods: [
      {
        label: '15.01.2020 – 23.01.2020',
        value: 'period1'
      },
      {
        label: '20.05.2020 – 03.06.2020',
        value: 'period2'
      },
      {
        label: '15.11.2020 – 23.12.2020',
        value: 'period3'
      }
    ]
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
      if (this.period.length) {
        return true
      } return false
    }
  },
  mounted () {
    // const year = 2019
    // const lastYear = this.$moment().add(-1, 'year').format('YYYY')
    // this.optMonths = this.$utils.calendarLocale.months
    // this.optYears = []
    // // this.optYears =
    // // TODO: Years from start work
    // for (let inyear = year; inyear <= lastYear; inyear++) {
    //   this.optYears.push(inyear)
    // }
    // // this.optYear =
  }
}
</script>
