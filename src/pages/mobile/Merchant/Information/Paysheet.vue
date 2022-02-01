<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Информирование"
            to="/home/merchant/information"
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
import { openURL } from 'quasar'
import OriginalButton from 'components/OriginalButton.vue'
import HeaderSettings from 'components/HeaderSettings'

export default {
  components: { OriginalButton, HeaderSettings },
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    dialog: {
      open: false
    }
  }),
  mounted () {
  },
  methods: {
    logOut () {
      this.$q.localStorage.remove('token')
      this.$router.push('/auth')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
    openLink () {
      openURL(this.info.filename)
    }
  }
}
</script>
