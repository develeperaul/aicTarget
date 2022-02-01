<template lang="pug">
  q-page.wrapper
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
          .text-h4.text-weight-bolder.q-mb-xs.text-no-wrap
            | Больничный
    div(v-if="!userInfo.is_medical")
      q-item
        q-item-section
          q-item-label
            .text-weight-550 Выберите даты начала и окончания больничного:
      q-item
        q-item-section
          q-item-label
            q-input(
              bg-color="grey-2"
              outlined
              label="Дата больничного"
              color="red"
              ref="dataTarget"
              @click="showCalendar()"
              :value="displayedPeriod"
            )
            q-slide-transition
              q-item-label(
                v-if="calendarVisibility"
                transition-show="slide-down"
                transition-hide="slide-up"
              )
                q-date.full-width(
                  ref="dateSickLeave"
                  flat
                  :range="endDateUnknown === false"
                  v-model="sickLeavePeriod"
                  mask="DD.MM.YYYY"
                  minimal
                  :locale="$utils.calendarLocale"
                  @click="setDisplayedPeriod()"
                )
      q-item
        q-item-section
          q-item-label
            q-checkbox(
              v-model="endDateUnknown"
              label="Дата окончания пока неизвестна"
            )
      q-item
        q-item-section
          q-item-label
            .q-pt-lg.text-weight-550 Фото больничного листа:
      q-item.q-pb-none.q-pt-sm
        q-item-section
          .row.q-col-gutter-xs(
            v-if="photos.length != 0"
          )
            .col-6.relative-position(
              v-for="(item, key) in photos"
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
                :disable="photos.length > 9"
                :color="photos.length > 9 ? 'grey-1' : 'white'"
                :class="{'shadow-7': photos.length <= 9}"
              )
                svg(width="22" height="22")
                  use(:xlink:href="photos.length <= 9 ? 'clip.svg#clip' : 'white-clip.svg#white-clip'")
              q-btn.q-px-xl.q-ml-sm(
                @click="mode == 'spa' ? $refs.uploadFile.click() : photoCamera()"
                padding="md lg"
                :disable="photos.length > 9"
                :color="photos.length > 9 ? 'grey-1' : 'white'"
                :class="{'shadow-7': photos.length <= 9}"
              )
                svg(width="24" height="22")
                  use(:xlink:href="photos.length <= 9 ? 'camera.svg#camera' : 'white-camera.svg#white-camera'")
      q-item.bottomButton
        q-item-section
          q-item-label
            OriginalButton(
              v-if="everythingIsFull()"
              color="red-2"
              @click="toVac"
            ) Отправить
            InactiveButton(
              v-else
            ) Отправить
    div.q-pt-md(v-else)
      q-item
        q-item-section
          q-item-label
            OriginalButton(
              color="red-2"
              @click="fromVac"
            ) Закрыть больничный
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
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
const { Camera } = Plugins

import Api from 'modules/api'
const api = new Api('HomeMerchant')
import _ from 'lodash'

export default {
  components: { OriginalButton, InactiveButton, HeaderSettings },
  data: () => ({
    sickLeavePeriod: {},
    photos: [],
    url: {},
    displayedPeriod: null,
    endDateUnknown: false,
    calendarVisibility: false,
    dialog: {
      open: false
    }
  }),
  watch: {
    endDateUnknown () {
      this.sickLeavePeriod = {}
      this.displayedPeriod = null
      if (this.calendarVisibility) this.$refs.dateSickLeave.editRange = undefined
    }
  },
  computed: {
    mode () {
      return process.env.MODE
    },
    userInfo () {
      return this.$store.getters['user/info']
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
    toVac (btn) {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })

      const fd = new FormData()

      if (this.endDateUnknown) {
        fd.append('period_start', this.sickLeavePeriod)
      } else {
        fd.append('period_start', this.sickLeavePeriod.from)
        fd.append('period_end', this.sickLeavePeriod.to)
      }

      _.each(this.photos, (val) => {
        if (val.startsWith('data:')) {
          fd.append('photos[]', this.$axios.dataURLtoBlob(val))
        } else {
          fd.append('photos[]', val)
        }
      })

      api.call('toVac', fd)
        .then(({ data }) => {
          this.$store.dispatch('user/fetchInfo')
            .then(() => {
              const info = this.$store.state.user.info
              if (info.has_need_fired) {
                this.$router.push('/fired')
              }
            })
          this.$q.notify('Данные отправлены')
          this.$router.push('/home/merchant/information')
        })
        .catch(this.$axios.errorHandler)
        .finally(() => {
          btn.offLoad()
        })
    },
    fromVac (btn) {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })

      api.call('fromVac')
        .then(({ data }) => {
          this.$store.dispatch('user/fetchInfo')
            .then(() => {
              const info = this.$store.state.user.info
              if (info.has_need_fired) {
                this.$router.push('/fired')
              }
            })
          this.$q.notify('Больничный закрыт')
          this.$router.push('/home/merchant/information')
          // this.$router.push('/home/admin')
        })
        .catch(this.$axios.errorHandler)
        .finally(() => {
          btn.offLoad()
        })
    },
    everythingIsFull () {
      if (this.endDateUnknown || this.displayedPeriod) {
        return true
      } return false
    },
    showCalendar () {
      this.calendarVisibility = !this.calendarVisibility
    },
    setDisplayedPeriod () {
      if (this.endDateUnknown) {
        if (this.sickLeavePeriod !== undefined) {
          this.displayedPeriod = this.sickLeavePeriod
        }
      } else {
        const from = this.sickLeavePeriod?.from
        const to = this.sickLeavePeriod?.to
        if (from !== undefined && to !== undefined) {
          this.displayedPeriod = from + ' - ' + to
        } else {
          this.sickLeavePeriod = {}
          this.displayedPeriod = null
        }
      }
    },
    onRemove (index) {
      this.photos.splice(index, 1)
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
      const image = await this.fileDataURL(this.$refs.uploadFile.files[0])

      this.photos.push(image)
    },

    async photoSelect () {
      const image = await Camera.getPhoto({
        source: CameraSource.Photos,
        quality: 90,
        resultType: CameraResultType.DataUrl
      })

      // console.log(image)
      this.photos.push(image.dataUrl)
    },
    async photoCamera () {
      const image = await Camera.getPhoto({
        source: CameraSource.Camera,
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl
      })

      // console.log(image)
      this.photos.push(image.dataUrl)
    }
  },
  mounted () {
  }
}
</script>
<style scoped lang="scss">
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
