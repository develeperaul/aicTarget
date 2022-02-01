<template lang="pug">
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
                q-item-label.text-h6.text-weight-bold
                  | {{ modal.title }}
              q-item-section(side)
                q-btn.bg-grey-4(
                  size="sm"
                  flat
                  round
                  color="grey-5"
                  icon="mdi-window-close"
                  @click="modal.open = false"
                )
          q-card-section.q-px-none.q-pt-md
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    hide-bottom-space
                    bg-color="grey-2"
                    v-model="modal.inputs.last_name"
                    label="Фамилия"
                    color="red"
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
                    hide-bottom-space
                    bg-color="grey-2"
                    v-model="modal.inputs.first_name"
                    label="Имя"
                    color="red"
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
                    hide-bottom-space
                    bg-color="grey-2"
                    v-model="modal.inputs.patronymic"
                    label="Отчество"
                    color="red"
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
                    hide-bottom-space
                    bg-color="grey-2"
                    label="Дата рождения"
                    color="red"
                    ref="dataTarget"
                    v-model="modal.inputs.birthday_at"
                    mask="##.##.####"
                    :error="errors.birthday_at != null"
                    :error-message="errors.birthday_at"
                    @input="() => errors.birthday_at = null"
                  )
                    template(v-slot:append)
                      .text-body2.text-blue(
                        v-if="!modal.calendarDateOfBirthVisibility"
                        @click="toggleCalendar('birthday')"
                      ) Выбрать
                      .text-body2.text-blue(
                        v-else
                        @click="toggleCalendar('birthday')"
                      ) Свернуть
                q-slide-transition
                  q-item-label(
                    v-if="modal.calendarDateOfBirthVisibility"
                    transition-show="slide-down"
                    transition-hide="slide-up"
                  )
                    q-date.full-width(
                      flat
                      v-model="modal.inputs.birthday_at"
                      mask="DD.MM.YYYY"
                      minimal
                      :locale="$utils.calendarLocale"
                    )
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    hide-bottom-space
                    bg-color="grey-2"
                    v-model="modal.inputs.passport_id"
                    label="Серия и номер"
                    color="red"
                    mask="##-##-######"
                    unmasked-value
                    :error="errors.passport_id != null"
                    :error-message="errors.passport_id"
                    @input="() => errors.passport_id = null"
                  )
                    template.q-pa-none(
                      v-slot:append
                      v-if="isFull(modal.inputs.passport_id)"
                    )
                      svg.q-pl-none(width="12" height="8")
                        use.q-pl-none(xlink:href="check-mark.svg#check-mark")
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    hide-bottom-space
                    bg-color="grey-2"
                    label="Дата выдачи"
                    color="red"
                    ref="dataTarget"
                    v-model="modal.inputs.issuance_at"
                    mask="##.##.####"
                    :error="errors.issuance_at != null"
                    :error-message="errors.issuance_at"
                    @input="() => errors.issuance_at = null"
                  )
                    template(v-slot:append)
                      .text-body2.text-blue(
                        v-if="!modal.calendarDateOfIssueVisibility"
                        @click="toggleCalendar('issuance')"
                      ) Выбрать
                      .text-body2.text-blue(
                        v-else
                        @click="toggleCalendar('issuance')"
                      ) Свернуть
                q-slide-transition
                  q-item-label(
                    v-if="modal.calendarDateOfIssueVisibility"
                    transition-show="slide-down"
                    transition-hide="slide-up"
                  )
                    q-date.full-width(
                      flat
                      v-model="modal.inputs.issuance_at"
                      mask="DD.MM.YYYY"
                      minimal
                      :locale="$utils.calendarLocale"
                    )
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    hide-bottom-space
                    bg-color="grey-2"
                    v-model="modal.inputs.place_of_birth"
                    label="Место рождения"
                    color="red"
                    :error="errors.place_of_birth != null"
                    :error-message="errors.place_of_birth"
                    @input="() => errors.place_of_birth = null"
                  )
                    template.q-pa-none(
                      v-slot:append
                      v-if="isFull(modal.inputs.place_of_birth)"
                    )
                      svg.q-pl-none(width="12" height="8")
                        use.q-pl-none(xlink:href="check-mark.svg#check-mark")
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    hide-bottom-space
                    bg-color="grey-2"
                    v-model="modal.inputs.code_subdivision"
                    label="Код подразделения"
                    color="red"
                    mask="###-###"
                    unmasked-value
                    :error="errors.code_subdivision != null"
                    :error-message="errors.code_subdivision"
                    @input="() => errors.code_subdivision = null"
                  )
                    template.q-pa-none(
                      v-slot:append
                      v-if="isFull(modal.inputs.code_subdivision)"
                    )
                      svg.q-pl-none(width="12" height="8")
                        use.q-pl-none(xlink:href="check-mark.svg#check-mark")
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    hide-bottom-space
                    bg-color="grey-2"
                    v-model="modal.inputs.name_of_passport_creator"
                    label="Наименование органа где выдан"
                    color="red"
                    :error="errors.name_of_passport_creator != null"
                    :error-message="errors.name_of_passport_creator"
                    @input="() => errors.name_of_passport_creator = null"
                  )
                    template.q-pa-none(
                      v-slot:append
                      v-if="isFull(modal.inputs.name_of_passport_creator)"
                    )
                      svg.q-pl-none(width="12" height="8")
                        use.q-pl-none(xlink:href="check-mark.svg#check-mark")
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    hide-bottom-space
                    bg-color="grey-2"
                    v-model="modal.inputs.place_of_live"
                    label="Место жительства"
                    color="red"
                    :error="errors.place_of_live != null"
                    :error-message="errors.place_of_live"
                    @input="() => errors.place_of_live = null"
                  )
                    template.q-pa-none(
                      v-slot:append
                      v-if="isFull(modal.inputs.place_of_live)"
                    )
                      svg.q-pl-none(width="12" height="8")
                        use.q-pl-none(xlink:href="check-mark.svg#check-mark")
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
                  OriginalButton.q-my-sm(
                    v-if="everythingIsFull()"
                    color="red-2"
                    @click="save"
                  ) Сохранить изменения
                  InactiveButton.q-my-sm(
                    v-else
                  ) Сохранить изменения
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
// import _ from 'lodash'
import Api from 'modules/api'
const api = new Api('User')
// import { openURL } from 'quasar'
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
const { Camera } = Plugins

export default {
  name: 'passport',
  components: { OriginalButton, InactiveButton },
  props: {
    all_data: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    modal: {
      open: true,
      title: 'Паспортные данные',
      inputs: {
        last_name: null,
        first_name: null,
        patronymic: null,
        birthday_at: null,
        passport_id: null,
        issuance_at: null,
        place_of_birth: null,
        code_subdivision: null,
        name_of_passport_creator: null,
        place_of_live: null
      },
      calendarDateOfBirthVisibility: false,
      calendarDateOfIssueVisibility: false
    },
    errors: {
      last_name: null,
      first_name: null,
      patronymic: null,
      birthday_at: null,
      passport_id: null,
      issuance_at: null,
      place_of_birth: null,
      code_subdivision: null,
      name_of_passport_creator: null,
      place_of_live: null
    },
    errorDialog: {
      open: false,
      title: 'Произошла ошибка!',
      subtitle: 'Размер фото превышает 20 Мб!'
    },
    images: [],
    url: {}
  }),
  mounted () {
    this.modal.inputs.last_name = this.all_data.passport.last_name
    this.modal.inputs.first_name = this.all_data.passport.first_name
    this.modal.inputs.patronymic = this.all_data.passport.patronymic
    this.modal.inputs.birthday_at = this.all_data.passport.birthday_at
    this.modal.inputs.passport_id = this.all_data.passport.passport_id
    this.modal.inputs.issuance_at = this.all_data.passport.issuance_at
    this.modal.inputs.place_of_birth = this.all_data.passport.place_of_birth
    this.modal.inputs.code_subdivision = this.all_data.passport.code_subdivision
    this.modal.inputs.name_of_passport_creator = this.all_data.passport.name_of_passport_creator
    this.modal.inputs.place_of_live = this.all_data.passport.place_of_live
  },
  computed: {
    mode () {
      return process.env.MODE
    }
  },
  watch: {
    'modal.open': {
      handler: function () {
        if (!this.modal.open) {
          setTimeout(() => {
            this.$emit('close')
          }, 500)
        }
      }
    }
  },
  methods: {
    save (btn) {
      const fd = new FormData()
      fd.append('passport', true)
      fd.append('last_name', this.modal.inputs.last_name)
      fd.append('first_name', this.modal.inputs.first_name)
      fd.append('patronymic', this.modal.inputs.patronymic)
      fd.append('birthday_at', this.modal.inputs.birthday_at)
      fd.append('passport_id', this.modal.inputs.passport_id)
      fd.append('issuance_at', this.modal.inputs.issuance_at)
      fd.append('place_of_birth', this.modal.inputs.place_of_birth)
      fd.append('code_subdivision', this.modal.inputs.code_subdivision)
      fd.append('name_of_passport_creator', this.modal.inputs.name_of_passport_creator)
      fd.append('place_of_live', this.modal.inputs.place_of_live)

      this.images.forEach((image) => {
        fd.append('photos[]', image)
      })
      api.call('saveMe', fd)
        .then(({ data }) => {
          this.modal.open = false
          this.$emit('close')
          this.$q.notify('Изменения отправлены на проверку администратору')
        })
        .finally(() => {
          btn.offLoad()
        })
    },
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
    isFull (input) {
      if (input === null || input === '') {
        return false
      } return true
    },
    everythingIsFull () {
      for (const item in this.modal.inputs) {
        if (this.modal.inputs[item] === '' || this.modal.inputs[item] === null) {
          return false
        }
      } return true
    },
    toggleCalendar (calendar) {
      if (calendar === 'birthday') {
        this.modal.calendarDateOfBirthVisibility = !this.modal.calendarDateOfBirthVisibility
      } else if (calendar === 'issuance') {
        this.modal.calendarDateOfIssueVisibility = !this.modal.calendarDateOfIssueVisibility
      }
    }
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
