<template lang="pug">
  q-page
    .q-pb-lg.text-h4.text-weight-bolder
      | Расчетный лист
    .row.justify-center
      .col-6.q-pr-md
        q-list(separator)
          q-item.no-padding(
            v-for="(item, index) in parameters"
            :key="index"
            v-if="index < 14"
          )
            q-item-section
              q-item-label.q-py-sm.row.justify-between.items-center.no-wrap
                div {{ item.label }}
                q-checkbox(
                  v-model="item.value"
                )
      .col-6.q-pl-md
        q-list(separator)
          q-item.no-padding(
            v-for="(item, index) in parameters"
            :key="index"
            v-if="index >= 14"
          )
            q-item-section
              q-item-label.q-py-sm.row.justify-between.items-center.no-wrap
                div {{ item.label }}
                q-checkbox(
                  v-model="item.value"
                )
    q-footer.bg-white.footer-header.row.items-center(
      bordered
     )
      q-toolbar.max-width.q-px-xl
        q-toolbar-title
        .col-6
          .row.items-center.no-wrap.justify-end.text-no-wrap
            OriginalButton.q-mr-lg.text-black.q-px-lg(
              @click="auth"
            ) Назад
            OriginalButton.q-px-lg(
              color="red-2"
              @click="auth"
            ) Подтвердить изменения
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'

export default {
  components: { OriginalButton, InactiveButton },
  data () {
    return {
      parameter: [],
      parameters: [
        {
          label: 'Оклад по часам',
          value: false
        },
        {
          label: 'Оклад по часам с НДФЛ',
          value: false
        },
        {
          label: 'Бонус',
          value: false
        },
        {
          label: 'Бонус с НДФЛ',
          value: false
        },
        {
          label: 'Начисление отпуска',
          value: false
        },
        {
          label: 'Начисление отпуска с НДФЛ',
          value: false
        },
        {
          label: 'Больничный за счет работодателя',
          value: false
        },
        {
          label: 'Больничный за счет работодателя с НДФЛ',
          value: false
        },
        {
          label: 'Больничный за счет ФСС',
          value: false
        },
        {
          label: 'Больничный за счет ФСС с НДФЛ',
          value: false
        },
        {
          label: 'Мобильная связь',
          value: false
        },
        {
          label: 'Мобильная связь с НДФЛ',
          value: false
        },
        {
          label: 'ГСМ',
          value: false
        },
        {
          label: 'ГСМ с НДФЛ',
          value: false
        },
        {
          label: 'Прочие доплаты',
          value: false
        },
        {
          label: 'Прочие доплаты с НДФЛ',
          value: false
        },
        {
          label: 'Комментарий к доплате',
          value: false
        },
        {
          label: 'Оплата проезда',
          value: false
        },
        {
          label: 'Оплата проезда с НДФЛ',
          value: false
        },
        {
          label: 'Районный коэффициент %',
          value: false
        },
        {
          label: 'Районный коэффициент сумма',
          value: false
        },
        {
          label: 'Районный коэффициент сумма с НДФЛ',
          value: false
        },
        {
          label: 'Северная надбавка %',
          value: false
        },
        {
          label: 'Северная надбавка сумма',
          value: false
        },
        {
          label: 'Северная надбавка сумма с НДФЛ',
          value: false
        },
        {
          label: 'НДФЛ удержанный',
          value: false
        },
        {
          label: 'НДФЛ с вычета',
          value: false
        }
      ]
    }
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
  .border-radius-10 {
    border-radius: 10px
  }
  .footer-header {
    height: 100px;
  }
  .max-width {
    max-width: 1440px;
    margin: 0 auto;
  }
</style>
