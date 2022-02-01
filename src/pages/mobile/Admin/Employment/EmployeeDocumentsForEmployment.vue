<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between.no-wrap
          header-link(
            title="Фото документов на трудоустройство"
            to="/home/admin/documents/employment"
          )
          header-settings
            q-list(style="width: 239px")
              q-item(clickable)
                q-item-section(no-wrap)
                  router-link.col.q-pt-sm(
                    tag="span"
                    :to="{ name: 'admin-info' }"
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
          .text-h6.text-weight-550
            | {{ all_data.last_name }}
            | {{ all_data.first_name }}
            | {{ all_data.patronymic }}
          .row.q-py-md.no-wrap
            .q-pr-xs Дата рождения:
            .text-grey {{ all_data.birthday_at }}
          .row
            .q-pr-xs Проект:
            .text-grey {{ all_data.project_name }}
    q-tabs(
      v-model="tab"
      inline-label
      no-caps
      outside-arrows
      mobile-arrows
      class="bg-white text-red-2"
    )
      q-tab(
        v-for="(tab, key) in tabs"
        :key="key"
        :name="tab.name"
        :label="tab.label"
        content-class="wrap-important"
        @click="selectedDoc=key+1; slide = 0"
      )
        q-icon(
          v-if="!tab.data.need"
          name="mdi-help-circle"
          color="blue"
        )
        q-icon(
          v-else-if="tab.data.verified"
          name="mdi-checkbox-marked-circle"
          color="green"
        )
        q-icon(
          v-else
          name="mdi-checkbox-marked-circle"
          color="red"
        )
    q-tab-panels(
      v-model="tab"
      animated
    )
      q-tab-panel.q-pa-none(
        v-for="(tab, key) in tabs"
        :key="key"
        :name="tab.name"
      )
        q-item(v-if="tab.data.need")
          q-item-section
            q-item-label
              q-carousel.bg-white.rounded-borders(
                v-model="slide"
                transition-prev="slide-right"
                transition-next="slide-left"
                swipeable
                animated
                control-color="black"
                navigation-icon="mdi-circle-medium"
                navigation-active-icon="mdi-circle"
                navigation
                padding
                height="300px"
              )
                q-carousel-slide.column.no-wrap.flex-center.q-px-none.q-pt-none(
                  :name="key"
                  v-for="(photo, key) in tab.data.photos"
                  :key="key"
                )
                  img(slot="initial" :src="photo" style="display:none")
                  q-img.rounded-borders(
                    :src="photo"
                    @click="modal.open=true; modal.photo = photo"
                  )
    q-dialog(
      position="bottom"
      v-model="modal.open"
    )
      q-card.no-border-radius
        q-card-section.q-py-sm.q-px-none.bg-grey-3
          q-item
            q-item-section
              q-item-label
                | {{ modal.title }}
            q-item-section(side)
              q-btn.bg-grey-4(
                size="sm"
                flat
                round
                color="grey-5"
                icon="mdi-window-close"
                @click="modal.open=false"
              )
        q-card-section.q-px-none.q-pt-md
          component(
            :photo="modal.photo"
            :is="`admin-register-combined-${selectedDoc}`"
            :all_data="all_data"
          )
    component(
      v-if="tabs[selectedDoc - 1].data.need"
      :is="`admin-register-modal-${selectedDoc}`"
      :all_data="all_data"
    )
    .text-center.q-pa-xl(v-else) Для данного проекта вкладка отключена
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
                .text-grey.q-my-md.text-center {{ dialog.subtitle }}
                OriginalButton.q-mt-sm.full-width(
                  color="red-2"
                  @click="dialog.open = false"
                ) Закрыть
    div(
      v-for="(tab, key) in tabs"
      :key="key"
      v-if="key == selectedDoc - 1"
    )
      q-item(v-if="tab.data.need && conclusion !== 'verified'")
        q-item-section
          q-item-label
            q-input(
              outlined
              bg-color="grey-2"
              v-model="comment"
              label="Комментарий"
              color="red"
            )
      q-item(v-if="tab.data.need")
        q-item-section
          q-item-label
            q-option-group(
              :options="conclusions"
              v-model="conclusion"
            )
      q-item(v-if="(!tab.data.verified || conclusion !== 'verified') && tab.data.need")
        q-item-section
          q-item-label
            OriginalButton.q-my-xs(
              color="red-2"
              @click="verifyDoc"
            ) Отправить
      q-item(v-else)
        q-item-section
          q-item-label
            InactiveButton.q-my-xs(
            ) Отправить
      q-item(v-if="allDocumentsVerified")
        q-item-section
          q-item-label
            OriginalButton(
              color="blue"
              @click="verifyRegistration"
            ) Отправить в 1С
      q-item(v-else)
        q-item-section
          q-item-label
            InactiveButton(
            ) Отправить в 1С
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
import HeaderLink from 'components/HeaderLink.vue'
import HeaderSettings from 'components/HeaderSettings'
// import EditPage from 'components/Testing.vue'
import _ from 'lodash'
import Api from 'modules/api'
const api = new Api('Admin')

import docs from './Docs/index'
import combinedDocs from './Docs/Combined/index'
export default {
  components: { ...docs, ...combinedDocs, OriginalButton, InactiveButton, HeaderLink, HeaderSettings },
  data () {
    return {
      slide: 0,
      selectedDoc: 1,
      all_data: null,
      tab: 'passport',
      tabs: [
        {
          name: 'passport',
          label: 'Паспорт',
          data: null
        },
        {
          name: 'passport_other',
          label: 'Паспорт (доп.)',
          data: null
        },
        {
          name: 'inn',
          label: 'ИНН',
          data: null
        },
        {
          name: 'snils',
          label: 'СНИЛС',
          data: null
        },
        {
          name: 'bank_card',
          label: 'Карта',
          data: null
        },
        {
          name: 'bank_account',
          label: 'Реквизиты',
          data: null
        },
        {
          name: 'medcard',
          label: 'Медицинская книжка',
          data: null
        },
        {
          name: 'work_card',
          label: 'Трудовая',
          data: null
        },
        {
          name: 'driver_license',
          label: 'Права',
          data: null
        },
        {
          name: 'sts',
          label: 'СТС',
          data: null
        }
        // {
        //   name: 'c',
        //   label: 'Вакансия',
        //   data: null
        // }
      ],
      comment: null,
      conclusion: 'not_verified',
      conclusions: [
        {
          label: 'Запросить повторную отправку фото',
          value: 'resend'
        },
        {
          label: 'Проверено',
          value: 'verified'
        },
        {
          label: 'Не проверено',
          value: 'not_verified'
        }
      ],
      modal: {
        open: false,
        photo: null,
        title: 'Проверьте правильность заполнения',
        subtitle: 'Паспортные данные'
      },
      dialog: {
        open: false,
        title: 'Статус обновлен!',
        subtitle: 'Все изменения сохранены и будут переданы ответственному лицу'
      },
      dialogLogout: {
        open: false
      }
    }
  },
  mounted () {
    api.call('showOneApplication', {
      params: {
        uuid: this.$route.params.uuid
      }
    })
      .then(({ data }) => {
        data = data.data

        this.all_data = data
        this.tabs[0].data = data.passport
        this.tabs[1].data = data.passport_other
        this.tabs[2].data = data.inn
        this.tabs[3].data = data.snils
        this.tabs[4].data = data.bank_card
        this.tabs[5].data = data.bank_account
        this.tabs[6].data = data.medcard
        this.tabs[7].data = data.work_card
        this.tabs[8].data = data.driver_license
        this.tabs[9].data = data.sts
        // this.tabs[10].data = data.passport // vacancy
      })
  },
  computed: {
    allDocumentsVerified () {
      return _.every(this.tabs, (tab) => {
        return tab.data.verified
      })
    }
  },
  methods: {
    logOut () {
      this.$q.localStorage.remove('token')
      this.$router.push('/auth')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
    updateData () {
      api.call('showOneApplication', {
        params: {
          uuid: this.$route.params.uuid
        }
      })
        .then(({ data }) => {
          data = data.data
          this.all_data = data
          this.tabs[0].data = data.passport
          this.tabs[1].data = data.passport_other
          this.tabs[2].data = data.inn
          this.tabs[3].data = data.snils
          this.tabs[4].data = data.bank_card
          this.tabs[5].data = data.bank_account
          this.tabs[6].data = data.medcard
          this.tabs[7].data = data.work_card
          this.tabs[8].data = data.driver_license
          this.tabs[9].data = data.sts
          // this.tabs[10].data = data.passport // vacancy
        })
    },
    verifyDoc (btn) {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })

      const fd = new FormData()
      fd.append('uuid', this.$route.params.uuid)
      fd.append('doc', this.selectedDoc)
      fd.append('doc_name', this.tab)
      fd.append('photo_id', this.slide)
      fd.append('comment', this.comment)

      _.each(this.tabs, (val, key) => {
        if (key === this.selectedDoc - 1) {
          fd.append('conclusion', this.conclusion)
          this.tabs[key].data.verified = this.conclusion
        }
      })

      api.call('verifyDoc', fd)
        .then(({ data }) => {
          this.updateData()
          this.$q.notify(data)
          this.comment = null
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
    verifyRegistration (btn) {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })

      const fd = new FormData()
      fd.append('uuid', this.$route.params.uuid)
      fd.append('comment', this.comment)

      api.call('verifyRegistration', fd)
        .then(({ data }) => {
          this.$q.notify('Запрос в 1С отправлен')
          this.$router.push('/home/admin/documents/employment')
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
    send1c (btn) {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })

      // const fd = new FormData()

      // fd.append('uuid', this.$route.params.uuid)

      api.call('send1C', {
        uuid: this.$route.params.uuid
      })
        .then(({ data }) => {
          console.log(data)
          alert('success')
        })
        .catch((data) => {
          console.log(data)
        })
        .finally(() => {
          btn.offLoad()
        })
    },
    isFull (input) {
      if (input === null || input === '') {
        return false
      } return true
    }
  }
}
</script>
<style scoped lang="scss">
.border-radius-10 {
  border-radius: 10px
}
</style>
