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
        q-item-label.row.no-wrap.items-center
          div
            svg(width="140" height="140")
              use(xlink:href="paysheet.svg#paysheet")
          .text-weight-550.q-pl-md
            div Период расчетного
            div.row
              div листа:
              .text-blue.text-no-wrap.q-pl-xs {{ info.month }}
    q-list.q-px-md(separator)
      q-item.no-padding(
        v-for="(data, key) in info.accrual"
        :key="key"
      )
        q-item-section
          q-item-label.q-py-lg.row.justify-between.no-wrap
            .text-grey-5 {{ data.name }}:
            .text-no-wrap {{ data.summ }} руб.
      q-separator
    q-item.q-pt-lg
      q-item-section
        q-item-label
          OriginalButton(
            @click.native="openLink"
          )
            | Загрузить файл
            template(#last)
              span &nbsp;
              span.text-green Excel
</template>
<script>
import { openURL } from 'quasar'
import OriginalButton from 'components/OriginalButton.vue'

export default {
  components: { OriginalButton },
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  mounted () {

  },
  methods: {
    openLink () {
      openURL(this.info.filename)
    }
  }
}
</script>
