<template lang="pug">
  q-page
    .q-pb-xl.text-h4.text-weight-bolder
      | Личный кабинет
    .row.justify-center
      .col-6.q-pr-md
        .text-weight-550.q-pb-md.text-h6 Личная информация / паспорт
        q-item.q-px-none
          q-item-section
            q-item-label
              .text-grey.text-left.q-pb-sm ФИО*
              q-input(
                outlined
                hide-bottom-space
                bg-color="grey-2"
                v-model="fullname"
                label="Фамилия*"
                color="red"
              )
        q-item.q-px-none
          q-item-section
            q-item-label
              .text-grey.text-left.q-pb-sm Дата рождения*
              q-input(
                outlined
                hide-bottom-space
                bg-color="grey-2"
                color="red"
                ref="dataTarget"
                v-model="dateOfBirth"
                mask="##.##.####"
              )
                template(v-slot:append)
                  .text-body2.text-blue(
                    v-if="!calendarDateOfBirthVisibility"
                    @click="toggleCalendar('birthday')"
                  ) Выбрать
                  .text-body2.text-blue(
                    v-else
                    @click="toggleCalendar('birthday')"
                  ) Свернуть
              q-slide-transition
                q-item-label(
                  v-if="calendarDateOfBirthVisibility"
                  transition-show="slide-down"
                  transition-hide="slide-up"
                )
                  q-date.full-width(
                    flat
                    v-model="dateOfBirth"
                    mask="DD.MM.YYYY"
                    minimal
                    :locale="$utils.calendarLocale"
                  )
        q-item.q-px-none
          q-item-section
            q-item-label
              .text-grey.text-left.q-pb-sm Номер и серия документа*
              q-input(
                outlined
                hide-bottom-space
                bg-color="grey-2"
                v-model="seriesAndNumber"
                color="red"
                mask="##-##-######"
              )
        q-item.q-px-none
          q-item-section
            q-item-label
              .text-grey.text-left.q-pb-sm Место выдачи документа*
              q-input(
                outlined
                hide-bottom-space
                bg-color="grey-2"
                v-model="placeOfIssue"
                color="red"
              )
      .col-6.q-pl-md
        .text-weight-550.q-pb-md.text-h6 Контактная информация
        q-item.q-px-none
          q-item-section
            q-item-label
              .text-grey.text-left.q-pb-sm Телефон*
              q-input(
                bg-color="grey-2"
                outlined
                hide-bottom-space
                v-model="phone"
                color="red"
                mask="+7 (###) ###-##-##"
                unmasked-value
              )
        q-item.q-px-none
          q-item-section
            q-item-label
              .text-grey.text-left.q-pb-sm E-mail*
              q-input(
                bg-color="grey-2"
                outlined
                hide-bottom-space
                v-model="email"
                color="red"
              )
        q-item.q-px-none
          q-item-section
            q-item-label
              .text-grey.text-left.q-pb-sm Логин*
              q-input(
                bg-color="grey-2"
                outlined
                hide-bottom-space
                v-model="email"
                color="red"
              )
        q-item.q-px-none
          q-item-section
            q-item-label
              .text-grey.text-left.q-pb-sm Пароль*
              q-input(
                outlined
                bg-color="grey-2"
                v-model="password"
                color="red"
                :type="isPwd ? 'password' : 'text'"
              )
                template.q-pa-none(
                  v-slot:append
                )
                  q-icon(
                    :name="isPwd ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  )
    //- q-item.q-pb-none
    //-   q-item-section
    //-     q-item-label
    //-       .text-weight-550 Личная информация:
    //- q-item
    //-   q-item-section
    //-     q-item-label
    //-       q-input(
    //-         outlined
    //-         bg-color="grey-2"
    //-         v-model="fullname"
    //-         label="ФИО*"
    //-         color="red"
    //-       )
    //-         template.q-pa-none(
    //-           v-slot:append
    //-           v-if="isFull(fullname)"
    //-         )
    //-           svg.q-pl-none(width="12" height="8")
    //-             use.q-pl-none(xlink:href="check-mark.svg#check-mark")
    //- q-item
    //-   q-item-section
    //-     q-item-label
    //-       q-input(
    //-         outlined
    //-         bg-color="grey-2"
    //-         label="Дата рождения*"
    //-         color="red"
    //-         ref="dataTarget"
    //-         v-model="dateOfBirth"
    //-         mask="##.##.####"
    //-         fill-mask="-"
    //-         unmasked-value
    //-       )
    //-         template(v-slot:append)
    //-           .text-body2.text-blue(
    //-             v-if="!calendarDateOfBirthVisibility"
    //-             @click="toggleCalendar('dateOfBirth')"
    //-           ) Выбрать
    //-           .text-body2.text-blue(
    //-             v-else
    //-             @click="toggleCalendar('dateOfBirth')"
    //-           ) Свернуть
    //-     q-slide-transition
    //-       q-item-label(
    //-         v-if="calendarDateOfBirthVisibility"
    //-         transition-show="slide-down"
    //-         transition-hide="slide-up"
    //-       )
    //-         q-date.full-width(
    //-           flat
    //-           v-model="dateOfBirth"
    //-           mask="DD.MM.YYYY"
    //-           minimal
    //-           :locale="$utils.calendarLocale"
    //-         )
    //- q-item
    //-   q-item-section
    //-     q-item-label
    //-       .text-weight-550 Паспорт:
    //- q-item
    //-   q-item-section
    //-     q-item-label
    //-       q-input(
    //-         outlined
    //-         bg-color="grey-2"
    //-         v-model="seriesAndNumber"
    //-         label="Серия и номер*"
    //-         color="red"
    //-         mask="##-##-######"
    //-       )
    //-         template.q-pa-none(
    //-           v-slot:append
    //-           v-if="isFull(seriesAndNumber)"
    //-         )
    //-           svg.q-pl-none(width="12" height="8")
    //-             use.q-pl-none(xlink:href="check-mark.svg#check-mark")
    //- q-item
    //-   q-item-section
    //-     q-item-label
    //-       q-input(
    //-         outlined
    //-         bg-color="grey-2"
    //-         v-model="placeOfIssue"
    //-         label="Место выдачи*"
    //-         color="red"
    //-       )
    //-         template.q-pa-none(
    //-           v-slot:append
    //-           v-if="isFull(placeOfIssue)"
    //-         )
    //-           svg.q-pl-none(width="12" height="8")
    //-             use.q-pl-none(xlink:href="check-mark.svg#check-mark")
    //- q-item
    //-   q-item-section
    //-     q-item-label
    //-       .text-weight-550 Контактная информация:
    //- q-item
    //-   q-item-section
    //-     q-item-label
    //-       q-input(
    //-         bg-color="grey-2"
    //-         outlined
    //-         v-model="phone"
    //-         label="Телефон*"
    //-         color="red"
    //-         mask="+7 (###) ###-##-##"
    //-       )
    //-         template.q-pa-none(
    //-           v-slot:append
    //-           v-if="isFull(phone)"
    //-         )
    //-           svg.q-pl-none(width="12" height="8")
    //-             use.q-pl-none(xlink:href="check-mark.svg#check-mark")
    //- q-item
    //-   q-item-section
    //-     q-item-label
    //-       q-input(
    //-         bg-color="grey-2"
    //-         outlined
    //-         v-model="email"
    //-         label="E-mail*"
    //-         color="red"
    //-       )
    //-         template.q-pa-none(
    //-           v-slot:append
    //-           v-if="isFull(email)"
    //-         )
    //-           svg.q-pl-none(width="12" height="8")
    //-             use.q-pl-none(xlink:href="check-mark.svg#check-mark")
    q-footer.bg-white.footer-header.row.items-center(
      bordered
     )
      q-toolbar.max-width.q-px-xl
        q-toolbar-title
        .col-6
          .row.items-center.no-wrap.justify-end
            OriginalButton.q-mr-lg.text-black.q-px-lg(
              @click="auth"
            ) Отменить
            OriginalButton.q-px-lg(
              color="red-2"
              @click="auth"
            ) Сохранить изменения
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
export default {
  components: { OriginalButton },
  data () {
    return {
      fullname: 'Иванов Иван Иванович',
      dateOfBirth: '25.03.1988',
      seriesAndNumber: '0123456789',
      placeOfIssue: 'г. Уфа, ул. Революционная, 156',
      phone: '9991234567',
      email: 'example@google.com',
      password: '1234567',
      isPwd: true,
      calendarDateOfBirthVisibility: false,
      calendarDateOfIssueVisibility: false
    }
  },
  methods: {
    isFull (input) {
      if (input === null || input === '') {
        return false
      } return true
    },
    isEmail (val) {
      const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      if (regex.test(val)) {
        return true
      }
    },
    toggleCalendar (calendar) {
      if (calendar === 'birthday') {
        this.calendarDateOfBirthVisibility = !this.calendarDateOfBirthVisibility
      } else if (calendar === 'issuance') {
        this.calendarDateOfIssueVisibility = !this.calendarDateOfIssueVisibility
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .border-radius-10 {
    border-radius: 10px
  }
  .footer-header {
    height: 100px;
  }
  .max-width {
    max-width: 1440px;
    margin: 0 auto;
  }
</style>
