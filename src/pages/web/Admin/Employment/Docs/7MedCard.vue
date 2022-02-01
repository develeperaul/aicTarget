<template lang="pug">
  div
    q-item.q-px-none.q-pt-none
      q-item-section
        q-item-label
          .text-grey.text-left.q-pb-sm.font-size-15 Дата окончания действия мед. книжки
          q-input(
            outlined
            bg-color="grey-2"
            color="red"
            ref="dataTarget"
            v-model="all_data.medcard.medcard_ended_at"
            mask="##.##.####"
          )
            template(v-slot:append)
              .text-body2.text-blue(
                v-if="!calendarExpirationDateVisibility"
                @click="toggleCalendar('expirationDate')"
              ) Выбрать
              .text-body2.text-blue(
                v-else
                @click="toggleCalendar('expirationDate')"
              ) Свернуть
        q-slide-transition
          q-item-label(
            v-if="calendarExpirationDateVisibility"
            transition-show="slide-down"
            transition-hide="slide-up"
          )
            q-date.full-width(
              flat
              v-model="all_data.medcard.medcard_ended_at"
              mask="DD.MM.YYYY"
              minimal
              :locale="$utils.calendarLocale"
            )
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
export default {
  name: 'admin-register-7',
  components: { OriginalButton, InactiveButton },
  props: {
    all_data: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    calendarExpirationDateVisibility: false
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
      if (calendar === 'expirationDate') {
        this.calendarExpirationDateVisibility = !this.calendarExpirationDateVisibility
      }
    }
  }
}
</script>
<style scoped>

</style>
