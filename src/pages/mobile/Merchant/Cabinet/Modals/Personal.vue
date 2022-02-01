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
                    :error="errors.name_of_passport_creator != null"
                    :error-message="errors.name_of_passport_creator"
                    @input="() => errors.name_of_passport_creator = null"
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
                    :error="errors.name_of_passport_creator != null"
                    :error-message="errors.name_of_passport_creator"
                    @input="() => errors.name_of_passport_creator = null"
                  )
                    template.q-pa-none(
                      v-slot:append
                      v-if="isFull(modal.inputs.first_name)"
                    )
                      svg.q-pl-none(width="12" height="8")
                        use.q-pl-none(xlink:href="check-mark.svg#check-mark")
            q-item.q-pt-lg
              q-item-section
                q-item-label.text-h7
                  | Изменение пароля
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    bg-color="grey-2"
                    v-model="current_password"
                    label="Текущий пароль"
                    color="red"
                    :type="isCurrentPwd ? 'password' : 'text'"
                  )
                    template(
                      v-slot:append
                    )
                      q-icon(
                        :name="isCurrentPwd ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                        class="cursor-pointer"
                        @click="isCurrentPwd = !isCurrentPwd"
                      )
            q-item.q-mb-none
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    bg-color="grey-2"
                    v-model="password_first"
                    label="Придумайте новый пароль"
                    :color="password_first.length >= 8 ? 'green' : 'black'"
                    :type="isPwd ? 'password' : 'text'"
                    unmasked-value
                    :rules="[ val => val.length >= 8 || 'Пароль должен содержать не менее 8 символов' ]"
                    lazy-rules
                    hide-bottom-space
                  )
                    template(
                      v-slot:append
                    )
                      q-icon(
                        :name="isPwd ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      )
                  .q-pl-sm.q-ml-xs.text-green.font-size-12.q-pt-xs(
                    v-if="password_first.length >= 8"
                  ) Надежный пароль
            q-item.q-mb-xs.q-pt-xs
              q-item-section
                q-item-label
                  q-input(
                    input-style="border: 5px"
                    outlined
                    bg-color="grey-2"
                    v-model="password_second"
                    label="Повторите пароль"
                    :color="password_second.length >= 8 && password_first === password_second ? 'green' : 'black'"
                    :type="isPwd ? 'password' : 'text'"
                    unmasked-value
                    hide-bottom-space
                  )
                  .q-pl-sm.q-ml-xs.text-negative.font-size-12.q-pt-xs(
                    v-if="password_first !== password_second"
                  ) Пароли не совпадают
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
import Api from 'modules/api'
const api = new Api('User')
// import { openURL } from 'quasar'

export default {
  name: 'personal',
  components: { OriginalButton, InactiveButton },
  props: {
    all_data: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    current_password: '',
    password_first: '',
    password_second: '',
    isCurrentPwd: true,
    isPwd: true,
    modal: {
      open: true,
      title: 'Личная информация',
      inputs: {
        last_name: null,
        first_name: null
      },
      calendarDateOfBirthVisibility: false,
      calendarDateOfIssueVisibility: false
    },
    errors: {
      last_name: null,
      first_name: null,
      patronymic: null,
      passport_id: null,
      issuance: null,
      place_of_birth: null,
      code_subdivision: null,
      name_of_passport_creator: null,
      place_of_live: null
    }
  }),
  mounted () {
    this.modal.inputs.last_name = this.all_data.lastname
    this.modal.inputs.first_name = this.all_data.firstname
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
      fd.append('personal', true)
      fd.append('last_name', this.modal.inputs.last_name)
      fd.append('first_name', this.modal.inputs.first_name)
      // fd.append('patronymic', this.modal.inputs.patronymic)
      // if (this.modal.inputs.password)
      if (this.current_password !== null && this.current_password !== '') {
        fd.append('current_password', this.current_password)
        fd.append('password_first', this.password_first)
        fd.append('password_second', this.password_second)
      }
      api.call('saveMe', fd)
        .then(({ data }) => {
          this.modal.open = false
          // setTimeout(() => {
          this.$emit('close')
          // }, 500)
          if (this.current_password !== null && this.current_password !== '') {
            this.$q.notify('Изменения отправлены на проверку администратору, пароль обновлен')
          } else {
            this.$q.notify('Изменения отправлены на проверку администратору')
          }
        })
        .catch(this.$axios.errorHandler)
        .finally(() => {
          btn.offLoad()
        })
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
