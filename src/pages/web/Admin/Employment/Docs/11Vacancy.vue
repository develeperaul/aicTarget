<template lang="pug">
  div
    q-item.q-px-none.q-pt-none
      q-item-section
        q-item-label
          .text-grey.text-left.q-pb-sm.font-size-15 Вакансия
          q-input(
            outlined
            bg-color="grey-2"
            v-model="all_data.passport.last_name"
            color="red"
          )
    //- q-item.q-px-none
    //-   q-item-section
    //-     q-item-label
    //-       .text-grey.text-left.q-pb-sm.font-size-15 Имя
    //-       q-input(
    //-         outlined
    //-         bg-color="grey-2"
    //-         v-model="all_data.first_name"
    //-         color="red"
    //-       )
    //- q-item.q-px-none
    //-   q-item-section
    //-     q-item-label
    //-       .text-grey.text-left.q-pb-sm.font-size-15 Отчество
    //-       q-input(
    //-         outlined
    //-         bg-color="grey-2"
    //-         v-model="all_data.passport.patronymic"
    //-         color="red"
    //-       )
    //- q-item.q-px-none
    //-   q-item-section
    //-     q-item-label
    //-       .text-grey.text-left.q-pb-sm.font-size-15 Дата рождения
    //-       q-input(
    //-         outlined
    //-         bg-color="grey-2"
    //-         color="red"
    //-         ref="dataTarget"
    //-         v-model="all_data.passport.birthday_at"
    //-         mask="##.##.####"
    //-         fill-mask="-"
    //-         unmasked-value
    //-       )
    //-         template(v-slot:append)
    //-           .text-body2.text-blue(
    //-             v-if="!calendarDateOfBirthVisibility"
    //-             @click="toggleCalendar('birthday')"
    //-           ) Выбрать
    //-           .text-body2.text-blue(
    //-             v-else
    //-             @click="toggleCalendar('birthday')"
    //-           ) Свернуть
    //-     q-slide-transition
    //-       q-item-label(
    //-         v-if="calendarDateOfBirthVisibility"
    //-         transition-show="slide-down"
    //-         transition-hide="slide-up"
    //-       )
    //-         q-date.full-width(
    //-           flat
    //-           v-model="all_data.passport.birthday_at"
    //-           mask="DD.MM.YYYY"
    //-           minimal
    //-           :locale="$utils.calendarLocale"
    //-         )
    //- q-item.q-px-none
    //-   q-item-section
    //-     q-item-label
    //-       .text-grey.text-left.q-pb-sm.font-size-15 Серия и номер
    //-       q-input(
    //-         outlined
    //-         bg-color="grey-2"
    //-         v-model="all_data.passport.passport_id"
    //-         color="red"
    //-         mask="##-##-######"
    //-       )
    //- q-item.q-px-none
    //-   q-item-section
    //-     q-item-label
    //-       .text-grey.text-left.q-pb-sm.font-size-15 Дата выдачи
    //-       q-input(
    //-         outlined
    //-         bg-color="grey-2"
    //-         color="red"
    //-         ref="dataTarget"
    //-         v-model="all_data.passport.issuance_at"
    //-         mask="##.##.####"
    //-         fill-mask="-"
    //-         unmasked-value
    //-       )
    //-         template(v-slot:append)
    //-           .text-body2.text-blue(
    //-             v-if="!calendarDateOfIssueVisibility"
    //-             @click="toggleCalendar('issuance')"
    //-           ) Выбрать
    //-           .text-body2.text-blue(
    //-             v-else
    //-             @click="toggleCalendar('issuance')"
    //-           ) Свернуть
    //-     q-slide-transition
    //-       q-item-label(
    //-         v-if="calendarDateOfIssueVisibility"
    //-         transition-show="slide-down"
    //-         transition-hide="slide-up"
    //-       )
    //-         q-date.full-width(
    //-           flat
    //-           v-model="all_data.passport.issuance_at"
    //-           mask="DD.MM.YYYY"
    //-           minimal
    //-           :locale="$utils.calendarLocale"
    //-         )
    //- q-item.q-px-none
    //-   q-item-section
    //-     q-item-label
    //-       .text-grey.text-left.q-pb-sm.font-size-15 Место рождения
    //-       q-input(
    //-         outlined
    //-         bg-color="grey-2"
    //-         v-model="all_data.passport.place_of_birth"
    //-         color="red"
    //-       )
    //- q-item.q-px-none
    //-   q-item-section
    //-     q-item-label
    //-       .text-grey.text-left.q-pb-sm.font-size-15 Код подразделения
    //-       q-input(
    //-         outlined
    //-         bg-color="grey-2"
    //-         v-model="all_data.passport.code_subdivision"
    //-         color="red"
    //-         mask="###-###"
    //-       )
    //- q-item.q-px-none
    //-   q-item-section
    //-     q-item-label
    //-       .text-grey.text-left.q-pb-sm.font-size-15 Наименование органа где выдан
    //-       q-input(
    //-         outlined
    //-         bg-color="grey-2"
    //-         v-model="all_data.passport.name_of_passport_creator"
    //-         color="red"
    //-       )
    //- q-item.q-px-none
    //-   q-item-section
    //-     q-item-label
    //-       .text-grey.text-left.q-pb-sm.font-size-15 Место жительства
    //-       q-input(
    //-         outlined
    //-         bg-color="grey-2"
    //-         v-model="all_data.passport.place_of_live"
    //-         color="red"
    //-       )
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
export default {
  name: 'admin-register-9',
  components: { OriginalButton, InactiveButton },
  props: {
    all_data: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    calendarDateOfBirthVisibility: false,
    calendarDateOfIssueVisibility: false
  }),
  mounted () {
  },
  methods: {
    isFull (input) {
      if (input === null || input === '') {
        return false
      } return true
    },
    everythingIsFull () {
      // for (const item in this.modal.inputs) {
      //   if (this.modal.inputs.item === '' || this.modal.inputs.item === null) {
      //     return false
      //   }
      // } return true

      // _.each(this.modal.inputs, (key, val) => {
      //   if (val === '' || val === null) {
      //     return false
      //   }
      // })
      return true
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
<style scoped>

</style>
