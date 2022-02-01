<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Отпуск"
            to="/home/merchant/information/vacation"
          )
          header-avatar
            q-list
              q-item(clickable)
                q-item-section(no-wrap)
                  router-link(tag="span",to="#")
                    | Первая кнопка
              q-item(clickable)
                q-item-section(no-wrap)
                  router-link(tag="span",to="")
                    | Вторая кнопка
    q-item
      q-item-section
        q-item-label
          .text-h4.text-weight-bolder.q-mb-xs
            | Ежегодный отпуск
    q-item
      q-item-section
        q-item-label
          .text-grey.q-pb-md Выберите периоды для получения примера заполненного бланка
    q-item
      q-item-section
        q-item-label
          .text-weight-550 Выберите год ежегодного отпуска:
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
          OriginalButton(
            v-if="everythingIsFull()"
            color="red-2"
            to="#"
            v-gallery
            data-large="https://picsum.photos/300"
          ) Посмотреть пример
          InactiveButton(
            v-else
          ) Посмотреть пример
    q-item
      q-item-section
        q-item-label.text-center
          q-btn(
            @click="dialog.open = true"
          ) dialog
    q-dialog(
      content-class="q-dialog-padding-fixed"
      v-model="dialog.open"
    )
      q-card.full-width
        q-card-section
          q-item.q-px-xs
            q-item-section
              q-item-label
                .text-h6.text-center.text-weight-bold.q-mt-md {{ dialog.title }}
                .text-grey.q-my-md.text-center.text-body1 {{ dialog.subtitle }}
                OriginalButton.q-mt-sm.full-width(
                  color="red-2"
                  @click="dialog.open = false"
                ) Закрыть
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'

export default {
  components: { OriginalButton, InactiveButton },
  data: () => ({
    dialog: {
      open: false,
      title: 'Бланк отправлен!',
      subtitle: 'Документ отправлен на Вашу личную почту, если не нашли во входящих проверьте папку “спам”'
    },
    year: null,
    optYears: [
      {
        label: 'Текущий год',
        value: '2019'
      },
      {
        label: 'Следующий год',
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
