<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between.no-wrap
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
            | Фото документов на трудоустройство
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
            @input="filter"
          )
            template(v-slot:prepend)
              q-icon(name="mdi-magnify")
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
            @input="filter"
          )
    //- q-btn(
    //-   label="test"
    //-   @click="testMethod"
    //- )
    //- div {{ test }}
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
              router-link.col(
                tag="span"
                :to="{ name: 'employment', params: { uuid: employee.uuid } }"
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
const api = new Api('Admin')

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
      employees: []
    }
  },
  mounted () {
    this.showNotVerifiedRegistrations()

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
    filter () {
      if (this.search && this.project && this.project?.value !== 'all') {
        this.showNotVerifiedRegistrationsByFioAndProject()
      } else if (this.search && (!this.project || this.project?.value === 'all')) {
        this.filterByFio()
      } else if (this.project && this.project?.value !== 'all' && !this.search) {
        this.filterByProject()
      } else {
        this.showNotVerifiedRegistrations()
      }
    },
    filterByFio () {
      this.showNotVerifiedRegistrationsByFio()
    },
    filterByProject () {
      if (this.project.value === 'all') {
        this.showNotVerifiedRegistrations()
      } else {
        this.showNotVerifiedRegistrationsByProject()
      }
    },
    showNotVerifiedRegistrations () {
      api.call('showNotVerifiedRegistrations')
        .then(({ data }) => {
          this.employees = []
          for (let i = 0; i < data.data.length; i++) {
            this.employees.push(data.data[i])
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
          console.log('final')
        })
    },
    showNotVerifiedRegistrationsByFio () {
      const fd = new FormData()
      fd.append('fio', this.search)

      if (this.search) {
        api.call('showNotVerifiedRegistrationsByFio', fd)
          .then(({ data }) => {
            this.employees = []
            // data = data.data
            for (let i = 0; i < data.data.length; i++) {
              this.employees.push(data.data[i])
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
      } else {
        this.showNotVerifiedRegistrations()
      }
    },
    showNotVerifiedRegistrationsByProject () {
      const fd = new FormData()
      fd.append('project_id', this.project.value)

      api.call('showNotVerifiedRegistrationsByProject', fd)
        .then(({ data }) => {
          this.employees = []
          for (let i = 0; i < data.data.length; i++) {
            this.employees.push(data.data[i])
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
    showNotVerifiedRegistrationsByFioAndProject () {
      const fd = new FormData()
      fd.append('fio', this.search)
      fd.append('project_id', this.project.value)

      api.call('showNotVerifiedRegistrationsByFioAndProject', fd)
        .then(({ data }) => {
          this.employees = []
          for (let i = 0; i < data.data.length; i++) {
            this.employees.push(data.data[i])
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
    logOut () {
      this.$q.localStorage.remove('token')
      this.$router.push('/auth')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
    // testMethod () {
    //   let d = this.employees[0].birthday_at
    //   d = date.formatDate(d, 'DD.MM.YYYY')
    //   this.test = d
    // },
    showListOfProjects () {
      this.listOfProjectsVisibility = !this.listOfProjectsVisibility
    },
    onLoad (index, done) {
      // setTimeout(() => {
      //   if (this.employees) {
      //     this.employees.push({
      //       fullName: 'Самсонов Гурий Андреевич',
      //       dateOfBirth: '20.12.1980',
      //       proj: 'Проект 4'
      //     },
      //     {
      //       fullName: 'Веселов Владимир Ефимович',
      //       dateOfBirth: '16.03.1995',
      //       proj: 'Проект 5'
      //     },
      //     {
      //       fullName: 'Герасимов Рудольф Лукьевич',
      //       dateOfBirth: '20.12.1997',
      //       proj: 'Проект 6'
      //     })
      //     done()
      //   }
      // }, 1000)
    }
  }
}
</script>
<style scoped lang="scss">
  .border-radius-10 {
    border-radius: 10px
  }
</style>
