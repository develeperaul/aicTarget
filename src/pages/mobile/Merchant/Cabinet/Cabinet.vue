<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Назад"
            :general="true"
          )
          header-settings
            q-list(style="width: 239px")
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
            | Личный кабинет
    q-item.q-pb-none
      q-item-section
        q-item-label.row.no-wrap.justify-between
          .text-weight-550 Личная информация:
          q-icon(
            name="mdi-pencil"
            color="black"
            size="24px"
            @click="current_modal = 'personal'"
          )
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="all_data.lastname"
            label="Фамилия"
            color="red"
            readonly
          )
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="all_data.firstname"
            label="Имя"
            color="red"
            readonly
          )
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="password"
            label="Пароль"
            color="red"
            type="password"
            readonly
          )
    q-item.q-mt-md
      q-item-section
        q-item-label.row.no-wrap.justify-between
          .text-weight-550 Паспорт:
          q-icon(
            name="mdi-pencil"
            color="black"
            size="24px"
            @click="current_modal = 'passport'"
          )
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="passport.last_name"
            label="Фамилия"
            color="red"
            readonly
          )
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="passport.first_name"
            label="Имя"
            color="red"
            readonly
          )
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="passport.patronymic"
            label="Отчество"
            color="red"
            readonly
          )
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            hide-bottom-space
            bg-color="grey-2"
            label="Дата рождения"
            color="red"
            v-model="passport.birthday_at"
            mask="##.##.####"
            readonly
          )
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="passport.passport_id"
            label="Серия и номер"
            color="red"
            mask="##-##-######"
            readonly
          )
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            label="Дата выдачи"
            color="red"
            ref="dataTarget"
            v-model="passport.issuance_at"
            mask="##.##.####"
            readonly
          )
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="passport.place_of_birth"
            label="Место рождения"
            color="red"
            readonly
            input-class="ellipsis"
          )
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="passport.code_subdivision"
            label="Код подразделения"
            color="red"
            mask="###-###"
            readonly
          )
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="passport.name_of_passport_creator"
            label="Наименование органа где выдан"
            color="red"
            readonly
            input-class="ellipsis"
          )
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="passport.place_of_live"
            label="Место жительства"
            color="red"
            readonly
            input-class="ellipsis"
          )
    q-item.q-mt-md
      q-item-section
        q-item-label.row.no-wrap.justify-between
          .text-weight-550 Номер телефона:
          q-icon(
            @click="current_modal = 'phone-number'"
            name="mdi-pencil"
            color="black"
            size="24px"
          )
    q-item
      q-item-section
        q-item-label
          q-input(
            bg-color="grey-2"
            outlined
            v-model="phone_number"
            label="Телефон"
            color="red"
            mask="+7 (###) ###-##-##"
            readonly
          )
    q-item.q-mt-md
      q-item-section
        q-item-label.row.no-wrap.justify-between
          .text-weight-550 Электронная почта:
          q-icon(
            @click="current_modal = 'email'"
            name="mdi-pencil"
            color="black"
            size="24px"
          )
    q-item.q-pb-lg
      q-item-section
        q-item-label
          q-input(
            bg-color="grey-2"
            outlined
            v-model="email"
            label="E-mail"
            color="red"
            readonly
          )
    component(
      :is="`${current_modal}`"
      @close="closeEvent"
      :all_data="all_data"
    )
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
// import _ from 'lodash'
import Api from 'modules/api'
const api = new Api('User')
import components from './Modals/index'

export default {
  components: { ...components, OriginalButton, InactiveButton },
  data () {
    return {
      current_modal: '',
      passport: null,
      password: 'default-password',
      phone_number: null,
      email: null,
      calendarVisibility: false,
      all_data: null,
      dialog: {
        open: false
      }
    }
  },
  mounted () {
    this.show()
  },
  methods: {
    logOut () {
      this.$q.localStorage.remove('token')
      this.$router.push('/auth')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
    show () {
      api.call('showInfo')
        .then(({ data }) => {
          data = data.data
          this.passport = data.passport
          this.phone_number = data.phone_number
          this.email = data.email
          // this.password = data.
          this.all_data = data
        })
    },
    showCalendar () {
      this.calendarVisibility = !this.calendarVisibility
    },
    isFull (input) {
      if (input === null || input === '') {
        return false
      } return true
    },
    everythingIsFull () {
      for (const item in this.modals.passport.inputs) {
        if (this.modals.passport.inputs[item] === '' || this.modals.passport.inputs[item] === null) {
          return false
        }
      } return true
    },
    closeEvent () {
      this.show()
      this.$nextTick(() => {
        this.current_modal = ''
      })
    },
    toggleCalendar (calendar) {
      if (calendar === 'birthday') {
        this.modals.passport.calendarDateOfBirthVisibility = !this.modals.passport.calendarDateOfBirthVisibility
      } else if (calendar === 'issuance') {
        this.modals.passport.calendarDateOfIssueVisibility = !this.modals.passport.calendarDateOfIssueVisibility
      }
    }
  }
}
</script>
<style scoped lang="scss">
.border-radius-10 {
  border-radius: 10px
}
</style>
