<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Информирование"
            to="/home/merchant/information"
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
        q-item-label.text-h4.text-weight-bolder.q-mb-md
          | Запрос справок
    q-list.q-px-md(separator)
      q-item.no-padding(
        v-for="(certificate, key) in certificates"
        :key="key"
      )
        q-item-section
          q-item-label.q-py-lg.row.justify-between.items-center.no-wrap(
            @click="certificate.open = true; period = {}; displayedPeriod = null; comment = null"
          )
            | {{certificate.name}}
            q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
        q-dialog(
          v-model="certificate.open"
          position="bottom"
        )
          q-swipe-to-close(v-model="certificate.open")
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
                      @click="certificate.open=false"
                    )
              q-card-section.q-px-none.q-pt-md
                q-item
                  q-item-section
                    q-item-label.text-h6.text-weight-bold
                      | {{ certificate.name }}
                q-item
                  q-item-section
                    q-item-label.text-grey
                      | Укажите период за который необходимо предоставить справку
                q-item
                  q-item-section
                    q-item-label
                      q-input(
                        bg-color="grey-2"
                        outlined
                        label="Укажите период"
                        color="red"
                        ref="dataTarget"
                        :value="displayedPeriod"
                      )
                      q-date.full-width(
                        flat
                        range
                        v-model="period"
                        mask="DD.MM.YYYY"
                        minimal
                        :locale="$utils.calendarLocale"
                        @click="setDisplayedPeriod()"
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
                        v-if="periodSelected"
                        color="red-2"
                        @click="(btn) => requestCert(btn, certificate.name)"
                      ) Запросить
                      InactiveButton(
                        v-else
                      ) Запросить
      q-separator
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import Api from 'modules/api'
const api = new Api('User')
import _ from 'lodash'

export default {
  components: { OriginalButton, InactiveButton },
  data: () => ({
    period: {},
    comment: null,
    displayedPeriod: null,
    certificate: null,
    certificates: [
      {
        open: false,
        name: '2-НДФЛ (справка о доходах физического лица)'
      },
      {
        open: false,
        name: '182-Н (справка с места работы)'
      },
      {
        open: false,
        name: 'Справка для расчета пособий/справка о доходах (для сотрудников в декрете)'
      },
      {
        open: false,
        name: 'Справка о неполучении родителем пособия'
      },
      {
        open: false,
        name: 'Справка для центра занятости'
      },
      {
        open: false,
        name: 'Справка для предоставления субсидий'
      }
    ]
  }),
  computed: {
    periodSelected () {
      const from = this.period?.from
      const to = this.period?.to
      if (from !== undefined && to !== undefined) {
        return true
      }
      return false
    }
  },
  methods: {
    requestCert (btn, certName) {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })

      const fd = new FormData()
      fd.append('reference_name', certName)
      fd.append('period_start', this.period.from)
      fd.append('period_end', this.period.to)
      fd.append('comment', this.comment)

      api.call('requestCert', fd)
        .then(({ data }) => {
          console.log(fd)
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
          btn.offLoad()
        })
    },
    setDisplayedPeriod () {
      const from = this.period?.from
      const to = this.period?.to
      if (from !== undefined && to !== undefined) {
        this.displayedPeriod = from + ' - ' + to
      } else {
        this.period = {}
        this.displayedPeriod = null
      }
    }
  },
  mounted () {
  }
}
</script>
