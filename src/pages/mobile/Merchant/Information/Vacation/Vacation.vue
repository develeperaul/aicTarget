<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Информирование"
            to="/home/merchant/information"
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
            | Отпуск
    q-list.q-px-md(separator)
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="/home/merchant/information/vacation/payments")
              | Получить информацию по периодам ежегодного отпуска, а также по начисленным отпускным
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      //- q-item.no-padding
      //-   q-item-section
      //-     q-item-label
      //-       span.q-py-lg.row.justify-between.items-center.no-wrap(@click="downloadFile('/storage/common/blank_everyyear.doc')")
      //-         | Бланк на ежегодный отпуск
      //-         q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            span.q-py-lg.row.justify-between.items-center.no-wrap(@click="downloadFile('/storage/common/blank_transfer_everyyear.doc')")
              | Бланк на перенос ежегодного отпуска
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            span.q-py-lg.row.justify-between.items-center.no-wrap(@click="downloadFile('/storage/common/blank_administrative.doc')")
              | Бланк на административный отпуск
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="/home/merchant/information/vacation/annual")
              | Бланк на ежегодный отпуск
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-separator
    q-item
      q-item-section
        q-item-label
          .q-pt-lg.text-grey Фото/скан-копии заполненных бланков:
    q-item
      q-item-section
        q-item-label
          input(
            ref="uploadScan"
            type="file"
            accept="application/pdf"
            @change="scanSelect"
            hidden
          )
          input(
            v-if="mode == 'spa'"
            ref="uploadPhoto"
            type="file"
            accept="image/*"
            @change="fileSelect"
            hidden
          )
          .row.items-center.justify-evenly.no-wrap
            q-btn.q-px-xl(
              @click="downloadDialog.open = true"
              padding="md lg"
              :disable="images.length > 9"
              :color="images.length > 9 ? 'grey-1' : 'white'"
              :class="{'shadow-7': images.length <= 9}"
            )
              svg(width="22" height="22")
                use(:xlink:href="images.length <= 9 ? 'clip.svg#clip' : 'white-clip.svg#white-clip'")
            q-btn.q-px-xl.q-ml-sm(
              @click="mode == 'spa' ? $refs.uploadPhoto.click() : photoCamera()"
              padding="md lg"
              :disable="images.length > 9"
              :color="images.length > 9 ? 'grey-1' : 'white'"
              :class="{'shadow-7': images.length <= 9}"
            )
              svg(width="24" height="22")
                use(:xlink:href="images.length <= 9 ? 'camera.svg#camera' : 'white-camera.svg#white-camera'")
    q-dialog(
      content-class="q-dialog-padding-fixed"
      v-model="downloadDialog.open"
    )
      q-card.full-width
        q-card-section
          q-item.q-px-xs
            q-item-section
              q-item-label
                .text-h6.text-center.text-weight-bold.q-pt-md Вложение
                .text-grey.q-my-md.text-center.text-body1 Выберите способ вложения
                q-btn.q-my-sm.full-width(
                  @click="$refs.uploadScan.click()"
                  no-caps
                  outline
                ) Скан-копия в .pdf
                q-btn.q-my-sm.full-width(
                  @click="mode == 'spa' ? $refs.uploadPhoto.click() : photoSelect()"
                  no-caps
                  outline
                ) Изображение
                OriginalButton.q-mt-sm.full-width(
                  color="red-2"
                  @click="downloadDialog.open = false"
                ) Закрыть
    q-item.q-pb-none.q-pt-md
      q-item-section
        .row.q-col-gutter-xs(
          v-if="images.length != 0"
        )
          .col-6.relative-position(
            v-for="(item, key) in images"
            :key="key"
          )
            q-img.img-blank(
              :src="url[item] ? url[item] : item"
            )
              .click-photo(
                v-gallery
                :data-large="url[item] ? url[item] : item"
              )
              .button-remove(
                @click="onRemoveImg(key)"
              )
                svg(width="21" height="24")
                  use(xlink:href="delete.svg#delete")
        .text-grey-6(
          v-else
        ) Размер фото не должен превышать 20 Мб
    q-item(v-if="scans.length != 0")
      q-item-section
        q-item-label
          .q-pt-xs.row.q-col-gutter-sm.justify-between
            .col-6(
              v-for="(scan, key) in scans"
              :key="key"
            )
              q-btn.q-pl-md.q-pr-sm.shadow-5.full-width(
                no-caps
                padding="none"
              )
                .row.justify-between.full-width.items-center.no-wrap
                  .q-pr-sm.font-size-13.text-grey-5.ellipsis {{ scan.name }}
                  div(
                    @click="onRemoveScan(key)"
                    style="width: 29px"
                  )
                    q-icon(name="mdi-window-close" color="red-2" size="15px")
    q-item
      q-item-section
        q-item-label
          OriginalButton.q-my-sm(
            v-if="blanksUploaded()"
            color="red-2"
            @click="sendBlanks"
          ) Отправить
          InactiveButton.q-my-sm(
            v-else
          ) Отправить
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
import Api from 'modules/api'
const api = new Api('HomeMerchant')
import _ from 'lodash'
import { openURL } from 'quasar'
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import HeaderSettings from 'components/HeaderSettings'
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
const { Camera } = Plugins
export default {
  components: { OriginalButton, InactiveButton, HeaderSettings },
  data: () => ({
    downloadDialog: {
      open: false
    },
    images: [],
    scans: [],
    url: {},
    dialog: {
      open: false
    }
  }),
  computed: {
    mode () {
      return process.env.MODE
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
    sendBlanks (btn) {
      const fd = new FormData()

      _.each(this.images, (val) => {
        if (val.startsWith('data:')) {
          fd.append('photos[]', this.$axios.dataURLtoBlob(val))
        } else {
          fd.append('photos[]', val)
        }
      })

      _.each(this.scans, (val) => {
        if (val.data.startsWith('data:')) {
          fd.append('scans[]', this.$axios.dataURLtoBlob(val.data))
        } else {
          fd.append('scans[]', val.data)
        }
      })

      api.call('sendVacationBlanks', fd)
        .then(({ data }) => {
          this.$q.notify('Бланки отправлены')
          this.images = []
          this.scans = []
        })
        .catch()
        .finally(() => {
          btn.offLoad()
        })
    },
    blanksUploaded () {
      if (this.images.length > 0 || this.scans.length > 0) {
        return true
      } return false
    },
    onRemoveImg (index) {
      this.images.splice(index, 1)
      this.$refs[`${index}-slade`].reset()
    },

    onRemoveScan (index) {
      this.scans.splice(index, 1)
      this.$refs[`${index}-slade`].reset()
    },

    fileDataURL (file) {
      return new Promise((resolve, reject) => {
        const fr = new FileReader()
        fr.onload = () => resolve(fr.result)
        fr.onerror = reject
        fr.readAsDataURL(file)
      })
    },

    async fileSelect (files, file) {
      console.log(files, file)
      const image = await this.fileDataURL(this.$refs.uploadPhoto.files[0])

      this.images.push(image)
    },

    async scanSelect (files, file) {
      const scanName = this.$refs.uploadScan.files[0].name
      const scanData = await this.fileDataURL(this.$refs.uploadScan.files[0])

      this.scans.push({
        name: scanName,
        data: scanData
      })
    },

    async photoSelect () {
      const image = await Camera.getPhoto({
        source: CameraSource.Photos,
        quality: 90,
        resultType: CameraResultType.DataUrl
      })

      // console.log(image)
      this.images.push(image.dataUrl)
    },

    async photoCamera () {
      const image = await Camera.getPhoto({
        source: CameraSource.Camera,
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl
      })

      // console.log(image)
      this.images.push(image.dataUrl)
    },
    downloadFile (path) {
      // console.log(this.$axios.defaults.baseURL)
      openURL(`${this.$axios.defaults.baseURL}${path}`)
      // http://149.154.64.211/storage/common/filler_payform.pdf
    }
  },
  mounted () {
    Camera.requestPermissions()
      .then(() => {

      })
  }
}
</script>
<style lang="scss" scoped>
  .img-blank {
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
  .click-photo {
    width: 100%;
    height: 100%;
    background: none;
  }
</style>
