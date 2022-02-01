<template lang="pug">
  div
    q-item
      q-item-section
        q-item-label
          OriginalButton.q-my-xs(
            @click="(btn) => { open=true; btn.offLoad() }"
          ) Смотреть информацию
    q-dialog(
      position="bottom"
      v-model="open"
    )
      q-swipe-to-close(v-model="open")
        q-card.no-border-radius
          q-card-section.q-py-sm.q-px-none.bg-grey-3
            q-item
              q-item-section
                q-item-label
                  | {{ title }}
              q-item-section(side)
                q-btn.bg-grey-4(
                  size="sm"
                  flat
                  round
                  color="grey-5"
                  icon="mdi-window-close"
                  @click="open=false"
                )
          q-card-section.q-px-none.q-pt-md
            q-item
              q-item-section
                q-item-label.text-h6.text-weight-bold
                  | {{ subtitle }}
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    bg-color="grey-2"
                    v-model="all_data.passport.last_name"
                    label="Фамилия*"
                    color="red"
                  )
                    template.q-pa-none(
                      v-slot:append
                      v-if="isFull(all_data.passport.last_name)"
                    )
                      svg.q-pl-none(width="12" height="8")
                        use.q-pl-none(xlink:href="check-mark.svg#check-mark")
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    bg-color="grey-2"
                    v-model="all_data.first_name"
                    label="Имя*"
                    color="red"
                  )
                    template.q-pa-none(
                      v-slot:append
                      v-if="isFull(all_data.passport.first_name)"
                    )
                      svg.q-pl-none(width="12" height="8")
                        use.q-pl-none(xlink:href="check-mark.svg#check-mark")
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    bg-color="grey-2"
                    v-model="all_data.passport.patronymic"
                    label="Отчество*"
                    color="red"
                  )
                    template.q-pa-none(
                      v-slot:append
                      v-if="isFull(all_data.passport.patronymic)"
                    )
                      svg.q-pl-none(width="12" height="8")
                        use.q-pl-none(xlink:href="check-mark.svg#check-mark")
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    bg-color="grey-2"
                    label="Дата рождения*"
                    color="red"
                    ref="dataTarget"
                    v-model="all_data.passport.birthday_at"
                    mask="##.##.####"
                    fill-mask="-"
                    unmasked-value
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
                      v-model="all_data.passport.birthday_at"
                      mask="DD.MM.YYYY"
                      minimal
                      :locale="$utils.calendarLocale"
                    )
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    bg-color="grey-2"
                    v-model="all_data.passport.passport_id"
                    label="Серия и номер*"
                    color="red"
                    mask="##-##-######"
                  )
                    template.q-pa-none(
                      v-slot:append
                      v-if="isFull(all_data.passport.passport_id)"
                    )
                      svg.q-pl-none(width="12" height="8")
                        use.q-pl-none(xlink:href="check-mark.svg#check-mark")
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    bg-color="grey-2"
                    label="Дата выдачи*"
                    color="red"
                    ref="dataTarget"
                    v-model="all_data.passport.issuance_at"
                    mask="##.##.####"
                    fill-mask="-"
                    unmasked-value
                  )
                    template(v-slot:append)
                      .text-body2.text-blue(
                        v-if="!calendarDateOfIssueVisibility"
                        @click="toggleCalendar('issuance')"
                      ) Выбрать
                      .text-body2.text-blue(
                        v-else
                        @click="toggleCalendar('issuance')"
                      ) Свернуть
                q-slide-transition
                  q-item-label(
                    v-if="calendarDateOfIssueVisibility"
                    transition-show="slide-down"
                    transition-hide="slide-up"
                  )
                    q-date.full-width(
                      flat
                      v-model="all_data.passport.issuance_at"
                      mask="DD.MM.YYYY"
                      minimal
                      :locale="$utils.calendarLocale"
                    )
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    bg-color="grey-2"
                    v-model="all_data.passport.place_of_birth"
                    label="Место рождения*"
                    color="red"
                  )
                    template.q-pa-none(
                      v-slot:append
                      v-if="isFull(all_data.passport.place_of_birth)"
                    )
                      svg.q-pl-none(width="12" height="8")
                        use.q-pl-none(xlink:href="check-mark.svg#check-mark")
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    bg-color="grey-2"
                    v-model="all_data.passport.code_subdivision"
                    label="Код подразделения*"
                    color="red"
                    mask="###-###"
                  )
                    template.q-pa-none(
                      v-slot:append
                      v-if="isFull(all_data.passport.code_subdivision)"
                    )
                      svg.q-pl-none(width="12" height="8")
                        use.q-pl-none(xlink:href="check-mark.svg#check-mark")
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    bg-color="grey-2"
                    v-model="all_data.passport.name_of_passport_creator"
                    label="Наименование органа где выдан*"
                    color="red"
                  )
                    template.q-pa-none(
                      v-slot:append
                      v-if="isFull(all_data.passport.name_of_passport_creator)"
                    )
                      svg.q-pl-none(width="12" height="8")
                        use.q-pl-none(xlink:href="check-mark.svg#check-mark")
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    bg-color="grey-2"
                    v-model="all_data.passport.place_of_live"
                    label="Место жительства*"
                    color="red"
                  )
                    template.q-pa-none(
                      v-slot:append
                      v-if="isFull(all_data.passport.place_of_live)"
                    )
                      svg.q-pl-none(width="12" height="8")
                        use.q-pl-none(xlink:href="check-mark.svg#check-mark")
            q-item
              q-item-section
                q-item-label
                  OriginalButton.q-my-sm(
                    v-if="everythingIsFull()"
                    color="red-2"
                    @click="open = false"
                  ) Подтвердить
                  InactiveButton.q-my-sm(
                    v-else
                  ) Подтвердить
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
export default {
  name: 'admin-register-modal-1',
  components: { OriginalButton, InactiveButton },
  props: {
    photo: {
      type: String,
      required: false
    },
    all_data: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    open: false,
    title: 'Проверьте правильность заполнения',
    subtitle: 'Паспортные данные',
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
