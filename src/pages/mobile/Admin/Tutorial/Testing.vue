<template lang="pug">
  div
    q-item
      q-item-section
        q-item-label
          q-select(
            :options="projects"
            v-model="project"
            outlined
            color="red"
            label="Выбрать проект"
            behavior="menu"
            menu-anchor="bottom left"
            dense
            @input="showTests"
          )
    q-btn.font-size-15(
      v-if="tests.length !== 0"
      :label="testsListShown ? 'Свернуть список' : 'Развернуть список'"
      @click="testsListShown = !testsListShown"
      no-caps
      flat
      :ripple="false"
    )
      q-icon.q-pr-md(v-if="testsListShown" name="mdi-chevron-up" size="22px")
      q-icon.q-pr-md(v-else name="mdi-chevron-down" size="22px")
    q-slide-transition
      q-item-label(
        v-if="testsListShown"
        transition-show="slide-down"
        transition-hide="slide-up"
      )
        div(
          v-for="(test, index) in tests"
          :key="index"
        )
          q-banner.bg-grey-2.text-left(dense).q-px-md.q-my-md(
            transition-hide="slide-up"
          )
            .row.items-center.justify-between
              div(style="font-size: 17px") {{ test.title }}
              q-icon(
                name="mdi-dots-horizontal"
                size="29px"
                :class="menus[index].open ? 'text-primary' : 'text-grey' "
              )
                q-menu(
                  v-model="menus[index].open"
                  transition-show="jump-down"
                  transition-hide="jump-up"
                  :offset="[0, 0]"
                )
                  q-list.q-py-sm
                    q-item(clickable)
                      q-item-section(no-wrap)
                        div(
                          no-caps
                          @click="editTest(index)"
                        ) Редактировать
                    q-item(clickable)
                      q-item-section.text-red-2
                        div(
                          no-caps
                          @click="removeTest(index)"
                        ) Удалить
          div(
            v-for="(question, index) in test.questions"
            :key="index"
          )
            q-item
              q-item-section
                q-item-label.text-weight-550
                  | {{ question.title }}
            q-item
              q-item-section
                q-item-label(
                  v-for="(answer, index) in question.answers"
                  :key="index"
                ).text-grey-1.col {{ answer }}
    q-item.q-pt-lg
      q-item-section
        q-item-label
          OriginalButton(
            v-if="project"
            color="red-2"
            @click="(btn) => openModal(btn)"
          ) Новое тестирование
          InactiveButton(
            v-else
          ) Новое тестирование
    q-dialog(
      position="bottom"
      v-model="modal.open"
    )
      q-swipe-to-close(v-model="modal.open")
        q-card.no-border-radius
          q-card-section.q-py-sm.q-px-none.bg-grey-3
            q-item
              q-item-section
                q-item-label
                  | Новое тестирование
              q-item-section(side)
                q-btn.bg-grey-4(
                  size="sm"
                  flat
                  round
                  color="grey-5"
                  icon="mdi-window-close"
                  @click="modal.open = false"
                )
          q-card-section.q-px-none.q-pt-none
            q-item
              q-item-section
                q-item-label.row.justify-between.items-center
                  .row.no-wrap
                    .row.items-center.full-width.text-left(v-if="modal.questions[modal.index-1]")
                      svg(width="9" height="17")
                        use(xlink:href="go-back.svg#go-back")
                      span.q-ml-sm.text-blue.font-size-15(
                        @click="modal.index--"
                      ) Пред.
                    .row.items-center.full-width.justify-end(v-if="modal.questions[modal.index+1]")
                      span.q-mr-sm.text-blue.font-size-15(
                        @click="modal.index++"
                      ) След.
                      svg(width="9" height="17")
                        use(xlink:href="go-next.svg#go-next")
                  .row
                    OriginalButton.shadow-0(
                      @click="addNewQuestion"
                    )
                      template(#last)
                        span.text-blue.font-size-15 + Добавить вопрос
            q-item
              q-item-section
                q-item-label
                  q-input(
                    :label="`Название вопроса ${modal.index + 1}`"
                    v-model="modal.questions[modal.index].title"
                    outlined
                    bg-color="grey-2"
                    color="red"
                  )
            q-item(v-for="(data, key) in modal.questions[modal.index].answers" :key="`key-${key}`")
              q-item-section
                q-item-label
                  q-input(
                    :label="`Вариант ответа ${key+1}`"
                    v-model="modal.questions[modal.index].answers[key]"
                    outlined
                    bg-color="grey-2"
                    color="red"
                  )
            q-item
              q-item-section
                q-item-label
                  OriginalButton.shadow-0(
                    @click="addNewAnswer"
                  )
                    template(#last)
                      span &nbsp;
                      span.text-blue + Добавить вариант
            q-item
              q-item-section
                q-item-label
                  OriginalButton(
                    v-if="true"
                    color="red-2"
                    @click="(btn) => addTest(btn)"
                  ) Разместить тестирование
                  InactiveButton(
                    v-else
                  ) Разместить тестирование
    q-dialog(
      position="bottom"
      v-model="modalEdit.open"
    )
      q-swipe-to-close(v-model="modalEdit.open" )
        q-card.no-border-radius(v-if="testId != null")
          q-card-section.q-py-sm.q-px-none.bg-grey-3
            q-item
              q-item-section
                q-item-label
                  | {{tests[testId].title}}
              q-item-section(side)
                q-btn.bg-grey-4(
                  size="sm"
                  flat
                  round
                  color="grey-5"
                  icon="mdi-window-close"
                  @click="modalEdit.open = false"
                )
          q-card-section.q-px-none.q-pt-none
            q-item
              q-item-section
                q-item-label
                  .row.no-wrap
                    .row.items-center.full-width.text-left(v-if="tests[testId].questions[testIdQuestId - 1]")
                      svg(width="9" height="17")
                        use(xlink:href="go-back.svg#go-back")
                      span.q-ml-sm.text-blue.font-size-15(
                        @click="testIdQuestId--"
                      ) Пред.
                    .row.items-center.full-width.justify-end(v-if="tests[testId].questions[testIdQuestId + 1]")
                      span.q-mr-sm.text-blue.font-size-15(
                        @click="testIdQuestId++"
                      ) След.
                      svg(width="9" height="17")
                        use(xlink:href="go-next.svg#go-next")
                  .row
                    OriginalButton.shadow-0(
                      @click="editAddNewQuestion"
                    )
                      template(#last)
                        span.text-blue.font-size-15 + Добавить вопрос
            q-item
              q-item-section
                q-item-label
                  q-input(
                    :label="`Название вопроса ${testIdQuestId + 1}`"
                    v-model="tests[testId].questions[testIdQuestId].title"
                    outlined
                    bg-color="grey-2"
                    color="red"
                  )
            div(v-for="(answer, indexAnswer) in tests[testId].questions[testIdQuestId].answers")
              q-item
                q-item-section
                  q-item-label
                    q-input(
                      :label="`Вариант ответа ${indexAnswer + 1}`"
                      v-model="tests[testId].questions[testIdQuestId].answers[indexAnswer]"
                      outlined
                      bg-color="grey-2"
                      color="red"
                    )
            q-item
              q-item-section
                q-item-label
                  OriginalButton.shadow-0(
                    @click="editAddNewAnswer"
                  )
                    template(#last)
                      span &nbsp;
                      span.text-blue + Добавить вариант
            q-item
              q-item-section
                q-item-label
                  OriginalButton(
                    v-if="true"
                    color="red-2"
                    @click="(btn) => saveTest(btn)"
                  ) Сохранить изменения
                  InactiveButton(
                    v-else
                  ) Сохранить изменения
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import _ from 'lodash'

import Api from 'modules/api'
// import { forEach } from 'app/src-cordova/platforms/android/platform_www/cordova_plugins'
const api = new Api('Admin')

export default {
  name: 'tutorial-testing',
  components: { OriginalButton, InactiveButton },
  data: () => ({
    testsListShown: true,
    modal: {
      open: false,
      title: '',
      index: 0,
      questions: [
        {
          title: '',
          answers: []
        }
      ]
    },
    modalEdit: {
      open: false
    },
    testId: null,
    testIdQuestId: null,
    project: null,
    menus: [],
    projects: [],
    listOfProjectsVisibility: false,
    tests: []
  }),
  mounted () {
    this.tests.forEach(test => {
      this.menus.push({
        open: false
      })
    })
    // console.log(this.menus)
    api.call('showProjects')
      .then(({ data }) => {
        _.each(data, (val) => {
          this.projects.push({
            label: val.name,
            value: val.id
          })
        })
      })
  },

  computed: {
  },

  methods: {
    showListOfProjects () {
      this.listOfProjectsVisibility = !this.listOfProjectsVisibility
    },
    addTest (btn) {
      // console.log(this.project)
      // this.tests[this.testId] = {
      //   id: this.testId,
      //   title: `Название тестирования ${this.testId + 1}`,
      //   questions: [
      //     {
      //       id: 0,
      //       title: 'this.modal.a',
      //       answers: [
      //         'this.modal.b',
      //         'this.modal.c'
      //       ]
      //     }
      //   ]
      // }
      for (let i = 0; i < this.modal.questions.length; i++) {
        for (let j = 0; j < this.modal.questions[i].answers.length; j++) {
          if (this.modal.questions[i].answers[j] === '') {
            this.modal.questions[i].answers.splice(j, 1)
            j--
          }
        }
      }
      // _.each(this.modal.questions, (question) => {
      //   _.each(question.answers, (answer, key) => {
      //     if (answer === '') {
      //       question.answers.splice(key, 1)
      //     }
      //   })
      // })
      api.call('testAdd', {
        project_id: this.project.value,
        questions: this.modal.questions
      })
        .then(({ data }) => {
          this.showTests()
          btn.offLoad()
          // _.each(data, (val) => {
          //   this.projects.push({
          //     label: val.name,
          //     value: val.id
          //   })
          // })
        })
        .finally(() => {
          this.modal = {
            open: false,
            title: '',
            index: 0,
            questions: [
              {
                title: '',
                answers: []
              }
            ]
          }
        })

      // this.menus.push({
      //   open: false
      // })
      this.modal.open = false
    },
    saveTest (btn) {
      btn.offLoad()
      // this.tests[this.testId] = {
      //   id: this.testId,
      //   title: `Название тестирования ${this.testId + 1}`,
      //   questions: [
      //     {
      //       id: 0,
      //       title: 'this.modal.a',
      //       answers: [
      //         'this.modal.b',
      //         'this.modal.c'
      //       ]
      //     }
      //   ]
      // }
      api.call('testSave', {
        test_id: this.tests[this.testId].id,
        questions: this.tests[this.testId].questions
      })
        .then(({ data }) => {
          this.showTests()
          // _.each(data, (val) => {
          //   this.projects.push({
          //     label: val.name,
          //     value: val.id
          //   })
          // })
        })

      // this.menus.push({
      //   open: false
      // })
      this.modalEdit.open = false
    },
    openModal (btn) {
      btn.offLoad()
      this.modal.open = true
      this.modal.title = ''
      this.modal.answers = []
    },
    editTest (index) {
      this.testId = index
      this.testIdQuestId = 0
      this.modalEdit.open = true
      this.menus[index].open = false
    },
    addNewAnswer (btn) {
      this.modal.questions[this.modal.index].answers.push('')
      // if (this.testId === null || this.testIdQuestId === null) return
      // this.tests[this.testId].questions[this.testIdQuestId].answers.push('')
      btn.offLoad()
    },
    editAddNewAnswer (btn) {
      // this.modal.questions[this.modal.index].answers.push('')
      if (this.testId === null || this.testIdQuestId === null) return
      this.tests[this.testId].questions[this.testIdQuestId].answers.push('')
      btn.offLoad()
    },
    addNewQuestion (btn) {
      this.modal.index++
      this.$set(this.modal.questions, this.modal.index, {
        title: '',
        answers: []
      })
      // if (this.testId === null) return
      // console.log(this.tests[this.testId].questions, this.tests[this.testId].questions.length)
      // const lastQuest = this.tests[this.testId].questions[
      //   this.tests[this.testId].questions.length - 1
      // ]
      // this.tests[this.testId].questions.push({
      //   id: lastQuest.id + 1,
      //   title: null,
      //   answers: []
      // })
      btn.offLoad()
    },
    editAddNewQuestion (btn) {
      if (this.testId === null) return
      // this.testIdQuestId++
      // this.$set(this.tests[this.testId], this.modal.index, {
      //   title: '',
      //   answers: []
      // })
      // console.log(this.tests[this.testId].questions, this.tests[this.testId].questions.length)
      const lastQuest = this.tests[this.testId].questions[
        this.tests[this.testId].questions.length - 1
      ]
      this.tests[this.testId].questions.push({
        id: lastQuest.id + 1,
        title: null,
        answers: []
      })
      btn.offLoad()
    },
    removeTest (index) {
      api.call('testDelete', {
        test_id: this.tests[index].id
      })
        .then(({ data }) => {
          this.showTests()
        })
      // this.tests.splice(index, 1)
      this.menus[index].open = false
    },
    showTests () {
      // console.log(this.project)
      this.$nextTick(() => {
        const project = this.project
        api.call('showProjectsTest', {
          project_id: project.value
        })
          .then(({ data }) => {
            this.tests = data

            this.tests.forEach(test => {
              this.menus.push({
                open: false
              })
            })
          })
      })
    }
  },
  watch: {
  }
}
// {"open":false,"title":"","index":1,"questions":[{"title":"Quest 1","answers":["Ans 1","Ans 2"]},{"title":"Quest 2","answers":["Ans 3","Ans 4"]}],"answers":[]}
</script>
<style scoped lang="scss">
</style>
