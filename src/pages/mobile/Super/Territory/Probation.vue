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
            | Стажировка
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="search"
            color="red"
            dense
            placeholder="Поиск"
            @input="filterByFio"
          )
            template(v-slot:prepend)
              q-icon(name="mdi-magnify")
    //- q-item
    //-   q-item-section
    //-     q-item-label
    //-       q-select(
    //-         :options="projects"
    //-         v-model="project"
    //-         outlined
    //-         color="red"
    //-         label="Выбрать проект"
    //-         behavior="menu"
    //-         menu-anchor="bottom left"
    //-         dense
    //-         @input="filterByProject"
    //-       )
    q-item
      q-item-section
        q-item-label
          .text-grey.q-pb-xs.font-size-13
            | Сотрудников: {{ employees.length }}
          //- q-infinite-scroll(@load="onLoad" :offset="100")
          q-card.q-mb-sm(
            v-for="(employee, index) in employees"
            :key="index"
            flat
            bordered
            style="font-size: 17px"
          )
            q-card-section.row
              .col(
                @click="openModalById(employee.id)"
              )
                .q-pt-xs.text-weight-550.q-pb-md
                  | {{ employee.last_name }} {{ employee.first_name }} {{ employee.patronymic }}
                .q-py-sm.row
                  .q-pr-xs Дата рождения:
                  .text-grey {{ employee.birthday_at }}
                .q-py-sm.row
                  .q-pr-xs Проект:
                  .text-grey {{ employee.project_name }}
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
                  | Прохождение стажировки
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
            q-item(
              v-for="(employee, key) in employees"
              :key="key"
              v-if="employee.id === employeeId"
            )
              q-item-section
                q-item-label
                  .text-weight-550.text-black
                    | {{employee.last_name}}
                    | {{employee.first_name}}
                    | {{employee.patronymic}}
                  .row.justify-between.q-py-md.no-wrap
                    .no-wrap.row
                      .q-pr-xs Дата рождения:
                      .text-grey {{employee.birthday_at}}
                  .row
                    .q-pr-xs Проект:
                    .text-grey {{employee.project_name}}
            q-item.q-mb-xs.q-pl-sm
              q-item-section
                q-item-label
                  q-option-group.row(
                    :options="modal.conclusions"
                    type="radio",
                    v-model="modal.conclusion"
                  )
            q-item.q-pt-none(v-if="modal.conclusion === false")
              q-item-section
                q-item-label
                  q-input(
                    v-model="modal.reason"
                    type="textarea"
                    outlined
                    label="Причина"
                    bg-color="grey-2"
                    color="red"
                  )
            q-item
              q-item-section
                q-item-label
                  OriginalButton(
                    v-if="modal.conclusion !== null"
                    color="red-2"
                    @click="(btn) => { confirm(employeeId); btn.offLoad(); }"
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
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import HeaderSettings from 'components/HeaderSettings'
import _ from 'lodash'
import Api from 'modules/api'
const api = new Api('HomeSuper')

export default {
  components: { OriginalButton, InactiveButton, HeaderSettings },
  data () {
    return {
      dialog: {
        open: false
      },
      search: null,
      project: null,
      projects: [
        {
          label: 'Все',
          value: 'all'
        }
      ],
      listOfProjectsVisibility: false,
      employees: [],
      employeeId: null,
      modal: {
        open: false,
        conclusion: null,
        reason: null,
        conclusions: [
          {
            label: 'Стажировка пройдена',
            value: true
          },
          {
            label: 'Стажировка не пройдена',
            value: false
          }
        ]
      }
    }
  },
  mounted () {
    this.showProbationers()

    api.call('projectList')
      .then(({ data }) => {
        _.each(data, (proj) => {
          this.projects.push({
            label: proj.name,
            value: proj.id
          })
        })
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
    showProbationers () {
      api.call('showProbationers')
        .then(({ data }) => {
          this.employees = []
          for (let i = 0; i < data.data.length; i++) {
            this.employees.push({
              id: data.data[i].id,
              uuid: data.data[i].uuid,
              last_name: data.data[i].passport.last_name,
              first_name: data.data[i].passport.first_name,
              patronymic: data.data[i].passport.patronymic,
              birthday_at: data.data[i].passport.birthday_at,
              project_id: data.data[i].project_id,
              project_name: data.data[i].project_name,
              selected: false
            })
            // this.employees.push({
            //   id: data.data[i].id + 1,
            //   uuid: data.data[i].uuid,
            //   last_name: data.data[i].passport.last_name + 'копия',
            //   first_name: data.data[i].passport.first_name + 'копия',
            //   patronymic: data.data[i].passport.patronymic + 'копия',
            //   birthday_at: data.data[i].passport.birthday_at,
            //   project_id: data.data[i].project_id,
            //   project_name: data.data[i].project_name,
            //   selected: false
            // })
          }
        })
        .catch((data) => {
          console.log(data)
          if (data.response) {
            const errors = data.response.data.errors

            _.each(errors, (messages, key) => {
              console.log(key, this.errors[key])
              if (this.errors[key] !== undefined) {
                this.errors[key] = messages[0]
              }
            })
          }
        })
        .finally(() => {
          // console.log(this.employees)
        })
    },
    confirm (employeeId) {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })
      const fd = new FormData()
      fd.append('id', employeeId)
      fd.append('conclusion', this.modal.conclusion)
      fd.append('reason', this.modal.reason)

      api.call('confirmProbation', fd)
        .then(({ data }) => {
          this.$q.notify(data)
          this.showProbationers()
          this.modal.open = false
          // this.$router.push('/home/admin/documents/vacation')
        })
        .catch((data) => {
          console.log(data)
          if (data.response) {
            const errors = data.response.data.errors
            _.each(errors, (messages, key) => {
              console.log(key, this.errors[key])
              if (this.errors[key] !== undefined) {
                this.errors[key] = messages[0]
              }
            })
          }
        })
        .finally(() => {
          // btn.offLoad()
        })
    },
    filterByFio () {
      this.employees = []
      this.showByFio()
    },
    showByFio () {
      if (this.search) {
        api.call('showProbationersByFio', {
          fio: this.search
        })
          .then(({ data }) => {
            this.employees = []
            for (let i = 0; i < data.data.length; i++) {
              this.employees.push({
                id: data.data[i].id,
                uuid: data.data[i].uuid,
                last_name: data.data[i].passport.last_name,
                first_name: data.data[i].passport.first_name,
                patronymic: data.data[i].passport.patronymic,
                birthday_at: data.data[i].passport.birthday_at,
                project_id: data.data[i].project_id,
                project_name: data.data[i].project_name,
                selected: false
              })
            }
          })
          .catch((data) => {
            console.log(data)
            if (data.response) {
              const errors = data.response.data.errors

              _.each(errors, (messages, key) => {
                console.log(key, this.errors[key])
                if (this.errors[key] !== undefined) {
                  this.errors[key] = messages[0]
                }
              })
            }
          })
          .finally(() => {
            console.log(this.employees)
          })
      } else {
        this.showProbationers()
      }
    },
    filterByProject () {
      this.employees = []
      if (this.project.value === 'all') {
        this.showProbationers()
      } else {
        this.showByProject()
      }
    },
    showByProject () {
      api.call('showProbationersByProject', {
        project_id: this.project.value
      })
        .then(({ data }) => {
          for (let i = 0; i < data.data.length; i++) {
            this.employees.push({
              id: data.data[i].id,
              uuid: data.data[i].uuid,
              last_name: data.data[i].passport.last_name,
              first_name: data.data[i].passport.first_name,
              patronymic: data.data[i].passport.patronymic,
              birthday_at: data.data[i].passport.birthday_at,
              project_id: data.data[i].project_id,
              project_name: data.data[i].project_name,
              selected: false
            })
          }
        })
        .catch((data) => {
          console.log(data)
          if (data.response) {
            const errors = data.response.data.errors

            _.each(errors, (messages, key) => {
              console.log(key, this.errors[key])
              if (this.errors[key] !== undefined) {
                this.errors[key] = messages[0]
              }
            })
          }
        })
        .finally(() => {
          console.log(this.employees)
        })
    },
    showListOfProjects () {
      this.listOfProjectsVisibility = !this.listOfProjectsVisibility
    },
    openModalById (employeeId) {
      this.employeeId = employeeId
      this.modal.open = true
    }
  }
}
</script>
<style scoped lang="scss">
</style>
