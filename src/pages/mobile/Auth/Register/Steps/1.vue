<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row
          header-link(
            title="Авторизация"
            to="/auth"
          )
    q-item
      q-item-section
        q-item-label
          .text-h4.text-weight-bolder.text-center
            | Регистрация
          .q-my-md.text-center.text-grey
            | Заполните все поля и нажмите "Далее"
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            hide-bottom-space
            bg-color="grey-2"
            v-model="inputs.last_name"
            label="Фамилия*"
            color="red"
            :error="errors.last_name != null"
            :error-message="errors.last_name"
            @input="() => errors.last_name = null"
          )
            template.q-pa-none(
              v-slot:append
              v-if="isFull(inputs.last_name)"
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
            v-model="inputs.first_name"
            label="Имя*"
            color="red"
            :error="errors.first_name != null"
            :error-message="errors.first_name"
            @input="() => errors.first_name = null"
          )
            template.q-pa-none(
              v-slot:append
              v-if="isFull(inputs.first_name)"
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
            v-model="inputs.patronymic"
            label="Отчество*"
            color="red"
            :error="errors.patronymic != null"
            :error-message="errors.patronymic"
            @input="() => errors.patronymic = null"
          )
            template.q-pa-none(
              v-slot:append
              v-if="isFull(inputs.patronymic)"
            )
              svg.q-pl-none(width="12" height="8")
                use.q-pl-none(xlink:href="check-mark.svg#check-mark")
    q-item
      q-item-section
        q-item-label
          q-input(
            bg-color="grey-2"
            outlined
            hide-bottom-space
            label="Дата рождения*"
            color="red"
            v-model="inputs.birthday"
            mask="##.##.####"
            :error="errors.birthday != null"
            :error-message="errors.birthday"
            @input="() => errors.birthday = null"
          )
            template(v-slot:append)
              .text-body2.text-blue(
                v-if="!calendarVisibility"
                @click="showCalendar()"
              ) Выбрать
              .text-body2.text-blue(
                v-else
                @click="showCalendar()"
              ) Свернуть
          q-slide-transition
            q-item-label(
              v-if="calendarVisibility"
              transition-show="slide-down"
              transition-hide="slide-up"
            )
              q-date.full-width(
                flat
                v-model="inputs.birthday"
                mask="DD.MM.YYYY"
                minimal
                :locale="$utils.calendarLocale"
              )
    q-item
      q-item-section
        q-item-label
          q-input(
            bg-color="grey-2"
            outlined
            hide-bottom-space
            v-model="inputs.email"
            label="Электронная почта*"
            color="red"
            :error="errors.email != null"
            :error-message="errors.email"
            @input="() => errors.email = null"
          )
            template.q-pa-none(
              v-slot:append
              v-if="isFull(inputs.email)"
            )
              svg.q-pl-none(width="12" height="8")
                use.q-pl-none(xlink:href="check-mark.svg#check-mark")
    q-item
      q-item-section
        q-item-label
          q-input(
            bg-color="grey-2"
            outlined
            hide-bottom-space
            v-model="inputs.phone_number"
            :error="errors.phone_number != null"
            :error-message="errors.phone_number"
            @input="() => errors.phone_number = null"
            label="Номер телефона*"
            color="red"
            mask="+7 (###) ###-##-##"
            unmasked-value
          )
            template.q-pa-none(
              v-slot:append
              v-if="isFull(inputs.phone_number)"
            )
              svg.q-pl-none(width="12" height="8")
                use.q-pl-none(xlink:href="check-mark.svg#check-mark")
    q-item
      q-item-section
        q-item-label
          q-input(
            bg-color="grey-2"
            outlined
            hide-bottom-space
            label="Проект*"
            color="red"
            :value="inputs.project_id"
            :error="errors.project_id != null"
            :error-message="errors.project_id"
            @input="() => errors.project_id = null"
          )
            template(v-slot:append)
              .text-body2.text-blue(
                v-if="!listOfProjectsVisibility"
                @click="showListOfProjects()"
              ) Выбрать
              .text-body2.text-blue(
                v-else
                @click="showListOfProjects()"
              ) Свернуть
        q-slide-transition
          q-item-label(
            v-if="listOfProjectsVisibility"
            transition-show="slide-down"
            transition-hide="slide-up"
          )
            q-option-group(
              :options="projects"
              label="Projects"
              type="radio",
              v-model="inputs.project_id"
            )
    q-item.q-py-md
      q-item-section
        q-item-label.text-center
          .font-size-13.text-grey Нажимая на кнопку “Зарегистрироваться” Вы соглашаетесь на
            router-link.q-ml-xs.text-blue.text-weight-550(
              tag="span",
              to="#"
            ) обработку персональных данных
    q-item
      q-item-section
        q-item-label
          //- div(v-if="everythingIsFull()")
          OriginalButton.q-my-xs(
              color="red-2"
              @click="next"
            ) Зарегистрироваться
          //- div(v-else)
            InactiveButton(
            ) Зарегистрироваться
</template>
<script>
// import Utils from 'modules/utils'
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import _ from 'lodash'

import Api from 'modules/api'
const api = new Api('Auth')

export default {
  name: 'register-step-1',
  components: { OriginalButton, InactiveButton },
  data: () => ({
    inputs: {
      last_name: null,
      first_name: null,
      patronymic: null,
      birthday: null,
      email: null,
      phone_number: null,
      project_id: null
    },
    errors: {
      last_name: null,
      first_name: null,
      patronymic: null,
      birthday: null,
      email: null,
      phone_number: null,
      project_id: null
    },

    calendarVisibility: false,
    listOfProjectsVisibility: false,
    loading: false,

    projects: []
  }),
  mounted () {
    api.call('registerProjectList')
      .then(({ data }) => {
        _.each(data, (proj) => {
          this.projects.push({
            label: proj.name,
            value: proj.id
          })
        })
      })
  },
  methods: {
    next (btn) {
      // console.log(btn)
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })
      api.call('registerStep1', this.inputs)
        .then(({ data }) => {
          console.log(data)
          this.$emit('uuid-store', data.data.uuid)
          this.$emit('step-store', data.data.step)

          this.$emit('next')
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
    showCalendar () {
      this.calendarVisibility = !this.calendarVisibility
    },
    showListOfProjects () {
      this.listOfProjectsVisibility = !this.listOfProjectsVisibility
    },
    everythingIsFull () {
      for (const item in this.inputs) {
        if (this.inputs[item] === '' || this.inputs[item] === null || this.inputs[item] === undefined) {
          return false
        }
      } return true
    },
    isFull (input) {
      if (input === null || input === '') {
        return false
      } return true
    }
  }
}
</script>
<style scoped lang="scss">
</style>
