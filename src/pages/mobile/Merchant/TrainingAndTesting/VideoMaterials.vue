<template lang="pug">
  div
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Назад"
            to="/home/merchant/training-testing"
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
            | Видеоматериалы
    .q-content-spinner(v-if="isLoading")
      q-spinner-puff(
        color="red"
        size="3em"
      )
    div(v-else)
      div(v-if="tutorials.length > 0")
        div(
          v-for="(tutorial, key) in tutorials"
          :key="key"
        )
          q-banner.bg-grey-2.text-left(dense).q-px-md.q-my-md(
            transition-hide="slide-up"
          )
            .row.no-wrap.justify-between
              div(style="font-size: 17px") Обновлено {{ tutorial.updated_at }}
          q-item(v-if="tutorial.convertedVideos.length")
            q-item-section
              q-item-label.text-weight-550
                | Видеоматериалы:
              .q-pt-md.row.q-col-gutter-sm.justify-start
                .col-4(
                  v-for="(video, index) in tutorial.convertedVideos"
                  :key="index"
                )
                  q-video.img-blank(
                    v-if="video != null || video != undefined"
                    :src="video"
                    :ratio="16/9"
                  )
          q-item(v-if="tutorial.photos.length")
            q-item-section
              q-item-label.text-weight-550
                | Фотоматериалы:
              .q-pt-md.row.q-col-gutter-sm.justify-start
                .col-4(
                  v-for="(image, indexPhoto) in tutorial.photos"
                  :key="indexPhoto"
                )
                  .relative-position
                    .click-photo(
                      v-gallery
                      :data-large="image"
                    )
                      q-img.img-blank(
                        :src="image"
                      )
          q-item(v-if="tutorial.docs.length")
            q-item-section
              q-item-label.text-weight-550
                | Документы:
              .q-pt-md.row.q-col-gutter-sm.justify-between
                .col-6(
                  v-for="(doc, indexDoc) in tutorial.docs"
                  :key="indexDoc"
                )
                  q-btn.q-pl-md.q-pr-sm.shadow-5.full-width(
                    no-caps
                    padding="none"
                    replace
                    @click="downloadDoc(tutorial.id, indexDoc)"
                  )
                    .row.justify-between.full-width.items-center.no-wrap
                      .q-pr-sm.font-size-13.text-grey-5.ellipsis Документ №{{ indexDoc + 1 }}
          q-item(v-if="tutorial.links.length")
            q-item-section
              q-item-label.text-weight-550
                | Ссылки:
                .q-pt-xs.row.q-col-gutter-sm.justify-between
                  .col-12(
                    v-for="(link, indexLink) in tutorial.links"
                    :key="indexLink"
                  )
                    q-btn.q-pl-md.q-pr-sm.full-width(
                      color="grey-1"
                      outline
                      no-caps
                      padding="none"
                    )
                      .row.justify-between.full-width.items-center.no-wrap
                        .font-size-13.text-blue.ellipsis {{ link }}
          q-item(v-if="tutorial.description")
            q-item-section
              q-item-label
                q-input(
                  v-model="tutorial.description"
                  type="textarea"
                  outlined
                  label="Описание"
                  bg-color="grey-2"
                  color="red"
                  autogrow
                  readonly
                )
      .q-py-md.text-center(
        v-else
      ) Видеоматериалы не найдены.
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
const api = new Api('HomeMerchant')

import getVideoId from 'get-video-id'
import { openURL } from 'quasar'

export default {
  components: { OriginalButton, InactiveButton, HeaderSettings },
  data: () => ({
    isLoading: false,
    tutorials: [],
    convertedUrls: [],
    dialog: {
      open: false
    }
  }),
  mounted () {
    this.isLoading = true
    api.call('showVideoMaterials')
      .then(({ data }) => {
        data = data.data
        this.tutorials = []
        this.convertedUrls = []
        let urls = []

        _.each(data, (val) => {
          urls = []
          _.each(val.data.videos, (video) => {
            const url = getVideoId(video)
            if (url.id) {
              video = `https://www.youtube.com/embed/${url.id}`
              urls.push(video)
            }
          })

          this.tutorials.push({
            id: val.id,
            description: val.description,
            photos: val.data.photos,
            docs: val.data.docs,
            links: val.data.links,
            videos: val.data.videos,
            convertedVideos: urls,
            created_at: this.$moment(val.created_at).format('DD.MM.YYYY'),
            updated_at: this.$moment(val.updated_at).format('DD.MM.YYYY')
          })
        })
      })
      .finally(() => {
        this.isLoading = false
      })
  },

  computed: {
    mode () {
      return process.env.TYPE
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
    testMethod (btn, arg) {
      btn.offLoad()
      console.log(arg)
      this.modal.open = true
    },
    downloadDoc (tutorialId, documentId) {
      api.call('downloadTutorialDoc', {
        tutorialId: tutorialId,
        docId: documentId
      })
        .then(({ data }) => {
          openURL(data)
        })
        .finally(() => {
          //
        })
    }
  },
  watch: {
  }
}
</script>
<style scoped lang="scss">
  .border-radius-10 {
    border-radius: 10px;
  }
  .positioned-end {
    justify-content: flex-end !important;
  }
  .wrapper {
    display:flex;
    flex-direction: column;
  }
  .bottomButton {
    flex-grow: 1;
    align-items: flex-end;
    flex: 1;
  }
  .img-blank {
    height: 110px;
    border-radius: 5px;
  }
  .click-photo {
    width: 100%;
    height: 100%;
  }
  .button-remove {
    position: absolute;
    transform: translate(25%, -25%);
    top: 0px;
    right: 0px;
    z-index: 1;
  }
  .checkbox-border {
    border: 1px !important;
    border-radius: 5px !important;
  }
</style>
