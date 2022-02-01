<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Управление территорией"
            to="/home/merchant/territory"
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
          .text-h4.text-weight-bolder.q-mb-md
            | График отпусков
    q-list.q-px-md(separator)
      q-item.no-padding
        q-item-section
          q-item-label
            .q-py-lg.row.justify-between.items-center.no-wrap(
              @click="sendMailRequest"
            )
              | Отправить на почту файл Excel с текущим графиком отпусков
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="/home/super/territory/vacation-schedule/download")
              | Загрузить график отпусков из доступных файлов
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="/home/super/territory/vacation-schedule/edit")
              | Корректировка графика отпусков
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            q-btn.q-py-md.q-px-none.full-width(
              flat
              no-caps
              dense
              @click="request1c"
            )
              .row.no-wrap.justify-between.items-center.full-width
                .text-left(style="line-height: normal;") Скачать график отпусков
                q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            q-btn.q-py-md.q-px-none.full-width(
              flat
              no-caps
              dense
              @click="downloadDialog.open = true"
            )
              .row.no-wrap.justify-between.items-center.full-width
                .text-weight-400.text-left(style="line-height: normal;")  Загрузить график отпусков из файла Excel
                q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-separator
    q-dialog(
      content-class="q-dialog-padding-fixed"
      v-model="downloadDialog.open"
    )
      q-card.full-width
        q-card-section
          q-item.q-px-xs
            q-item-section
              q-item-label
                .text-h6.text-center.text-weight-bold.q-py-md Загрузка документа Excel
                q-btn.q-pl-md.q-pr-sm.shadow-5.full-width(
                  v-if="excel !== null"
                  no-caps
                  padding="none"
                )
                  .row.justify-between.full-width.items-center.no-wrap
                    .q-pr-sm.font-size-13.text-grey-5.ellipsis() {{ excel.name }}
                    div(
                      @click="onRemoveDoc"
                      style="width: 29px"
                    )
                      q-icon(name="mdi-window-close" color="red-2" size="15px")
                input(
                  ref="uploadFile"
                  type="file"
                  accept=".xlsb, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  @change="fileSelect"
                  hidden
                )
                q-btn.q-my-sm.full-width(
                  v-if="excel === null"
                  @click="$refs.uploadFile.click()"
                  no-caps
                  outline
                ) Вложить документ
                OriginalButton.q-mt-md.full-width(
                  color="red-2"
                  v-if="excel !== null"
                  @click="accept1c"
                ) Загрузить
                OriginalButton.q-mt-sm.full-width.text-black(
                  color="white"
                  @click="downloadDialog.open = false"
                ) Отменить
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
import _ from 'lodash'
import Api from 'modules/api'
const api = new Api('HomeSuper')
import { openURL } from 'quasar'

export default {
  components: { OriginalButton, InactiveButton, HeaderSettings },
  data: () => ({
    excel: null,
    downloadDialog: {
      open: false
    },
    dialog: {
      open: false,
      title: 'Отправлено!',
      subtitle: 'График отпусков отправлен на указанную почту в личном кабинете'
    },
    month: null,
    optMonths: [],
    year: null,
    optYears: [],

    modal: {
      paysheet: false
    },
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
    sendMailRequest () {
      api.call('vacationSendMail')
        .then(() => {
          this.dialog.open = true
        })
        .catch(this.$axios.errorHandler)
    },
    request1c () {
      api.call('vacationRequest1c')
        .then(({ data }) => {
          openURL(data)
        })
        .finally(() => {
          this.loading = false
        })
    },
    accept1c (btn) {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })

      const fd = new FormData()
      fd.append('excel', this.excel)
      api.call('vacationAccept1c', fd)
        .then(({ data }) => {
          this.excel = null
          this.downloadDialog.open = false
          this.$q.notify('Документ загружен')
        })
        .finally(() => {
          btn.offLoad()
        })
    },
    onRemoveDoc () {
      this.excel = null
    },
    // async fileSelect (type, files, file) {
    //   console.log(this.$refs.uploadFile.files[0])

    //   this.excel = this.$refs.uploadFile.files[0]
    //   this.modal.open = false
    // },
    everythingIsFull () {
      if (this.month === '' || this.month === null || this.year === '' || this.year === null) {
        return false
      } return true
    },
    fileDataURL (file) {
      return new Promise((resolve, reject) => {
        const fr = new FileReader()
        fr.onload = () => resolve(fr.result)
        fr.onerror = reject
        fr.readAsDataURL(file)
      })
    },
    async fileSelect (type, files, file) {
      const fd = new FormData()
      fd.append('excel', this.$refs.uploadFile.files[0])

      api.call('importVacationSchedule', fd)
        .then(({ data }) => {
          if (data === 'Импорт завершен') {
            this.$q.notify(data)
          } else {
            this.$q.notify({
              type: 'negative',
              message: data
            })
          }
          this.downloadDialog.open = false
          console.log(data)
        })
        .catch(this.$axios.errorHandler)
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
