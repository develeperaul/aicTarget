<template lang="pug">
  div
    .relative-position
      q-card.q-mb-lg(
        flat
        bordered
      )
        q-card-section.row.q-pa-md(
          style="height: 280px"
        )
          .col-9.items-start
            q-input.q-pb-md(
              v-model="message"
              type="textarea"
              outlined
              bg-color="grey-2"
              color="red"
              input-style="height: 137px; max-height: 137px"
            )
            q-scroll-area.rounded-borders.self-end(
              :thumb-style="thumbStyle"
              horizontal
              style="height: 90px;"
            )
              .row.no-wrap
                div(
                  v-for="(image, indexPhoto) in images"
                  :key="indexPhoto"
                  style="width: 90px; height: 90px;"
                  :class="{'q-ml-md': indexPhoto > 0}"
                )
                  .click-photo(
                    v-gallery
                    :data-large="image"
                  )
                    .relative-position
                      q-img.img-blank(
                        :src="image"
                      )
          .col-3.q-pl-lg.row
            .row.self-center
              .q-pr-xs Дни отправки:
              .text-grey 1, 3, 5
              q-checkbox.checkbox-border(
                :value="true"
                label="Вкл/выкл отправку"
              )
            .row.self-end.q-pb-xs
              OriginalButton.q-px-lg(
                @click=""
              ) Редактировать
        q-btn.bg-red-2.button-remove(
          size="sm"
          flat
          round
          color="white"
          icon="mdi-window-close"
          @click=""
        )
    .relative-position
      q-card.q-mb-lg(
        flat
        bordered
      )
        q-card-section.row.q-pa-md(
          style="height: 280px"
        )
          .col-9.items-start
            q-input.q-pb-md(
              v-model="message"
              type="textarea"
              outlined
              bg-color="grey-2"
              color="red"
              input-style="height: 137px; max-height: 137px"
            )
            q-scroll-area.rounded-borders.self-end(
              :thumb-style="thumbStyle"
              horizontal
              style="height: 90px;"
            )
              .row.no-wrap
                div(
                  v-for="(image, indexPhoto) in images"
                  :key="indexPhoto"
                  style="width: 90px; height: 90px;"
                  :class="{'q-ml-md': indexPhoto > 0}"
                )
                  .click-photo(
                    v-gallery
                    :data-large="image"
                  )
                    .relative-position
                      q-img.img-blank(
                        :src="image"
                      )
          .col-3.q-pl-lg.row
            .row.self-center
              .q-pr-xs Дни отправки:
              .text-grey 1, 3, 5
              q-checkbox.checkbox-border(
                :value="true"
                label="Вкл/выкл отправку"
              )
            .row.self-end.q-pb-xs
              OriginalButton.q-px-lg(
                @click=""
              ) Редактировать
        q-btn.bg-red-2.button-remove(
          size="sm"
          flat
          round
          color="white"
          icon="mdi-window-close"
          @click=""
        )
    .relative-position
      q-card.q-mb-lg(
        flat
        bordered
      )
        q-card-section.row.q-pa-md(
          style="height: 280px"
        )
          .col-9.items-start
            q-input.q-pb-md(
              v-model="message"
              type="textarea"
              outlined
              bg-color="grey-2"
              color="red"
              input-style="height: 137px; max-height: 137px"
            )
            q-scroll-area.rounded-borders.self-end(
              :thumb-style="thumbStyle"
              horizontal
              style="height: 90px;"
            )
              .row.no-wrap
                div(
                  v-for="(image, indexPhoto) in images"
                  :key="indexPhoto"
                  style="width: 90px; height: 90px;"
                  :class="{'q-ml-md': indexPhoto > 0}"
                )
                  .click-photo(
                    v-gallery
                    :data-large="image"
                  )
                    .relative-position
                      q-img.img-blank(
                        :src="image"
                      )
          .col-3.q-pl-lg.row
            .row.self-center
              .q-pr-xs Дни отправки:
              .text-grey 1, 3, 5
              q-checkbox.checkbox-border(
                :value="true"
                label="Вкл/выкл отправку"
              )
            .row.self-end.q-pb-xs
              OriginalButton.q-px-lg(
                @click=""
              ) Редактировать
        q-btn.bg-red-2.button-remove(
          size="sm"
          flat
          round
          color="white"
          icon="mdi-window-close"
          @click=""
        )
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
export default {
  name: 'admin-messages-3',
  components: { OriginalButton, InactiveButton },
  // props: {
  //   all_data: {
  //     type: Object,
  //     required: false
  //   }
  // },
  data: () => ({
    images: [
      'https://picsum.photos/400/300',
      'https://picsum.photos/200/300',
      'https://picsum.photos/300',
      'https://picsum.photos/300',
      'https://picsum.photos/200/300',
      'https://picsum.photos/400/300',
      'https://picsum.photos/300',
      'https://picsum.photos/300',
      'https://picsum.photos/200/300',
      'https://picsum.photos/400/300',
      'https://picsum.photos/400/300'
    ],
    thumbStyle: {
      bottom: '5px',
      borderRadius: '10px',
      backgroundColor: 'black',
      height: '8px',
      opacity: 0.5
    }
  }),
  mounted () {
  },
  methods: {
  }
}
</script>
<style scoped>
  .img-blank {
    width: 90px;
    height: 90px;
    border-radius: 10px;
  }
  .click-photo {
    width: 100%;
    height: 100%;
  }
  .button-remove {
    position: absolute;
    transform: translate(25%, -25%);
    top: -7px;
    right: 6px;
    z-index: 1;
  }
  .checkbox-border {
    border: 1px !important;
    border-radius: 5px !important;
  }
</style>
