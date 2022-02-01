<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Назад"
            to="/home/merchant"
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
          .text-h4.text-weight-bolder.q-mb-md
            | Информирование
    q-list.q-px-md(separator)
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="#")
              | Памятка о порядке начисления заработной платы
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label.q-py-lg.row.justify-between.items-center.no-wrap(
            @click="modal.paysheet = true"
          )
            | Запрос расчётного листа
            q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="/home/merchant/information/bonuses")
              | Запрос информации по бонусам и доплатам
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="/home/merchant/information/certificates")
              | Запрос справок
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="/home/merchant/information/vacation")
              | Отпуск
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="/home/merchant/information/sick-leave")
              | Больничный
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
                  q-input(
                    v-model="comment"
                    bg-color="grey-2"
                    outlined
                    label="Комментарий"
                    color="red"
                  )
            q-item
              q-item-section
                q-item-label
                  OriginalButton(
                    v-if="everythingIsFull()"
                    color="red-2"
                    @click="requestPaymentForm"
                  ) Запросить
                  InactiveButton(
                    v-else
                  ) Запросить
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import _ from 'lodash'
import Api from 'modules/api'
const api = new Api('User')

export default {
  components: { OriginalButton, InactiveButton },
  data: () => ({
    month: null,
    optMonths: [],
    year: null,
    optYears: [],

    modal: {
      paysheet: false
    }
  }),
  methods: {
    everythingIsFull () {
      if (this.month === '' || this.month === null || this.year === '' || this.year === null) {
        return false
      } return true
    },
    requestPaymentForm (btn) {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })

      const fd = new FormData()
      fd.append('period', '01.2020')
      // fd.append('reference_name', 'paysheet')
      // fd.append('period_start', this.period.from)
      // fd.append('period_end', this.period.to)
      // fd.append('comment', this.comment)

      api.call('paymentForm', fd)
        .then(({ data }) => {
          console.log(data)
          this.$router.push({
            name: 'paysheetinfo',
            params: {
              info: data
            }
            // path: `/home/merchant/information/paysheet?info=${JSON.stringify()}`
          })
          // const url = window.URL.createObjectURL(new Blob([data]))
          // const link = document.createElement('a')
          // link.href = url
          // link.setAttribute('download', 'file.xlsx')
          // document.body.appendChild(link)
          // link.click()

          // to="/home/merchant/information/paysheet"
          // console.log(fd)
        })
        .catch((data) => {
          console.log(data)
          if (data.response) {
            const errors = data.response.data.errors
            _.each(errors, (messages, key) => {
              console.log(key, this.errors[key])
              if (this.errors[key] !== undefined) {
                this.errors[key] = messages[0]
              }
            })
          }
        })
        .finally(() => {
          // btn.offLoad()
          this.$router.push('/home/merchant/information/paysheet')
        })
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
