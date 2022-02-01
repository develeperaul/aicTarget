<template lang="pug">
  div(

  )
    .text-weight-550.font-size-22.q-pt-lg Видеоматериал/фото/документы
    .row.q-pt-lg
      .col-6(
        v-for="(image, indexPhoto) in images"
        :key="indexPhoto"
        :class="indexPhoto % 2 == 0 ? 'q-pr-md' : 'q-pl-md'"
      )
        q-card.q-mb-lg(
          flat
          bordered
          style="height: 180px"
        )
          q-card-section.row.q-pa-sm.items-center.no-wrap(

          )
            div(
              v-gallery
              :data-large="image"
            )
              q-img.img-blank(
                :src="image"
              )
            .q-pl-md.q-pr-sm.full-width
              .text-weight-550.q-pb-sm Название файла.mp4
              .text-grey-7.text-left.q-pb-xs.font-size-15  Редактировать название
              q-input(
                outlined
                bg-color="grey-2"
                v-model="file_name"
                color="red"
              )
          q-btn.bg-grey-4.button-remove(
            size="sm"
            flat
            round
            color="grey-5"
            icon="mdi-window-close"
            @click="index_remove = indexPhoto; dialogs.open_material = true"
          )
          //- onRemoveMaterial(indexPhoto)
      q-dialog(
        content-class="q-dialog-padding-fixed"
        v-model="dialogs.open_material"
        persistant
      )
        q-card
          q-card-section
            q-item.q-px-xs
              q-item-section
                q-item-label
                  .text-h6.text-center.text-weight-bold.q-mt-md Удаление
                  .text-grey.q-my-md.text-center.text-body1 Вы действительно хотите удалить материал?
                  .column
                    OriginalButton.q-mt-sm.text-red-2(
                      @click="onRemoveMaterial(index_remove)"
                    ) Удалить материал
                    OriginalButton.q-mt-sm(
                      @click="dialogs.open_material = false"
                    ) Отмена
    .text-weight-550.font-size-22.q-pt-lg Ссылки
    .row.q-pt-lg
      .col-6(
        v-for="(link, indexLink) in links"
        :key="indexLink"
        :class="indexLink % 2 == 0 ? 'q-pr-md' : 'q-pl-md'"
      )
        q-card.q-mb-lg.items-center.row(
          flat
          bordered
          style="height: 228px"
        )
          q-card-section.row.q-pa-sm.items-center.full-width
            .q-px-sm.full-width
              .text-weight-550.q-pb-md Название ссылки
              .text-blue.div-no-wrap.text-weight-550.q-pb-md
                span.text-no-wrap {{ link }}
              .text-grey-7.text-left.q-pb-xs.font-size-15 Название ссылки
              q-input(
                outlined
                bg-color="grey-2"
                v-model="link_name"
                color="red"
              )
          q-btn.bg-grey-4.button-remove(
            size="sm"
            flat
            round
            color="grey-5"
            icon="mdi-window-close"
            @click="index_remove = indexLink; dialogs.open_link = true"
          )
    q-dialog(
      content-class="q-dialog-padding-fixed"
      v-model="dialogs.open_link"
      persistant
    )
      q-card
        q-card-section
          q-item.q-px-xs
            q-item-section
              q-item-label
                .text-h6.text-center.text-weight-bold.q-mt-md Удаление
                .text-grey.q-my-md.text-center.text-body1 Вы действительно хотите удалить ссылку?
                .column
                  OriginalButton.q-mt-sm.text-red-2(
                    @click="onRemoveLink(index_remove)"
                  ) Удалить ссылку
                  OriginalButton.q-mt-sm(
                    @click="dialogs.open_link = false"
                  ) Отмена
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import _ from 'lodash'
import Api from 'modules/api'
const api = new Api('Admin')
// eslint-disable-next-line no-unused-vars
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core'
// eslint-disable-next-line no-unused-vars
const { Camera } = Plugins

// eslint-disable-next-line no-unused-vars
const { Filesystem } = Plugins

// eslint-disable-next-line no-unused-vars
import getVideoId from 'get-video-id'
export default {
  name: 'admin-tutorial-1',
  components: { OriginalButton, InactiveButton },
  props: {
    removeall: {
      type: Boolean,
      required: false
    }
  },
  data: () => ({
    index_remove: null,
    file_name: 'Название файла',
    link_name: 'Название ссылки',
    dialogs: {
      open_material: false,
      open_link: false
    },
    label: null,
    errors: {
      label: null
    },
    employees: [],
    user_ids: [],
    message: null,
    holdActive: false,
    selectAll: false,
    search: null,
    images: [
      'https://picsum.photos/400/300',
      'https://picsum.photos/200/300',
      'https://picsum.photos/300',
      'https://picsum.photos/300',
      'https://picsum.photos/200/300',
      'https://picsum.photos/400/300'
    ],
    links: [
      'https://www.figma.com/file/SuYskGwBZUgqoX7zOkHjqJYskGwBZUgqoX7zOHjqJYskGwB',
      'https://www.figma.com/file/SuYskGwBZUgqoX7zOkHjqJYskGwBZUgqoX7zOHjqJYskGwB'
    ]
  }),
  beforeDestroy () {
    this.$root.$off('header-search')
    this.$root.$off('select-all')
  },
  mounted () {
    this.$root.$on('header-search', (val) => { this.search = val })
    this.$root.$on('select-all', (val) => { this.selectAll = val })
    api.call('showEmployees')
      .then(({ data }) => {
        data = data.data
        for (let i = 0; i < data.length; i++) {
          this.employees.push({
            id: i,
            last_name: data[i].last_name,
            first_name: data[i].first_name,
            patronymic: data[i].patronymic,
            project_name: data[i].project_name,
            territory: data[i].project_name,
            selected: false
          })
        }
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
        console.log('final')
      })
  },
  computed: {
    mode () {
      return process.env.MODE
    }
  },
  watch: {
    selectAll () {
      if (this.selectAll) {
        this.employees.forEach(elem => {
          elem.selected = true
        })
      } else {
        this.employees.forEach(elem => {
          elem.selected = false
        })
      }

      // if (!this.holdActive) {
      //   this.holdActive = true
      // }
    },
    removeall () {
      if (this.removeall) {
        alert('123')
        this.$parent.removeall = false
      }
    }
  },
  // computed: {
  //   user_ids () {
  //     for (let i = 0; i < this.employees.length; i++) {
  //       if (this.employees[i].selected) {
  //         this.user_ids.push(this.employees[i].id)
  //       }
  //     }
  //     return this.user_ids
  //   }
  // },
  methods: {
    removeAlll () {
      alert('123')
    },
    test () {
    },
    onRemoveMaterial (index) {
      this.images.splice(index, 1)
      // this.$refs[`${index}-slade`].reset()
      this.dialogs.open_material = false
    },
    onRemoveLink (index) {
      this.links.splice(index, 1)
      // this.$refs[`${index}-slade`].reset()
      this.dialogs.open_link = false
    },
    onLoad (index, done) {
    // setTimeout(() => {
    //   if (this.employees) {
    //     this.employees.push({
    //       fullName: 'Самсонов Гурий Андреевич',
    //       dateOfBirth: '20.12.1980',
    //       proj: 'Проект 4'
    //     },
    //     {
    //       fullName: 'Веселов Владимир Ефимович',
    //       dateOfBirth: '16.03.1995',
    //       proj: 'Проект 5'
    //     },
    //     {
    //       fullName: 'Герасимов Рудольф Лукьевич',
    //       dateOfBirth: '20.12.1997',
    //       proj: 'Проект 6'
    //     })
    //     done()
    //   }
    // }, 1000)
    }
    // handleHold (evt, indexEmployer) {
    //   this.holdActive = true
    //   this.employees[indexEmployer].selected = true
    // },
  }

}
</script>
<style lang="scss" scoped>
  .footer-header {
    height: 177px;
  }
  .checkbox-border {
    border: 1px !important;
    border-radius: 5px !important;
  }
  .button-remove {
    position: absolute;
    transform: translate(25%, -25%);
    top: -7px;
    right: 6px;
    z-index: 1;
  }
  .img-blank {
    width: 160px;
    height: 160px;
    border-radius: 10px;
  }
  .div-no-wrap {
    width: 100%;
    align-self: self-end;
    display: flex;
  }
  .text-no-wrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
