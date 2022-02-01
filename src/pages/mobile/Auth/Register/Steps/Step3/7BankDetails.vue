<template lang="pug">
  div
    q-item
      q-item-section
        q-item-label
          div {{label}}
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
              q-item
                q-item-section
                  q-item-label
                    q-input(
                      outlined
                      bg-color="grey-2"
                      color="red"
                      v-model="modal.inputs.bank_card"
                      label="Номер карты*"
                      mask="#### #### #### ####"
                      unmasked-value
                      hide-bottom-space
                      :error="errors.bank_card != null"
                      :error-message="errors.bank_card"
                      @input="() => errors.bank_card = null"
                    )
                      template.q-pa-none(
                        v-slot:append
                        v-if="isFull(modal.inputs.bank_card)"
                      )
                        svg.q-pl-none(width="12" height="8")
                          use.q-pl-none(xlink:href="check-mark.svg#check-mark")
              q-item
                q-item-section
                  q-item-label
                    q-input(
                      outlined
                      bg-color="grey-2"
                      color="red"
                      v-model="modal.inputs.payment_number"
                      label="Номер расчётного счёта*"
                      mask="####################"
                      unmasked-value
                      hide-bottom-space
                      :error="errors.payment_number != null"
                      :error-message="errors.payment_number"
                      @input="() => errors.payment_number = null"
                    )
                      template.q-pa-none(
                        v-slot:append
                        v-if="isFull(modal.inputs.payment_number)"
                      )
                        svg.q-pl-none(width="12" height="8")
                          use.q-pl-none(xlink:href="check-mark.svg#check-mark")
              q-item
                q-item-section
                  q-item-label
                    q-input(
                      outlined
                      bg-color="grey-2"
                      v-model="modal.inputs.last_name"
                      label="Фамилия*"
                      color="red"
                      hide-bottom-space
                      :error="errors.last_name != null"
                      :error-message="errors.last_name"
                      @input="() => errors.last_name = null"
                    )
                      template.q-pa-none(
                        v-slot:append
                        v-if="isFull(modal.inputs.last_name)"
                      )
                        svg.q-pl-none(width="12" height="8")
                          use.q-pl-none(xlink:href="check-mark.svg#check-mark")
              q-item
                q-item-section
                  q-item-label
                    q-input(
                      outlined
                      bg-color="grey-2"
                      v-model="modal.inputs.first_name"
                      label="Имя*"
                      color="red"
                      hide-bottom-space
                      :error="errors.first_name != null"
                      :error-message="errors.first_name"
                      @input="() => errors.first_name = null"
                    )
                      template.q-pa-none(
                        v-slot:append
                        v-if="isFull(modal.inputs.first_name)"
                      )
                        svg.q-pl-none(width="12" height="8")
                          use.q-pl-none(xlink:href="check-mark.svg#check-mark")
              q-item
                q-item-section
                  q-item-label
                    q-input(
                      outlined
                      bg-color="grey-2"
                      v-model="modal.inputs.patronymic"
                      label="Отчество*"
                      color="red"
                      hide-bottom-space
                      :error="errors.patronymic != null"
                      :error-message="errors.patronymic"
                      @input="() => errors.patronymic = null"
                    )
                      template.q-pa-none(
                        v-slot:append
                        v-if="isFull(modal.inputs.patronymic)"
                      )
                        svg.q-pl-none(width="12" height="8")
                          use.q-pl-none(xlink:href="check-mark.svg#check-mark")
              q-item
                q-item-section
                  q-item-label
                    q-input(
                      outlined
                      bg-color="grey-2"
                      color="red"
                      v-model="modal.inputs.bik"
                      label="БИК*"
                      hide-bottom-space
                      mask="#########"
                      unmasked-value
                      :error="errors.bik != null"
                      :error-message="errors.bik"
                      @input="() => errors.bik = null"
                    )
                      template.q-pa-none(
                        v-slot:append
                        v-if="isFull(modal.inputs.bik)"
                      )
                        svg.q-pl-none(width="12" height="8")
                          use.q-pl-none(xlink:href="check-mark.svg#check-mark")
              q-item
                q-item-section
                  q-item-label
                    q-input(
                      outlined
                      bg-color="grey-2"
                      color="red"
                      v-model="modal.inputs.inn"
                      label="ИНН/КПП*"
                      hide-bottom-space
                      mask="##########"
                      unmasked-value
                      :error="errors.inn != null"
                      :error-message="errors.inn"
                      @input="() => errors.inn = null"
                    )
                      template.q-pa-none(
                        v-slot:append
                        v-if="isFull(modal.inputs.inn)"
                      )
                        svg.q-pl-none(width="12" height="8")
                          use.q-pl-none(xlink:href="check-mark.svg#check-mark")
              q-item
                q-item-section
                  q-item-label
                    q-input(
                      outlined
                      bg-color="grey-2"
                      color="red"
                      v-model="modal.inputs.bank_name"
                      label="Официальное название банка*"
                      hide-bottom-space
                      :error="errors.bank_name != null"
                      :error-message="errors.bank_name"
                      @input="() => errors.bank_name = null"
                    )
                      template.q-pa-none(
                        v-slot:append
                        v-if="isFull(modal.inputs.bank_name)"
                      )
                        svg.q-pl-none(width="12" height="8")
                          use.q-pl-none(xlink:href="check-mark.svg#check-mark")
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
            @click="(btn) => { modal.open=true; btn.offLoad() }"
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
  name: 'register-step-3-section-7',
  components: { OriginalButton, InactiveButton },
  data: () => ({
    label: '07. Банковские реквизиты',
    modal: {
      open: false,
      title: 'Заполните пустые поля',
      subtitle: 'Банковские реквизиты',
      inputs: {
        bank_card: null,
        payment_number: null,
        last_name: null,
        first_name: null,
        patronymic: null,
        bik: null,
        inn: null,
        bank_name: null
      }
    },
    errors: {
      bank_card: null,
      payment_number: null,
      last_name: null,
      first_name: null,
      patronymic: null,
      bik: null,
      inn: null,
      bank_name: null
    },
    images: [],
    url: {}
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
    api.call('registerStep2Sub7Info', {
      params: {
        uuid: this.$parent.$attrs.uuid
      }
    })
      .then(({ data }) => {
        this.modal.inputs.bank_card = data.bank_card
        this.modal.inputs.payment_number = data.payment_number
        this.modal.inputs.last_name = data.last_name
        this.modal.inputs.first_name = data.first_name
        this.modal.inputs.patronymic = data.patronymic
        this.modal.inputs.bik = data.bik
        this.modal.inputs.inn = data.inn
        this.modal.inputs.bank_name = data.bank_name

        _.each(data.photos, (val) => { this.url[val.url] = val.asset })
        this.$nextTick(() => {
          this.images = _.map(data.photos, 'url')
        })
        // console.log(data)
      })
  },
  methods: {
    onRemove (index) {
      this.images.splice(index, 1)
      this.$refs[`${index}-slade`].reset()
    },
    everythingIsFull () {
      for (const item in this.modal.inputs) {
        if (this.modal.inputs[item] === '' || this.modal.inputs[item] === null || this.modal.inputs[item] === undefined) {
          return false
        }
      } return true
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
      api.call('registerStep2Sub7', fd)
        .then(({ data }) => {
          this.$emit('uuid-store', data.data.uuid)
          this.$emit('step-store', data.data.step)
          if (data.data.next_native) {
            if (data.data.back_native) {
              this.$emit('next-native', data.data.next_native, data.data.back_native)
            } else {
              this.$emit('next-native', data.data.next_native)
            }
          } else {
            this.$emit('next')
          }
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
