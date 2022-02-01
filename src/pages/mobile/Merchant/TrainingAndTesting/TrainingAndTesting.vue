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
            | Обучение и тестирование
    q-list.q-px-md(separator)
      q-item.no-padding
        q-item-section
          router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",:to="{ name: 'testing', params: { openTab: 'testings' }}")
            | Доступные тесты
            q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label.q-py-lg.row.justify-between.items-center.no-wrap(@click="downloadFile('/storage/common/planogramm.pptx')")
            | Планограммы
            q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label.q-py-lg.row.justify-between.items-center.no-wrap(@click="downloadFile('/storage/common/notebook_merchant.pptx')")
            | Тетрадь мерчендайзера
            q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="/home/merchant/training-testing/materials")
              | Обучающие материалы
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="/home/merchant/training-testing/video-materials")
              | Видеообучение
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-separator
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
import HeaderSettings from 'components/HeaderSettings'

export default {
  components: { HeaderSettings },
  data: () => ({
    dialog: {
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
    downloadFile (path) {
      // console.log(this.$axios.defaults.baseURL)
      openURL(`${this.$axios.defaults.baseURL}${path}`)
      // http://149.154.64.211/storage/common/filler_payform.pdf
    }
  }
}
</script>
