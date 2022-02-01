<template lang="pug">
  div
    q-item.q-px-none.q-pt-none
      q-item-section
        q-item-label
          .text-grey.text-left.q-pb-sm.font-size-15 Номер карты
          q-input(
            outlined
            bg-color="grey-2"
            color="red"
            v-model="all_data.bank_account.bank_card"
            mask="#### #### #### ####"
            unmasked-value
          )
    q-item.q-px-none
      q-item-section
        q-item-label
          .text-grey.text-left.q-pb-sm.font-size-15 Номер расчётного счёта
          q-input(
            outlined
            bg-color="grey-2"
            color="red"
            v-model="all_data.bank_account.payment_number"
          )
    q-item.q-px-none
      q-item-section
        q-item-label
          .text-grey.text-left.q-pb-sm.font-size-15 Фамилия
          q-input(
            outlined
            bg-color="grey-2"
            v-model="all_data.bank_account.last_name"
            color="red"
          )
    q-item.q-px-none
      q-item-section
        q-item-label
          .text-grey.text-left.q-pb-sm.font-size-15 Имя
          q-input(
            outlined
            bg-color="grey-2"
            v-model="all_data.bank_account.first_name"
            color="red"
          )
    q-item.q-px-none
      q-item-section
        q-item-label
          .text-grey.text-left.q-pb-sm.font-size-15 Отчество
          q-input(
            outlined
            bg-color="grey-2"
            v-model="all_data.bank_account.patronymic"
            color="red"
          )
    q-item.q-px-none
      q-item-section
        q-item-label
          .text-grey.text-left.q-pb-sm.font-size-15 БИК
          q-input(
            outlined
            bg-color="grey-2"
            color="red"
            v-model="all_data.bank_account.bik"
          )
    q-item.q-px-none
      q-item-section
        q-item-label
          .text-grey.text-left.q-pb-sm.font-size-15 ИНН/КПП
          q-input(
            outlined
            bg-color="grey-2"
            color="red"
            v-model="all_data.bank_account.inn"
          )
    q-item.q-px-none
      q-item-section
        q-item-label
          .text-grey.text-left.q-pb-sm.font-size-15 Официальное название банка
          q-input(
            outlined
            bg-color="grey-2"
            color="red"
            v-model="all_data.bank_account.bank_name"
          )
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
export default {
  name: 'admin-register-6',
  components: { OriginalButton, InactiveButton },
  props: {
    all_data: {
      type: Object,
      required: false
    }
  },
  data: () => ({
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
    }
  }
}
</script>
<style scoped>

</style>
