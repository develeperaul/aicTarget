<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between.no-wrap
          header-link(
            title="Фото документов на отпуск"
            to="/home/admin/documents/vacation"
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
                    @click="dialog.open = true"
                  )
                    .q-pl-xs Выйти
    //- q-item
    //-   q-item-section
    //-     q-item-label
    //-       .text-h6.text-weight-550
    //-         | {{ all_data.last_name }}
    //-         | {{ all_data.first_name }}
    //-         | {{ all_data.patronymic }}
    //-       .row.q-py-md.no-wrap
    //-         .q-pr-xs Дата рождения:
    //-         .text-grey {{ all_data.birthday_at }}
    //-       .row
    //-         .q-pr-xs Проект:
    //-         .text-grey {{ all_data.project_name }}
    q-item
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
            :fullscreen="fullscreen"
          )
            q-carousel-slide.column.no-wrap.flex-center.q-px-none.q-pt-none(
              :name="key"
              v-for="(image, key) in images"
              :key="key"
            )
              q-img.rounded-borders(
                :src="image"
                @click="modal.open=true; modal.photo = photo"
              )
            template(v-slot:control)
              q-carousel-control(
                position="bottom-right"
                :offset="[18, 18]"
              )
                q-btn(
                  push
                  round
                  dense
                  color="white"
                  text-color="black"
                  :icon="fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
                  @click="fullscreen = !fullscreen"
                )
    q-item(v-if="scans.length > 0")
      q-item-section
        q-item-label
          .q-pt-xs.row.q-col-gutter-sm.justify-between
            .col-6(
              v-for="(scan, index) in scans"
              :key="index"
            )
              q-btn.q-pl-md.q-pr-sm.shadow-5.full-width(
                no-caps
                padding="none"
                replace
                @click="downloadScan(index)"
              )
                .row.justify-between.full-width.items-center.no-wrap
                  .q-pr-sm.font-size-13.text-grey-5.ellipsis(tag="span") Скан-копия №{{index + 1}}
    q-item
      q-item-section
        q-item-label
          q-option-group(
            :options="conclusions"
            v-model="conclusion"
          )
    q-item(v-if="conclusion === false")
      q-item-section
        q-item-label
          q-input(
            v-model="message"
            type="textarea"
            outlined
            label="Комментарий"
            bg-color="grey-2"
            color="red"
            autogrow
          )
    q-item(v-if="conclusion !== null")
      q-item-section
        q-item-label
          OriginalButton.q-my-xs(
            color="red-2"
            @click="approve"
          ) Отправить
    q-item(v-else)
      q-item-section
        q-item-label
          InactiveButton.q-my-xs(
          ) Отправить
    //- q-item
    //-   q-item-section
    //-     q-item-label
    //-       OriginalButton(
    //-         color="blue"
    //-         @click=""
    //-       ) Отправить в 1С
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
import HeaderLink from 'components/HeaderLink.vue'
import HeaderSettings from 'components/HeaderSettings'
// import EditPage from 'components/Testing.vue'
import _ from 'lodash'
import Api from 'modules/api'
const api = new Api('Admin')
import { openURL } from 'quasar'

export default {
  components: { OriginalButton, InactiveButton, HeaderLink, HeaderSettings },
  data () {
    return {
      message: null,
      slide: 0,
      fullscreen: false,
      blank_id: null,
      images: [],
      scans: [],
      conclusion: null,
      conclusions: [
        {
          label: 'Запросить повторную отправку',
          value: false
        },
        {
          label: 'Одобрено',
          value: true
        }
      ],
      dialog: {
        open: false
      }
    }
  },
  mounted () {
    api.call('showVacationBlank', {
      params: {
        uuid: this.$route.params.uuid
      }
    })
      .then(({ data }) => {
        this.blank_id = data.id
        this.images = data.data.photos
        this.scans = data.data.scans
      })
  },
  computed: {
  },
  methods: {
    logOut () {
      this.$q.localStorage.remove('token')
      this.$router.push('/auth')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
    approve (btn) {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })
      const fd = new FormData()
      fd.append('id', this.blank_id)
      fd.append('conclusion', this.conclusion)
      fd.append('message', this.message)

      api.call('approveVacationBlank', fd)
        .then(({ data }) => {
          this.$q.notify(data)
          this.$router.push('/home/admin/documents/vacation')
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
    downloadScan (scanId) {
      api.call('downloadVacationScan', {
        blank_id: this.blank_id,
        scan_id: scanId
      })
        .then(({ data }) => {
          openURL(data)
        })
        .finally(() => {
          //
        })
    }
  }
}
</script>
<style scoped lang="scss">
  .border-radius-10 {
    border-radius: 10px
  }
  .click-photo {
    width: 100%;
    height: 100%;
  }
</style>
