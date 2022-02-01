<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="График отпусков"
            to="/home/merchant/territory/vacation-schedule"
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
          .text-h4.text-weight-bolder.q-mb-xs
            | Загрузка графиков отпусков
    .q-content-spinner(v-if="isLoading")
      q-spinner-puff(
        color="red"
        size="3em"
      )
    div(v-else)
      q-item(v-if="schedules.length > 0")
        q-item-section
          q-item-label
            .q-pt-md.row.q-col-gutter-sm.justify-between
              .col-6(
                v-for="(schedule, key) in schedules"
                :key="key"
              )
                q-card.q-mb-sm(
                  flat
                  bordered
                  style="font-size: 17px"
                )
                  q-card-section.q-pl-xs.q-pr-sm
                    .row.no-wrap.justify-between.items-center.q-pb-md
                      .q-pl-sm.font-size-13.text-grey-5.ellipsis График №{{ key + 1 }}
                      q-icon(
                        name="mdi-arrow-down-bold-circle"
                        size="29px"
                        color="red-2"
                        @click="downloadFile(schedule)"
                      )
                    q-btn.full-width.q-mb-md(
                      outline
                      no-caps
                      dense
                      label="Отправить в 1С"
                      @click="accept1c(schedule)"
                    )
                    q-btn.full-width.text-red-2(
                      outline
                      no-caps
                      dense
                      label="Удалить"
                      @click="deleteDialog.index_remove = schedule; deleteDialog.open = true"
                    )
      q-item(v-else)
        q-item-section
          q-item-label
            | На данный момент загруженных файлов .xlsx нет.
    q-dialog(
      content-class="q-dialog-padding-fixed"
      v-model="deleteDialog.open"
      persistant
    )
      q-card
        q-card-section
          q-item.q-px-xs
            q-item-section
              q-item-label
                .text-h6.text-center.text-weight-bold.q-mt-md Удаление
                .text-grey.q-my-md.text-center.text-body1 Вы действительно хотите удалить график?
                .column
                  OriginalButton.q-mt-sm.text-red-2(
                    @click="remove(deleteDialog.index_remove)"
                  ) Удалить график
                  OriginalButton.q-mt-sm(
                    @click="deleteDialog.open = false"
                  ) Отмена
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
import _ from 'lodash'
import Api from 'modules/api'
const api = new Api('HomeSuper')
import { openURL } from 'quasar'

export default {
  components: { OriginalButton, InactiveButton, HeaderSettings },
  data: () => ({
    isLoading: false,
    deleteDialog: {
      open: false,
      index_remove: null
    },
    dialog: {
      open: false
    },
    schedules: [
    ]
  }),
  mounted () {
    this.isLoading = true
    api.call('showVacationSchedules')
      .then(({ data }) => {
        this.schedules = data
      })
      .finally(() => {
        this.isLoading = false
      })
  },
  methods: {
    logOut () {
      this.$q.localStorage.remove('token')
      this.$router.push('/auth')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
    everythingIsFull () {
      return this.schedules.some(elem => elem.selected === true)
    },
    downloadFile (file) {
      openURL(file)
    },
    accept1c (schedule) {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })

      const fd = new FormData()
      fd.append('schedule', schedule)

      api.call('vacationAccept1c', fd)
        .then(({ data }) => {
          this.excel = null
          // this.downloadDialog.open = false
          this.$q.notify('Документ загружен')
        })
        .finally(() => {
          //
        })
    },
    remove (schedule) {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })

      const fd = new FormData()
      fd.append('schedule', schedule)

      api.call('vacationRemoveSchedule', fd)
        .then(({ data }) => {
          setTimeout(() => {
            window.location.reload()
          }, 2000)
          this.$q.notify('График удален')
        })
        .finally(() => {
          // btn.offLoad()
        })
    }
  }
}
</script>
