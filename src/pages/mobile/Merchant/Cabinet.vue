<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Назад"
            to="/home/merchant"
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
            | Личный кабинет
    q-item.q-pb-none
      q-item-section
        q-item-label
          .text-weight-550 Личная информация:
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="passport.last_name"
            label="Фамилия*"
            color="red"
          )
            template.q-pa-none(
              v-slot:append
              v-if="isFull(passport.last_name)"
            )
              svg.q-pl-none(width="12" height="8")
                use.q-pl-none(xlink:href="check-mark.svg#check-mark")
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="passport.first_name"
            label="Имя*"
            color="red"
          )
            template.q-pa-none(
              v-slot:append
              v-if="isFull(passport.first_name)"
            )
              svg.q-pl-none(width="12" height="8")
                use.q-pl-none(xlink:href="check-mark.svg#check-mark")
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="passport.patronymic"
            label="Отчество*"
            color="red"
          )
            template.q-pa-none(
              v-slot:append
              v-if="isFull(passport.patronymic)"
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
            v-model="passport.birthday_at"
            mask="##.##.####"
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
                v-model="passport.birthday_at"
                mask="DD.MM.YYYY"
                minimal
                :locale="$utils.calendarLocale"
              )
    q-item
      q-item-section
        q-item-label
          .text-weight-550 Паспорт:
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="passport.passport_id"
            label="Серия и номер*"
            color="red"
            mask="##-##-######"
          )
            template.q-pa-none(
              v-slot:append
              v-if="isFull(passport.passport_id)"
            )
              svg.q-pl-none(width="12" height="8")
                use.q-pl-none(xlink:href="check-mark.svg#check-mark")
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="passport.name_of_passport_creator"
            label="Место выдачи*"
            color="red"
          )
            template.q-pa-none(
              v-slot:append
              v-if="isFull(passport.name_of_passport_creator)"
            )
              svg.q-pl-none(width="12" height="8")
                use.q-pl-none(xlink:href="check-mark.svg#check-mark")
    q-item
      q-item-section
        q-item-label
          .text-weight-550 Контактная информация:
    q-item
      q-item-section
        q-item-label
          q-input(
            bg-color="grey-2"
            outlined
            v-model="phone_number"
            label="Телефон*"
            color="red"
            mask="+7 (###) ###-##-##"
          )
            template.q-pa-none(
              v-slot:append
              v-if="isFull(phone_number)"
            )
              svg.q-pl-none(width="12" height="8")
                use.q-pl-none(xlink:href="check-mark.svg#check-mark")
    q-item
      q-item-section
        q-item-label
          q-input(
            bg-color="grey-2"
            outlined
            v-model="email"
            label="E-mail*"
            color="red"
          )
            template.q-pa-none(
              v-slot:append
              v-if="isFull(email)"
            )
              svg.q-pl-none(width="12" height="8")
                use.q-pl-none(xlink:href="check-mark.svg#check-mark")
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
// import _ from 'lodash'
import HeaderSettings from 'components/HeaderSettings'
import Api from 'modules/api'
const api = new Api('User')

export default {
  components: { HeaderSettings },
  data () {
    return {
      dialog: {
        open: false
      },
      passport: null,
      phone_number: null,
      email: null,
      calendarVisibility: false
    }
  },
  mounted () {
    api.call('showInfo')
      .then(({ data }) => {
        data = data.data
        this.passport = data.passport
        this.phone_number = data.phone_number
        this.email = data.email
      })
  },
  methods: {
    logOut () {
      this.$q.localStorage.remove('token')
      this.$router.push('/auth')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
    showCalendar () {
      this.calendarVisibility = !this.calendarVisibility
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
.border-radius-10 {
  border-radius: 10px
}
</style>
