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
              | Получить информацию по периодам ежегодного отпуска
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      //- q-item.no-padding
      //-   q-item-section
      //-     q-item-label
      //-       span.q-py-lg.row.justify-between.items-center.no-wrap(@click="downloadFile('/storage/common/blank_everyyear.doc')")
      //-         | Бланк на ежегодный отпуск
      //-         q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      //- q-item.no-padding
      //-   q-item-section
      //-     q-item-label
      //-       span.q-py-lg.row.justify-between.items-center.no-wrap(@click="getPayrollProcedure")
      //-         | Памятка о порядке начисления заработной платы
      //-         q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            span.q-py-lg.row.justify-between.items-center.no-wrap(@click="$refs.uploadPriod.click()")
              | Бланк на перенос ежегодного отпуска
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
            a(
                    href="https://atconnect.ru/storage/document_templates/vacation_period_change.doc"
                    download
                    ref="uploadPriod"
                    style="display:none"
                  )
      q-item.no-padding
        q-item-section
          q-item-label
            span.q-py-lg.row.justify-between.items-center.no-wrap(@click="$refs.uploadAdm.click()")
              | Бланк на административный отпуск
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
            a(
                    href="https://atconnect.ru/storage/document_templates/administrative_vacation.docx"
                    download
                    ref="uploadAdm"
                    style="display:none"
                  )
      q-item.no-padding
        q-item-section
          q-item-label
            span.q-py-lg.row.justify-between.items-center.no-wrap(@click="$refs.uploadAnn.click()")
              | Бланк на ежегодный отпуск
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
            a(
                href="https://atconnect.ru/storage/document_templates/annual_vacation.docx"
                download
                ref="uploadAnn"
                style="display:none"
              )
      q-separator
    q-item
      q-item-section
        q-item-label
          .q-pt-lg.text-grey Фото/скан-копии заполненных бланков:
    q-item
      q-item-section
        q-item-label
          file-input(
            ref="uploadScan"
            accept="application/pdf"
            @change="scanSelect"
          )
          file-input(
            v-if="mode == 'spa'"
            ref="uploadPhoto"
            accept="image/*"
            @change="fileSelect"
          )
          .row.items-center.justify-evenly.no-wrap
            q-btn.q-px-xl(
              @click="downloadDialog.open = true"
              padding="md lg"
              :disable="images.length > 9"
              :color="images.length > 9 ? 'grey-1' : 'white'"
              :class="{'shadow-7': images.length <= 9}"
            )
              inline-svg(width="22" height="22" :src="images.length <= 9 ? require('assets/clip.svg') : require('assets/white-clip.svg')")
            q-btn.q-px-xl.q-ml-sm(
              @click="mode == 'spa' ? $refs.uploadPhoto.click() : photoCamera()"
              padding="md lg"
              :disable="images.length > 9"
              :color="images.length > 9 ? 'grey-1' : 'white'"
              :class="{'shadow-7': images.length <= 9}"
            )
              inline-svg(width="24" height="22" :src="images.length <= 9 ? require('assets/camera.svg') : require('assets/white-camera.svg')")
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
                inline-svg(width="21" height="24" :src="require('assets/delete.svg')")
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
import mime from 'mime-types'
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
    getPayrollProcedure () {
      // getPlanogram
      this.$q.loading.show()
      api.call('getPayrollProcedure', this.project_id).then((r) => {
        const filename = 'Памятка по начислениям зарплаты'
        window.document.addEventListener('deviceready', () => {
          let storageLocation = ''

          switch (cordova.platformId.toLowerCase()) {
            case 'android':

              storageLocation = cordova.file.externalDataDirectory
              break

            case 'ios':
              storageLocation = cordova.file.documentsDirectory
              break
          }
          const folderPath = storageLocation
          console.log(mime.extension(r.data.type))
          window.resolveLocalFileSystemURL(
            folderPath,
            (dir) => {
              dir.getFile(
                filename,
                {
                  create: true
                },
                (file) => {
                  file.createWriter(
                    (fileWriter) => {
                      fileWriter.write(r.data)
                      console.log(file)
                      fileWriter.onwriteend = () => {
                        this.$q.loading.hide()
                        alert(`Файл успешно загружен в папку \n ${folderPath}${filename}.${mime.extension(r.data.type)}`)
                        // var url = file.toURL()
                        // console.log(cordova.file.externalApplicationStorageDirectory)
                        // console.log(`${folderPath}${filename}.${mime.extension(r.data.type)}`)
                        // cordova.plugins.fileOpener2.open(`${url}.${mime.extension(r.data.type)}`, r.data.type, {
                        //   error: function error (err) {
                        //     console.error(err)

                        //     alert(`url: ${url}. folder: ${folderPath}${filename}.${mime.extension(r.data.type)}`)
                        //   },
                        //   success: function success () {
                        //     console.log('success with opening the file')
                        //   }
                        // })
                      }

                      fileWriter.onerror = function (err) {
                        alert('Ошибка загрузки повторите еще')
                        console.error(err)
                      }
                    },
                    (err) => {
                      // failed
                      alert('Ошибка загрузки повторите еще')
                      this.$q.loading.hide()
                      console.error(err)
                    }
                  )
                },
                (err) => {
                  alert('Ошибка загрузки повторите еще')
                  this.$q.loading.hide()
                  console.error(err)
                }
              )
            },
            (err) => {
              this.$q.loading.hide()
              alert('Ошибка чтения файла')
              console.error(err)
            }
          )
        }, false)
      })
    },
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
      await navigator.camera.getPicture(
        data => { // on success
          console.log(data)
          this.images.push(`data:image/jpeg;base64,${data}`)
        },
        () => { // on fail
          this.$q.notify('Could not access device camera.')
        },
        {
          destinationType: 0
        }
      )
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
