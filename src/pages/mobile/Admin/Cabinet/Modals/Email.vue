<template lang="pug">
  .q-pa-md.q-gutter-sm
    q-dialog(
      position="bottom"
      v-model="modal.open"
    )
      q-swipe-to-close(v-model="modal.open")
        q-card.no-border-radius
          q-card-section.q-py-sm.q-px-none.bg-grey-3
            q-item
              q-item-section
                q-item-label.text-h6.text-weight-bold
                  | {{ modal.title }}
              q-item-section(side)
                q-btn.bg-grey-4(
                  size="sm"
                  flat
                  round
                  color="grey-5"
                  icon="mdi-window-close"
                  @click="modal.open = false"
                )
          q-card-section.q-px-none.q-pt-md
            q-item
              q-item-section
                q-item-label
                  q-input(
                    outlined
                    hide-bottom-space
                    bg-color="grey-2"
                    v-model="modal.inputs.email"
                    label="E-mail"
                    color="red"
                    :error="errors.email != null"
                    :error-message="errors.email"
                    @input="() => errors.email = null"
                  )
                    template.q-pa-none(
                      v-slot:append
                      v-if="isFull(modal.inputs.email)"
                    )
                      svg.q-pl-none(width="12" height="8")
                        use.q-pl-none(xlink:href="check-mark.svg#check-mark")
            q-item
              q-item-section
                q-item-label
                  OriginalButton.q-my-sm(
                    v-if="everythingIsFull()"
                    color="red-2"
                    @click="save"
                  ) Сохранить изменения
                  InactiveButton.q-my-sm(
                    v-else
                  ) Сохранить изменения
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
// import _ from 'lodash'
import Api from 'modules/api'
const api = new Api('User')
// import { openURL } from 'quasar'

export default {
  name: 'contacts',
  components: { OriginalButton, InactiveButton },
  props: {
    all_data: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    modal: {
      open: true,
      title: 'Электронная  почта',
      inputs: {
        email: null
      },
      calendarDateOfBirthVisibility: false
    },
    errors: {
      email: null
    }
  }),
  mounted () {
    this.modal.inputs.email = this.all_data.email
  },
  watch: {
    'modal.open': {
      handler: function () {
        if (!this.modal.open) {
          setTimeout(() => {
            this.$emit('close')
          }, 500)
        }
      }
    }
  },
  methods: {
    save (btn) {
      const fd = new FormData()
      fd.append('email', this.modal.inputs.email)
      api.call('saveMe', fd)
        .then(({ data }) => {
          this.modal.open = false
          // setTimeout(() => {
          this.$emit('close')
          // }, 500)
          this.$q.notify('Изменения сохранены')
        })
        .finally(() => {
          btn.offLoad()
        })
    },
    isFull (input) {
      if (input === null || input === '') {
        return false
      } return true
    },
    everythingIsFull () {
      for (const item in this.modal.inputs) {
        if (this.modal.inputs[item] === '' || this.modal.inputs[item] === null) {
          return false
        }
      } return true
    },
    toggleCalendar (calendar) {
      if (calendar === 'birthday') {
        this.modal.calendarDateOfBirthVisibility = !this.modal.calendarDateOfBirthVisibility
      } else if (calendar === 'issuance') {
        this.modal.calendarDateOfIssueVisibility = !this.modal.calendarDateOfIssueVisibility
      }
    }
  }
}
</script>
