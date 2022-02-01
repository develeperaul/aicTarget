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
                    @click="dialogLogout.open = true"
                  )
                    .q-pl-xs Выйти
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
            @input="showPeriods"
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
            :options="periods"
            type="radio",
            v-model="selectedPeriods"
          )
          //- q-option-group(
          //-   v-if="year"
          //-   v-model="selectedPeriods"
          //-   :options="periods"
          //-   type="checkbox"
          //- )
          .q-pt-lg.text-grey.text-center(
            v-else
          ) Выберите год
    q-item
      q-item-section
        q-item-label
          OriginalButton(
            v-if="everythingIsFull()"
            color="red-2"
            @click.native="downloadFile()"
          ) Посмотреть пример
          InactiveButton(
            v-else
          ) Посмотреть пример
    //- q-item
    //-   q-item-section
    //-     q-item-label.text-center
    //-       q-btn(
    //-         @click="dialog.open = true"
    //-       ) dialog
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
    q-dialog(
      content-class="q-dialog-padding-fixed"
      v-model="dialogLogout.open"
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
                  @click="dialogLogout.open = false"
                ) Отмена
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import HeaderSettings from 'components/HeaderSettings'

import Api from 'modules/api'
const api = new Api('HomeMerchant')
import _ from 'lodash'
import { openURL } from 'quasar'

export default {
  components: { OriginalButton, InactiveButton, HeaderSettings },
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
        value: '2021'
      },
      {
        label: 'Следующий год',
        value: '2022'
      }
    ],
    selectedPeriods: [],
    period: null,
    periods: [],
    dialogLogout: {
      open: false
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
    showPeriods () {
      api.call('showPeriods', {
        year: this.year
      })
        .then(({ data }) => {
          this.periods = []
          _.each(data, (period, key) => {
            this.periods.push({
              period_start: period.period_start,
              period_end: period.period_end,
              label: period.period_start + ' - ' + period.period_end,
              value: `period_${key + 1}`
            })
          })
          // this.periods = [
          //   {
          //     label: data[0][0].period_start_1 + ' - ' + data[0][0].period_end_1,
          //     value: 'period1'
          //   },
          //   {
          //     label: data[0][1].period_start_2 + ' - ' + data[0][1].period_end_2,
          //     value: 'period2'
          //   },
          //   {
          //     label: data[0][2].period_start_3 + ' - ' + data[0][2].period_end_3,
          //     value: 'period3'
          //   },
          //   {
          //     label: data[0][3].period_start_4 + ' - ' + data[0][3].period_end_4,
          //     value: 'period4'
          //   }
          // ]
        })
        .finally(() => {
          //
        })
    },
    everythingIsFull () {
      if (this.selectedPeriods.length) {
        return true
      } return false
    },
    downloadFile () {
      const period = _.find(this.periods, ['value', this.selectedPeriods])

      // eslint-disable-next-line no-unused-vars
      let params = '?'
      params += 'lastname=' + this.userInfo.passport.last_name
      params += '&firstname=' + this.userInfo.passport.first_name
      params += '&middlename=' + this.userInfo.passport.patronymic
      params += '&period_start=' + period.period_start
      params += '&period_end=' + period.period_end
      openURL(`${this.$axios.defaults.baseURL}api/v1/vacation/blanks/show-example${params}`)
      // http://149.154.64.211/api/v1/vacation/blanks/show-example?full_name=asd%20asd&period_start=14.14.44&period_end=145.64.123
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters['user/info']
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
