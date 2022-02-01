<template lang="pug">
  div
    q-item
      q-item-section
        q-item-label
          div {{label}}
    .q-content-spinner(v-if="loading")
      q-spinner-puff(
        color="red"
        size="3em"
      )
    div(v-else)
      .q-pa-xl.text-center(v-if="!need")
        | Для выбранного проекта заполнение СТС не требуется
        OriginalButton.q-my-xl(
              color="red-2"
              @click="next"
            ) Далее
      div(v-else)
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
        .q-pa-md.q-gutter-sm
          q-dialog(
            position="bottom"
            v-model="modal.open"
          )
            q-swipe-to-close(v-model="modal.open")
              q-card.no-border-radius
                q-card-section.q-py-sm.q-px-none.bg-grey-3
                  q-item
                    q-item-section
                      q-item-label
                        | {{ modal.title }}
                    q-item-section(side)
                      q-btn.bg-grey-4(
                        size="sm"
                        flat
                        round
                        color="grey-5"
                        icon="mdi-window-close"
                        @click="modal.open=false"
                      )
                q-card-section.q-px-none.q-pt-md
                  q-item
                    q-item-section
                      q-item-label.text-h6.text-weight-bold
                        | {{ modal.subtitle }}
                  //- q-item
                    q-item-section
                      q-item-label
                        q-input(
                          outlined
                          bg-color="grey-2"
                          v-model="modal.inputs.snilsNumber"
                          label="???????????????*"
                          color="red"
                          mask="### - ### - #####"
                        )
                          template.q-pa-none(
                            v-slot:append
                            v-if="isFull(modal.inputs.snilsNumber)"
                          )
                            svg.q-pl-none(width="12" height="8")
                              use.q-pl-none(xlink:href="check-mark.svg#check-mark")
                  //- q-item
                    q-item-section
                      q-item-label
                        router-link.text-blue.q-ml-sm.font-size-15(tag="span",to="") ?????????????????????????
                  q-item
                    q-item-section
                      q-item-label
                        OriginalButton.q-my-sm(
                          v-if="everythingIsFull()"
                          color="red-2"
                          @click="next"
                        ) Далее
                        InactiveButton.q-my-sm(
                          v-else
                        ) Далее
        q-item
          q-item-section
            q-item-label
              .text-grey-7.q-mb-md После загрузки фотографий заполните данные вручную, чтобы продолжить
        q-item
          q-item-section
            q-item-label
              OriginalButton.q-my-sm(
                v-if="photosUploaded()"
                color="red-2"
                @click="next"
              ) Далее
              InactiveButton.q-my-sm(
                v-else
              ) Далее
</template>
<script>
/* eslint-disable no-unreachable */
import _ from 'lodash'
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
const { Camera } = Plugins

import Api from 'modules/api'
const api = new Api('Auth')

export default {
  name: 'register-step-3-section-10',
  components: { OriginalButton, InactiveButton },
  data: () => ({
    label: '10. СТС',
    modal: {
      open: false,
      title: 'Заполните пустые поля',
      subtitle: 'СТС',
      inputs: {
      }
    },
    images: [],
    url: {},
    loading: true,
    has_need: true
  }),
  computed: {
    mode () {
      return process.env.MODE
    }
  },
  mounted () {
    Camera.requestPermissions()
      .then(() => {

      })
    api.call('registerStep2Sub10Info', {
      params: {
        uuid: this.$parent.$attrs.uuid
      }
    })
      .then(({ data }) => {
        // this.modal.inputs.last_name = data.last_name
        // this.modal.inputs.first_name = data.first_name
        // this.modal.inputs.patronymic = data.patronymic
        // this.modal.inputs.birthday = data.birthday
        // this.modal.inputs.passport_id = data.passport_id
        // this.modal.inputs.issuance = data.issuance
        // this.modal.inputs.place_of_birth = data.place_of_birth
        // this.modal.inputs.code_subdivision = data.code_subdivision
        // this.modal.inputs.name_of_passport_creator = data.name_of_passport_creator
        // this.modal.inputs.place_of_live = data.place_of_live

        _.each(data.photos, (val) => { this.url[val.url] = val.asset })
        this.$nextTick(() => {
          this.images = _.map(data.photos, 'url')
        })

        this.need = data.need
        // console.log(data)
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    onRemove (index) {
      this.images.splice(index, 1)
      this.$refs[`${index}-slade`].reset()
    },
    everythingIsFull () {
      // for (const item in this.modal.inputs) {
      //   if (this.modal.inputs[item] === '' || this.modal.inputs[item] === null || this.modal.inputs[item] === undefined) {
      //     return false
      //   }
      // }
      return true
    },
    photosUploaded () {
      if (this.images.length !== 0) {
        return true
      } return false
    },
    next (btn) {
      // this.$emit('next')
      // console.log(this.images)
      // btn.offLoad()
      // return
      // console.log(btn)
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })
      const fd = new FormData()
      _.each(
        this.modal.inputs,
        (val, key) => fd.append(key, val)
      )

      _.each(this.images, (val) => {
        if (val.startsWith('data:')) {
          fd.append('photos[]', this.$axios.dataURLtoBlob(val))
        } else {
          fd.append('photos[]', val)
        }
      })

      fd.append('uuid', this.$parent.$attrs.uuid)
      api.call('registerStep2Sub10', fd)
        .then(({ data }) => {
          this.$emit('uuid-store', data.data.uuid)
          this.$emit('step-store', data.data.step)

          this.$router.push('/auth/register/upload-completed')
        })
        .catch((data) => {
          const errors = data.response.data.errors

          _.each(errors, (messages, key) => {
            console.log(key, this.errors[key])
            if (this.errors[key] !== undefined) {
              this.errors[key] = messages[0]
            }
          })
          console.log(errors)
        })
        .finally(() => {
          btn.offLoad()
        })
    },
    isFull (input) {
      if (input === null || input === '') {
        return false
      } return true
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

      this.images.push(image)
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
    }
  }
}
</script>
<style scoped lang="scss">
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
