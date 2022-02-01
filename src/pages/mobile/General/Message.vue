<template lang="pug">
  q-page.wrapper
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Назад"
            to="/home/merchant"
          )
    q-item
      q-item-section
        q-item-label
          .text-h4.text-weight-bolder.q-mb-md
            | Сообщение
    .q-content-spinner(v-if="loading")
      q-spinner-puff(
        color="red"
        size="3em"
      )
    div(v-else)
      q-item
        q-item-section
          q-item-label
            div(style="font-size: 13px") {{ date.format('DD MMMM YYYY, HH:mm') }}
              //- .notification.bg-grey-2.text-color-red
              //-   .text-black.text-weight-550.label-custom.q-pb-md(v-if="sender") {{ sender }}
              //-     div {{ label }}
              //-     div {{ message }}
            q-input(
              v-model="message"
              type="textarea"
              outlined
              bg-color="grey-2"
              color="red"
              autogrow
              readonly
              label-slot
              input-class="input-custom"
            )
              template(v-slot:label)
                .text-black.text-weight-550.label-custom {{ sender == null ? 'Системное' : sender }}
      q-item(
        v-if="photos.length > 0 || convertedUrls.length > 0 || docs.length > 0"
      )
        q-item-section
          q-item-label.text-weight-550
            | Вложения
      //- q-item
      //-   q-item-section
      //-     q-item-label(v-if="links.length != 0")
      //-       .q-pt-xs.row.q-col-gutter-sm.justify-between
      //-         .col-12(
      //-           v-for="(link, index) in links"
      //-           :key="index"
      //-         )
      //-           q-btn.q-pl-md.q-pr-sm.full-width(
      //-             color="grey-1"
      //-             outline
      //-             no-caps
      //-             padding="none"
      //-           )
      //-             .full-width
      //-               .div-no-wrap
      //-                 span.text-no-wrap.font-size-13.text-blue {{ link }}
      q-item.q-pt-none(v-if="photos.length > 0")
        q-item-section
          q-item-label
            .q-pt-xs.row.q-col-gutter-sm.justify-start
              .col-4(
                v-for="(photo, index) in photos"
                :key="index"
              )
                .relative-position
                  .click-photo(
                    v-gallery
                    :data-large="photo"
                  )
                    q-img.img-blank(
                      :src="photo"
                    )
      q-item(v-if="convertedUrls.length > 0")
        q-item-section
          q-item-label
            .q-pt-xs.row.q-col-gutter-sm.justify-start
              .col-4(
                v-for="(video, index) in convertedUrls"
                :key="index"
              )
                q-video.img-blank(
                  v-if="video != null || video != undefined"
                  :src="video"
                  :ratio="16/9"
                )
      q-item(v-if="docs.length > 0")
        q-item-section
          q-item-label
            .q-pt-xs.row.q-col-gutter-sm.justify-between
              .col-6(
                v-for="(doc, index) in docs"
                :key="index"
              )
                q-btn.q-pl-md.q-pr-sm.shadow-5.full-width(
                  no-caps
                  padding="none"
                  replace
                  @click="downloadDoc(index, doc)"
                )
                  .row.justify-between.full-width.items-center.no-wrap
                    .q-pr-sm.font-size-13.text-grey-5.ellipsis(tag="span") Документ №{{index + 1}}
      div(v-if="type === 'write_admin_employment'")
        q-item.q-pt-lg
          q-item-section
            q-item-label
              input(
                v-if="mode == 'spa'"
                ref="uploadFile"
                type="file"
                accept="image/*"
                @change="fileSelect"
                hidden
              )
              .row.items-center.justify-evenly.no-wrap
                q-btn.q-px-xl(
                  @click="mode == 'spa' ? $refs.uploadFile.click() : photoSelect()"
                  padding="md lg"
                  :disable="images.length > 9"
                  :color="images.length > 9 ? 'grey-1' : 'white'"
                  :class="{'shadow-7': images.length <= 9}"
                )
                  svg(width="22" height="22")
                    use(:xlink:href="images.length <= 9 ? 'clip.svg#clip' : 'white-clip.svg#white-clip'")
                q-btn.q-px-xl.q-ml-sm(
                  @click="mode == 'spa' ? $refs.uploadFile.click() : photoCamera()"
                  padding="md lg"
                  :disable="images.length > 9"
                  :color="images.length > 9 ? 'grey-1' : 'white'"
                  :class="{'shadow-7': images.length <= 9}"
                )
                  svg(width="24" height="22")
                    use(:xlink:href="images.length <= 9 ? 'camera.svg#camera' : 'white-camera.svg#white-camera'")
        q-item.q-pb-none.q-pt-md
          q-item-section
            .row.q-col-gutter-xs(
              v-if="images.length != 0"
            )
              .col-6.relative-position(
                v-for="(item, key) in images"
                :key="key"
              )
                q-img.img-blank-upload(
                  :src="url[item] ? url[item] : item"
                )
                  .click-photo-upload(
                    v-gallery
                    :data-large="url[item] ? url[item] : item"
                  )
                  .button-remove(
                    @click="onRemove(key)"
                  )
                    svg(width="21" height="24")
                      use(xlink:href="delete.svg#delete")
            .text-grey-6(
              v-else
            ) Размер фото не должен превышать 20 Мб
        q-item
          q-item-section
            q-item-label
              OriginalButton.q-my-sm(
                v-if="images.length"
                color="red-2"
                @click="sendPhotos"
              ) Отправить
              InactiveButton.q-my-sm(
                v-else
              ) Отправить
      //- a(
      //-   download="hello.docx"
      //-   :href="file"
      //-   id="link"
      //- ) Загрузить
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import _ from 'lodash'
// eslint-disable-next-line no-unused-vars
import getVideoId from 'get-video-id'
import Api from 'modules/api'
const api = new Api('User')
// import { exportFile } from 'quasar'
import { openURL } from 'quasar'
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
const { Camera } = Plugins

export default {
  components: { OriginalButton, InactiveButton },
  data: () => ({
    // testdata: null,
    file: null,
    loading: true,

    type: null,
    date: null,
    sender: null,
    title: null,
    message: null,
    photos: [],
    docs: [],
    convertedUrls: [],
    images: [],
    url: {},
    photo_id: null
  }),
  mounted () {
    // this.date = this.$moment().add(getRandomIntInclusive(-10, 0), 'day')
    api.call('showMessage', { id: this.$route.params.id })
      .then(({ data }) => {
        if (data.data) {
          if (data.data.type) {
            this.type = data.data.type
          }
        }

        this.date = this.$moment(data.created_at)
        this.label = data.label
        this.title = data.title
        this.message = data.message
        this.sender = data.sender
        this.photos = data.data.photos
        this.docs = data.data.docs
        this.photo_id = data.data.photo_id
        this.doc_name = data.data.doc_name

        _.each(data.data.videos, (val) => {
          const url = getVideoId(val)
          if (url.id) {
            if (url.service === 'youtube') {
              this.convertedUrls.push(`https://www.youtube.com/embed/${url.id}`)
            }
          }
        })
      })
      .finally(() => {
        this.loading = false
      })
  },

  computed: {
  },

  methods: {
    onRemove (index) {
      this.images.splice(index, 1)
    },
    fileDataURL (file) {
      return new Promise((resolve, reject) => {
        const fr = new FileReader()
        fr.onload = () => resolve(fr.result)
        fr.onerror = reject
        fr.readAsDataURL(file)
      })
    },
    sendPhotos (btn) {
      const fd = new FormData()

      _.each(this.images, (val) => {
        if (val.startsWith('data:')) {
          fd.append('new_images[]', this.$axios.dataURLtoBlob(val))
        } else {
          fd.append('new_images[]', val)
        }
      })

      fd.append('old_image', this.photos[0])
      fd.append('photo_id', this.photo_id)
      fd.append('doc_name', this.doc_name)
      // fd.append('new_images[]', this.images)

      api.call('resendPhotos', fd)
        .then(({ data }) => {
          this.$q.notify(data)
          // this.$router.push('/home/admin')
        })
        .catch(this.$axios.errorHandler)
        .finally(() => {
          btn.offLoad()
        })
        // .catch(this.$axios.errorHandler)
    },
    async fileSelect (files, file) {
      console.log(files, file)
      const image = await this.fileDataURL(this.$refs.uploadFile.files[0])

      this.images.push(image)
    },

    async photoSelect () {
      const image = await Camera.getPhoto({
        source: CameraSource.Photos,
        quality: 90,
        resultType: CameraResultType.DataUrl
      })

      this.images.push(image.dataUrl)
    },
    async photoCamera () {
      const image = await Camera.getPhoto({
        source: CameraSource.Camera,
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl
      })

      this.images.push(image.dataUrl)
    },
    downloadDoc (documentId) {
      api.call('downloadDoc', {
        id: this.$route.params.id,
        docId: documentId
      })
        .then(({ data }) => {
          // data
          // const blob = new Blob([`${data}`], { type: 'text/plain' })
          // return
          // eslint-disable-next-line no-unreachable
          openURL(data)
          // console.log(data

          // decodeURIComponent(escape(atob(this)))
          // String.prototype.b64decode = function () {
          //   return decodeURIComponent(escape(atob(this)))
          // }
          // this.testdata = decodeURIComponent(escape(atob(`${data}`)))

          // var url = 'http://example.com/order-results/' + documentId + '/export-pdf?' + '..params..'
          // window.open(url, '_blank')

          // const status = exportFile('file.docx', `${data}`, {
          //   // encoding: 'base64'
          //   // mimeType: 'text/csv;charset=windows-1252;'
          // })
          // if (status === true) {
          //   // browser allowed it
          // } else {
          //   // browser denied it
          //   console.error('Error: ' + status)
          // }
        })
        .finally(() => {
          this.loading = false
        })
    }
  },

  watch: {
  }
}
</script>
<style scoped lang="scss">
  .notification {
    border-radius: 5px;
    // border-style: dashed;
    border: 1px dashed rgba(0, 0, 0, 0.45);
    padding: 10px;
  }
  .wrapper {
    display:flex;
    flex-direction: column;
  }
  .div-no-wrap {
    width: 90%;
    align-self: self-end;
    display: flex;
  }
  .text-no-wrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .img-blank {
    height: 110px;
    border-radius: 5px;
  }
  .click-photo {
    width: 100%;
    height: 100%;
  }
  // .input-custom {
    // margin-top: 1px;
    // margin-bottom: 15px;
  // }
  .label-custom {
    font-size: 18px;
  }

  .img-blank-upload {
    height: 90px;
    border-radius: 5px;
  }
  .button-remove {
    position: absolute;
    right: 0px;
    height: 100%;
    top: 0px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .click-photo-upload {
    width: 100%;
    height: 100%;
    background: none;
  }
</style>
