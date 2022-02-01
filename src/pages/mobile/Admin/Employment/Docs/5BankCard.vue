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
                    color="red"
                    v-model="all_data.bank_card.card"
                    label="Номер пластиковой карты*"
                    mask="#### #### #### ####"
                    unmasked-value
                  )
                    template.q-pa-none(
                      v-slot:append
                      v-if="isFull(all_data.bank_card.card)"
                    )
                      svg.q-pl-none(width="12" height="8")
                        use.q-pl-none(xlink:href="check-mark.svg#check-mark")
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    bg-color="grey-2"
                    color="red"
                    v-model="all_data.bank_card.expired"
                    label="Дата окончания действия карты*"
                    mask="##/##"
                  )
                    template.q-pa-none(
                      v-slot:append
                      v-if="isFull(all_data.bank_card.expired)"
                    )
                      svg.q-pl-none(width="12" height="8")
                        use.q-pl-none(xlink:href="check-mark.svg#check-mark")
            q-item
              q-item-section
                q-item-label
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
  name: 'admin-register-modal-5',
  components: { OriginalButton, InactiveButton },
  props: {
    all_data: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    open: false,
    title: 'Проверьте правильность заполнения',
    subtitle: 'Банковская карта',
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
