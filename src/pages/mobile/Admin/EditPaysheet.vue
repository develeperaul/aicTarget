<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Назад"
            to="/home/admin"
          )
          header-settings
            q-list(style="width: 239px")
              q-item(clickable)
                q-item-section(no-wrap)
                  router-link.col.q-pt-sm(
                    tag="span"
                    :to="{ name: 'admin-info' }"
                  ) Изменить личные данные
              q-item.q-pl-sm(clickable)
                q-item-section.text-red-2
                  q-btn(
                    no-caps
                    align="left"
                    dense
                    @click="dialog.open = true"
                  )
                    .q-pl-xs Выйти
    q-item
      q-item-section
        q-item-label
          .text-h4.text-weight-bolder.q-mb-md
            | Расчетный лист
    q-item.q-pb-lg
      q-item-section
        q-item-label
          q-input(
            color="grey"
            outlined
            dense
            placeholder="Выбрать проект"
            :value="project"
          )
            template(v-slot:append)
              q-icon(
                v-if="!listOfProjectsVisibility"
                @click="showListOfProjects()"
                name="mdi-chevron-down"
                color="black"
                size="20px"
              )
              q-icon(
                v-else
                @click="showListOfProjects()"
                name="mdi-chevron-up"
                color="black"
                size="20px"
                )
        q-slide-transition
          q-item-label(
            v-if="listOfProjectsVisibility"
            transition-show="slide-down"
            transition-hide="slide-up"
          )
            q-option-group(
              :options="projects"
              v-model="project"
            )
    q-item
      q-item-section
        q-item-label
          q-infinite-scroll(@load="onLoad" :offset="100")
            q-card.q-mb-sm(
              v-for="(employee, index) in employees"
              :key="index"
              flat
              bordered
              style="font-size: 17px"
            )
              q-card-section.row
                .col(
                  @click="openModalById(index)"
                )
                  .q-pt-xs.text-weight-550.q-pb-md {{employee.fullName}}
                  .q-py-sm.row
                    .q-pr-xs Дата рождения:
                    .text-grey {{employee.dateOfBirth}}
                  .q-py-sm.row
                    .q-pr-xs Проект:
                    .text-grey {{employee.proj}}
                .col-auto.items-center.row
                  q-icon(name="mdi-chevron-right" size="20px")
            template(v-slot:loading)
              .row.justify-center.q-my-md
                q-spinner(size="3em" color="red-2")
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
                  .text-weight-550 {{initials(employees[employeeId].fullName)}}
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
                    v-model="modal.inputs.salary"
                    outlined
                    label="Оклад по часам:"
                    bg-color="grey-2"
                    color="red"
                  )
            q-item
              q-item-section
                q-item-label
                  q-input(
                    v-model="modal.inputs.bonus"
                    outlined
                    label="Бонус:"
                    bg-color="grey-2"
                    color="red"
                  )
            q-item
              q-item-section
                q-item-label
                  q-input(
                    v-model="modal.inputs.sickLeaveFss"
                    outlined
                    label="Больничный за счет ФСС:"
                    bg-color="grey-2"
                    color="red"
                  )
            q-item
              q-item-section
                q-item-label
                  q-input(
                    v-model="modal.inputs.sickLeaveEmployer"
                    outlined
                    label="Больничный за счет работодателя:"
                    bg-color="grey-2"
                    color="red"
                  )
            q-item
              q-item-section
                q-item-label
                  OriginalButton(
                  ) Загрузить файл с бонусами
            q-item
              q-item-section
                q-item-label
                  OriginalButton(
                    v-if="everythingIsFull()"
                    color="red-2"
                    @click="modal.open = false"
                  ) Применить
                  InactiveButton(
                    v-else
                  ) Применить
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
                .text-h6.text-center.text-weight-bold.q-mt-md Выход
                .text-grey.q-my-md.text-center.text-body1 Вы действительно хотите выйти из учетной записи?
                OriginalButton.q-mt-sm.full-width(
                  @click="logOut()"
                ) Да, хочу выйти
                OriginalButton.q-mt-sm.full-width.text-red-2(
                  @click="dialog.open = false"
                ) Отмена
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import HeaderSettings from 'components/HeaderSettings'

export default {
  components: { OriginalButton, InactiveButton, HeaderSettings },
  data () {
    return {
      dialog: {
        open: false
      },
      employeeId: 0,
      modal: {
        open: false,
        inputs: {
          salary: '26 000,36 руб.',
          bonus: '26 000,36 руб.',
          sickLeaveFss: '26 000,36 руб.',
          sickLeaveEmployer: '26 000,36 руб.'
        }
      },
      project: null,
      projects: [
        {
          label: 'Все',
          value: 'Все'
        },
        {
          label: 'Project 1',
          value: 'proj-1'
        },
        {
          label: 'Project 2',
          value: 'proj-2'
        },
        {
          label: 'Project 3',
          value: 'proj-3'
        },
        {
          label: 'Project 4',
          value: 'proj-4'
        },
        {
          label: 'Project 5',
          value: 'proj-5'
        }
      ],
      listOfProjectsVisibility: false,
      employees: [
        {
          fullName: 'Иванов Иван Иванович',
          dateOfBirth: '20.12.1980',
          proj: 'Проект 1'
        },
        {
          fullName: 'Сидоров Олег Петрович',
          dateOfBirth: '16.03.1995',
          proj: 'Проект 2'
        },
        {
          fullName: 'Смирнов Геннадий Алексеевич',
          dateOfBirth: '20.12.1997',
          proj: 'Проект 3'
        }
      ]
    }
  },
  methods: {
    showListOfProjects () {
      this.listOfProjectsVisibility = !this.listOfProjectsVisibility
    },
    onLoad (index, done) {
      setTimeout(() => {
        if (this.employees) {
          this.employees.push({
            fullName: 'Самсонов Гурий Андреевич',
            dateOfBirth: '20.12.1980',
            proj: 'Проект 4'
          },
          {
            fullName: 'Веселов Владимир Ефимович',
            dateOfBirth: '16.03.1995',
            proj: 'Проект 5'
          },
          {
            fullName: 'Герасимов Рудольф Лукьевич',
            dateOfBirth: '20.12.1997',
            proj: 'Проект 6'
          })
          done()
        }
      }, 1000)
    },
    everythingIsFull () {
      for (const item in this.modal.inputs) {
        if (this.modal.inputs[item] === '' || this.modal.inputs[item] === null) {
          return false
        }
      } return true
    },
    openModalById (employeeId) {
      this.employeeId = employeeId
      this.modal.open = true
    },
    initials (fullName) {
      return fullName.split(/\s+/).map((w, i) => i ? w.substring(0, 1).toUpperCase() + '.' : w).join(' ')
    }
  }
}
</script>
<style scoped lang="scss">
  .border-radius-10 {
    border-radius: 10px
  }
</style>
