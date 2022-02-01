<template lang="pug">
  div
    q-item.q-px-none.q-pt-none
      q-item-section
        q-item-label
          .text-grey.text-left.q-pb-sm.font-size-15 Номер пластиковой карты
          q-input(
            outlined
            bg-color="grey-2"
            color="red"
            v-model="all_data.bank_card.card"
            mask="#### #### #### ####"
            unmasked-value
          )
    q-item.q-px-none
      q-item-section
        q-item-label
          .text-grey.text-left.q-pb-sm.font-size-15 Дата окончания действия карты
          q-input(
            outlined
            bg-color="grey-2"
            color="red"
            v-model="all_data.bank_card.expired"
            mask="##/##"
          )
    q-item.q-px-none
      q-item-section
        q-item-label
          .text-grey.text-left.q-pb-sm.font-size-15 Вид платежной системы
          q-input(
            bg-color="grey-2"
            outlined
            label="Вид платежной системы*"
            color="red"
            :value="all_data.bank_card.provider"
          )
            template(v-slot:append)
              .text-body2.text-blue(
                v-if="!listOfTypesVisibility"
                @click="showListOfTypes()"
              ) Выбрать
              .text-body2.text-blue(
                v-else
                @click="showListOfTypes()"
              ) Свернуть
        q-slide-transition
          q-item-label(
            v-if="listOfTypesVisibility"
            transition-show="slide-down"
            transition-hide="slide-up"
          )
            q-option-group(
              :options="typesOfPayment"
              label="Notifications"
              type="radio",
              v-model="all_data.bank_card.provider"
            )
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
export default {
  name: 'admin-register-5',
  components: { OriginalButton, InactiveButton },
  props: {
    all_data: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    listOfTypesVisibility: false,
    typesOfPayment: [
      {
        label: 'Mastercard',
        value: 'mastercard'
      },
      {
        label: 'VISA',
        value: 'visa'
      },
      {
        label: 'Мир',
        value: 'mir'
      }
    ]
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
    showListOfTypes () {
      this.listOfTypesVisibility = !this.listOfTypesVisibility
    }
  }
}
</script>
<style scoped>

</style>
