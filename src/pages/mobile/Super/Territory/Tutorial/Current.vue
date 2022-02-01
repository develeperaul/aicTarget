<template lang="pug">
  div
    .q-content-spinner(v-if="isLoading")
      q-spinner-puff(
        color="red"
        size="3em"
      )
    div(v-else)
      div(v-if="tutorials.length > 0")
        q-item
          q-item-section
            q-item-label
              q-select(
                :options="categories"
                v-model="category"
                outlined
                color="red"
                label="Выберите категорию"
                behavior="menu"
                menu-anchor="bottom left"
                dense
                @input="showTutorials"
              )
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
                      @click="openLink(link)"
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
      ) Доступных материалов не найдено.
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import _ from 'lodash'
import Api from 'modules/api'
const api = new Api('HomeSuper')

import getVideoId from 'get-video-id'
import { openURL } from 'quasar'

export default {
  name: 'tutorial-current',
  components: { OriginalButton, InactiveButton },
  data: () => ({
    isLoading: false,
    tutorials: [],
    convertedUrls: [],

    category: 'Все категории',
    categories: [{
      label: 'Все категории',
      value: 'all'
    }]
  }),
  mounted () {
    api.call('categoryList')
      .then(({ data }) => {
        _.each(data, (category) => {
          this.categories.push({
            label: category.name,
            value: category.id
          })
        })
      })
    this.showTutorials()
  },

  computed: {
    mode () {
      return process.env.TYPE
    }
  },

  methods: {
    showTutorials () {
      this.isLoading = true
      api.call('showTutorials', {
        category_id: this.category?.value ? this.category?.value : 'all'
      })
        .then(({ data }) => {
          data = data.data
          this.tutorials = []
          this.convertedUrls = []
          let urls = []

          _.each(data, (val) => {
            urls = []
            _.each(val.data.videos, (video) => {
              // urls = []
              const url = getVideoId(video)
              if (url.id) {
                video = `https://www.youtube.com/embed/${url.id}`
                urls.push(video)
              }
            })

            this.tutorials.push({
              id: val.id,
              category_id: val.category_id,
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
    },
    openLink (url) {
      openURL(url)
    },
    testMethod (btn, arg) {
      btn.offLoad()
      console.log(arg)
      this.modal.open = true
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
