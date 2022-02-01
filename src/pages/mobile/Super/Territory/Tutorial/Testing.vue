<template lang="pug">
  div
    .q-content-spinner(v-if="isLoading")
      q-spinner-puff(
        color="red"
        size="3em"
      )
    div(v-else)
      div(v-if="tests.length > 0")
        div(
          v-for="(test, index) in tests"
          :key="index"
        )
          q-banner.bg-grey-2.text-left(dense).q-px-md.q-my-md(
            transition-hide="slide-up"
          )
            .row.items-center.justify-between
              div(style="font-size: 17px") {{ test.description }}
          div(
            v-for="(question, index) in test.data"
            :key="index"
          )
            q-item
              q-item-section
                q-item-label.text-weight-550
                  | {{ question.title }}
            .col.q-pl-sm
              q-option-group(
                v-model="question.selected_answer"
                :options="question.answers"
                color="primary"
              )
          q-item
            q-item-section
              q-item-label
                OriginalButton(
                  color="red-2"
                  @click="(btn) => { dialog.open = true; test_id = test.id; btn.offLoad() }"
                ) Отправить
      .q-py-md.text-center(
        v-else
      ) Доступных тестов не найдено.
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
                .text-h6.text-center.text-weight-bold.q-mt-md Подтверждение
                .text-grey.q-my-md.text-center.text-body1 Отправить ответы?
                OriginalButton.q-mt-sm.full-width(
                  color="red-2"
                  @click="(btn) => testAccept(btn)"
                ) Отправить
                OriginalButton.q-mt-sm.full-width(
                  @click="dialog.open = false"
                ) Отмена
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'

import Api from 'modules/api'
const api = new Api('HomeMerchant')

import _ from 'lodash'
export default {
  name: 'tutorial-testing',
  components: { OriginalButton, InactiveButton },
  data: () => ({
    isLoading: false,
    test_id: null,
    tests: [],
    answers: [],
    dialog: {
      open: false
    }
  }),
  mounted () {
    this.showTests()
  },

  computed: {
  },

  methods: {
    showTests () {
      this.isLoading = true
      this.tests = []
      api.call('showTests')
        .then(({ data }) => {
          _.each(data, (test) => {
            this.tests.push({
              id: test.id,
              description: test.description,
              data: test.data
            })
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    testAccept (btn) {
      _.each(this.tests, (test) => {
        if (test.id === this.test_id) {
          _.each(test.data, (testData) => {
            this.answers.push({
              question: testData.title,
              answer: testData.selected_answer
            })
          })
        }
      })
      api.call('testAccept', {
        test_id: this.test_id,
        answers: this.answers
      })
        .then(({ data }) => {
          btn.offLoad()
          this.showTests()
          this.answers = []
          this.dialog.open = false
        })
    }
  },
  watch: {
  }
}
</script>
<style scoped lang="scss">
</style>
