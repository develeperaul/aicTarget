<template lang="pug">
  div
    q-item.q-px-none.q-pt-none
      q-item-section
        q-item-label
          .text-grey.text-left.q-pb-sm.font-size-15 Стаж
          q-input(
            outlined
            bg-color="grey-2"
            color="red"
            v-model="all_data.work_card.experience"
          )
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
export default {
  name: 'admin-register-8',
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
