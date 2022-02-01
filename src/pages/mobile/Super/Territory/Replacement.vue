<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Управление территорией"
            to="/home/merchant/territory"
          )
          header-settings
            q-list(style="width: 239px")
              q-item(clickable)
                q-item-section(no-wrap)
                  router-link.col.q-pt-sm(
                    tag="span"
                    :to="{ name: 'merchant-info' }"
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
            | Заявка на замену
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="search"
            color="grey"
            dense
            placeholder="Поиск"
          )
            template(v-slot:prepend)
              q-icon(name="mdi-magnify")
    q-item
      q-item-section
        q-item-label
          .text-grey.q-pb-xs.font-size-13
            | Сотрудников: {{ employees.length }}
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
                .q-pt-xs.text-weight-550.q-pb-md {{employee.lastname}} {{employee.firstname}}
                .q-py-sm.row
                  .q-pr-xs Дата рождения:
                  .text-grey {{employee.passport.birthday_at}}
                .q-py-sm.row
                  .q-pr-xs Проект:
                  .text-grey {{employee.project_name}}
              .col-auto.items-center.row
                q-icon(name="mdi-chevron-right" size="20px")
    q-dialog(
      position="bottom"
      v-model="modal.open"
      v-if="employeeId != 0"
    )
      q-swipe-to-close(v-model="modal.open")
        q-card.no-border-radius
          q-card-section.q-py-sm.q-px-none.bg-grey-3
            q-item
              q-item-section
                q-item-label
                  | Укажите причину увольнения
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
                  .text-weight-550 {{employees[employeeId].lastname}} {{employees[employeeId].firstname}}
                  .row.justify-between.q-py-md.no-wrap
                    .no-wrap.row
                      .q-pr-xs Дата рождения:
                      .text-grey {{employees[employeeId].passport.birthday_at}}
                  .row
                    .q-pr-xs Проект:
                    .text-grey {{employees[employeeId].project_name}}
            q-item
              q-item-section
                q-item-label
                  q-input(
                    v-model="modal.reason"
                    type="textarea"
                    outlined
                    label="Причина увольнения"
                    bg-color="grey-2"
                    color="red"
                  )
            q-item
              q-item-section
                q-item-label
                  OriginalButton(
                    v-if="everythingIsFull()"
                    color="red-2"
                    @click="request"
                  ) Отправить
                  InactiveButton(
                    v-else
                  ) Отправить
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
import Api from 'modules/api'
const api = new Api('User')
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import HeaderSettings from 'components/HeaderSettings'

export default {
  components: { OriginalButton, InactiveButton, HeaderSettings },
  data () {
    return {
      employeeId: 0,
      modal: {
        open: false,
        reason: null
      },
      search: null,
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
      employees: [],
      dialog: {
        open: false
      }
    }
  },
  mounted () {
    api.call('replacementShow')
      .then(({ data }) => {
        console.log(data)
        this.employees = data.data
      })
  },
  methods: {
    logOut () {
      this.$q.localStorage.remove('token')
      this.$router.push('/auth')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
    request (button) {
      api.call('replacementAccept', {
        uuid: this.employees[this.employeeId].uuid,
        comment: this.modal.reason
      })
        .then(({ data }) => {
          this.$q.notify(data)
          this.modal.open = false
          this.modal.reason = ''
        })
        .catch(this.$axios.errorHandler)
        .finally(() => {
          button.offLoad()
        })
    },
    showListOfProjects () {
      this.listOfProjectsVisibility = !this.listOfProjectsVisibility
    },
    numberOfEmployees () {
      return this.employees.length
    },
    everythingIsFull () {
      if (this.modal.reason === '' || this.modal.reason === null) {
        return false
      } return true
    },
    openModalById (employeeId) {
      this.employeeId = employeeId
      this.modal.open = true
    }
  }
}
</script>
<style scoped lang="scss">
  .border-radius-10 {
    border-radius: 10px
  }
</style>
