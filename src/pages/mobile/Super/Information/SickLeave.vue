<template lang="pug">
  q-page.wrapper
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Информирование"
            to="/home/merchant/information"
          )
          header-avatar
            q-list
              q-item(clickable)
                q-item-section(no-wrap)
                  router-link(tag="span",to="#")
                    | Первая кнопка
              q-item(clickable)
                q-item-section(no-wrap)
                  router-link(tag="span",to="")
                    | Вторая кнопка
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
                  v-model="sickLeavePeriod"
                  mask="DD.MM.YYYY"
                  minimal
                  :locale="$utils.calendarLocale"
                  @click="setDisplayedPeriod()"
                  :range="!endDateUnknown"
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
                  inline-svg(width="21" height="24" :src="require('assets/delete.svg')")
          .text-grey-6(
            v-else
          ) Размер фото не должен превышать 20 Мб
      q-item
        q-item-section
          q-item-label
            file-input(
              v-if="mode == 'spa'"
              ref="uploadFile"
              accept="image/*"
              @change="fileSelect"
            )
            .row.items-center.justify-evenly.no-wrap
              q-btn.q-px-xl(
                @click="mode == 'spa' ? $refs.uploadFile.click() : photoSelect()"
                padding="md lg"
                :disable="photos.length > 9"
                :color="photos.length > 9 ? 'grey-1' : 'white'"
                :class="{'shadow-7': photos.length <= 9}"
              )
                inline-svg(width="22" height="22" :src="photos.length <= 9 ? require('assets/clip.svg') : require('assets/white-clip.svg#white-clip')")
              q-btn.q-px-xl.q-ml-sm(
                @click="mode == 'spa' ? $refs.uploadFile.click() : photoCamera()"
                padding="md lg"
                :disable="photos.length > 9"
                :color="photos.length > 9 ? 'grey-1' : 'white'"
                :class="{'shadow-7': photos.length <= 9}"
              )
                inline-svg(width="24" height="22" :src="photos.length <= 9 ? require('assets/camera.svg') : require('assets/white-camera.svg#white-camera')")
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
            q-input(
              bg-color="grey-2"
              outlined
              label="Дата зыкрытия больничного"
              color="red"
              ref="dataTarget"
              @click="showCalendar()"
              :value="periodEnd"
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
                  mask="DD.MM.YYYY"
                  minimal
                  :locale="$utils.calendarLocale"
                  v-model="periodEnd"
                )
                  //- @click="setDisplayedPeriod()"
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
                  inline-svg(width="21" height="24" :src="require('assets/delete.svg')")
          .text-grey-6(
            v-else
          ) Размер фото не должен превышать 20 Мб
      q-item
        q-item-section
          q-item-label.relative-position
            file-input(
              v-if="mode == 'spa'"
              ref="uploadFile"
              accept="image/*"
              @change="fileSelect"
            )
            .row.items-center.justify-evenly.no-wrap
              q-btn.q-px-xl(
                @click="mode == 'spa' ? $refs.uploadFile.click() : photoSelect()"
                padding="md lg"
                :disable="photos.length > 9"
                :color="photos.length > 9 ? 'grey-1' : 'white'"
                :class="{'shadow-7': photos.length <= 9}"
              )
                inline-svg(width="22" height="22" :src="photos.length <= 9 ? require('assets/clip.svg') : require('assets/white-clip.svg')")
              q-btn.q-px-xl.q-ml-sm(
                @click="mode == 'spa' ? $refs.uploadFile.click() : photoCamera()"
                padding="md lg"
                :disable="photos.length > 9"
                :color="photos.length > 9 ? 'grey-1' : 'white'"
                :class="{'shadow-7': photos.length <= 9}"
              )
                inline-svg(width="24" height="22" :src="photos.length <= 9 ? require('assets/camera.svg') : require('assets/white-camera.svg')")
      q-item.bottomButton
        q-item-section
          q-item-label
            OriginalButton(
              v-if="everythingIsFullClose()"
              color="red-2"
              @click="fromVac"
            ) Закрыть больничный
            InactiveButton(
              v-else
            ) Закрыть больничный
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
const { Camera } = Plugins

import Api from 'modules/api'
const api = new Api('HomeMerchant')
import _ from 'lodash'

export default {
  components: { OriginalButton, InactiveButton },
  data: () => ({
    sickLeavePeriod: {},
    photos: [],
    url: {},
    displayedPeriod: null,
    endDateUnknown: false,
    calendarVisibility: false,
    periodEnd: null
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

      _.each(this.photos, (val, key) => {
        if (val.startsWith('data:')) {
          fd.append('photos[]', this.$axios.dataURLtoBlob(val), `${key}.jpg`)
        } else {
          fd.append('photos[]', val)
        }
      })

      api.call('toVac', fd)
        .then(({ data }) => {
          this.$q.notify('Данные отправлены')
          // this.$router.push('/home/admin')
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
    fromVac (btn) {
      const fd = new FormData()
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })
      fd.append('period_end', this.periodEnd)
      _.each(this.photos, (val, key) => {
        if (val.startsWith('data:')) {
          fd.append('photos[]', this.$axios.dataURLtoBlob(val), `${key}.jpg`)
        } else {
          fd.append('photos[]', val)
        }
      })

      api.call('fromVac', fd)
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
    everythingIsFullClose () {
      return true
      // if (this.periodEnd) {
      //   return true
      // } return false
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
          // this.sickLeavePeriod = {}
          // this.displayedPeriod = null
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
      navigator.camera.getPicture(
        data => { // on success
          console.log(data)
          this.photos.push(`data:image/jpeg;base64,${data}`)
        },
        () => { // on fail
          this.$q.notify('Could not access device camera.')
        },
        {
          sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
          destinationType: navigator.camera.DestinationType.DATA_URL
        }
      )
    },
    async photoCamera () {
      await navigator.camera.getPicture(
        data => { // on success
          console.log(data)
          this.photos.push(`data:image/jpeg;base64,${data}`)
        },
        () => { // on fail
          this.$q.notify('Could not access device camera.')
        },
        {
          destinationType: 0
        }
      )
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
