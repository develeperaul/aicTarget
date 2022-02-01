<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="График отпусков"
            to="/home/merchant/territory/vacation-schedule"
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
            | Корректировка ГО
    q-item
      q-item-section
        q-item-label
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
                .q-pt-xs.text-weight-550.q-pb-md {{employee.user.last_name}} {{employee.user.first_name}}
                .q-py-sm.row
                  .q-pr-xs Дата рождения:
                  .text-grey {{employee.user.birthday_at}}
                .q-pt-sm.q-pb-lg.row
                  .q-pr-xs Территория:
                  .text-grey {{employee.territory}}
                .q-pb-sm.row
                  .q-pr-xs Период 1:
                  .text-grey {{employee.period_start_1}} - {{employee.period_end_1}}
                .q-py-sm.row
                  .q-pr-xs Период 2:
                  .text-grey {{employee.period_start_2}} - {{employee.period_end_2}}
                .q-pt-sm.row.q-pb-xs
                  .q-pr-xs Период 3:
                  .text-grey {{employee.period_start_3}} - {{employee.period_end_3}}
                .q-pt-sm.row.q-pb-xs
                  .q-pr-xs Период 4:
                  .text-grey {{employee.period_start_4}} - {{employee.period_end_4}}
              .col-auto.items-center.row
                q-icon(name="mdi-chevron-right" size="20px")
    q-dialog(
      v-model="modal.open"
      position="bottom"
    )
      q-swipe-to-close(v-model="modal.open")
        q-card.no-border-radius(v-if="employees[employeeId]")
          q-card-section.q-py-sm.q-px-none.bg-grey-3
            q-item
              q-item-section
                q-item-label
                  | Корректировка графика отпусков
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
                  .text-weight-550 {{employees[employeeId].user.last_name}} {{employees[employeeId].user.first_name}}
                  .row.justify-between.q-py-md.no-wrap
                    .no-wrap.row
                      .q-pr-xs Дата рождения:
                      .text-grey {{employees[employeeId].user.birthday_at}}
                  .row
                    .q-pr-xs Территория:
                    .text-grey {{employees[employeeId].territory}}
          transition(
            :enter-active-class="`animated ${enterSlide}`"
            :leave-active-class="`animated ${leaveSlide}`"
            mode="out-in"
          )
            component(
              :is="`vacation-schedule-period-${period}`"
              :periods="this.savedPeriods[period]"
              @accept-period="actualize"
              @next="next()"
              @back="back()"
              @to-complete="toComplete()"
            )
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
    q-dialog(
      content-class="q-dialog-padding-fixed"
      v-model="dialogConfirm.open"
    )
      q-card.full-width
        q-card-section
          q-item.q-px-xs
            q-item-section
              q-item-label
                .text-h6.text-center.text-weight-bold.q-mt-md Данные изменены
                .text-grey.q-my-md.text-center.text-body1
                  | Корректировки отправлены на обработку,
                  | после подтверждения нового графика отпусков,
                  | данные в карточке сотрудника будут изменены.
                OriginalButton.q-mt-sm.full-width(
                  color="red-2"
                  @click="dialogConfirm.open = false"
                ) Закрыть
</template>
<script>
import components from './Periods/index'
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import HeaderSettings from 'components/HeaderSettings'
import Api from 'modules/api'
const api = new Api('HomeSuper')

export default {
  components: { ...components, OriginalButton, InactiveButton, HeaderSettings },
  data () {
    return {
      period: 1,
      maxPeriod: 8,
      employeeId: 0,
      enterSlide: 'slideInLeft',
      leaveSlide: 'slideOutRight',
      modal: {
        open: false
      },
      employees: [],
      savedPeriods: [],
      dialog: {
        open: false
      },
      dialogConfirm: {
        open: false
      }
    }
  },
  watch: {
    // period () {
    //   if (this.period === 1) {
    //     this.enterSlide = 'slideInLeft'
    //     this.leaveSlide = 'slideOutRight'
    //   } else if (this.period === 2) {
    //     this.enterSlide = 'slideInRight'
    //     this.leaveSlide = 'slideOutLeft'
    //   }
    // },
    'modal.open' () {
      this.period = 1
      this.savedPeriods = []
      if (this.modal.open) {
        if (this.employees[this.employeeId]) {
          const periods = this.employees[this.employeeId]
          for (let index = 1; index < 5; index++) {
            // const element = periods[index]
            const start_ = periods[`period_start_${index}`].split('.')
            const end_ = periods[`period_end_${index}`].split('.')
            // const end_ = this.periods.period_end.split('.')

            if (start_[0] && end_[0]) {
              this.savedPeriods[index] = {
                period_start: String(Number(start_[0])) + '.' + String((Number(start_[1]) - 1)),
                period_end: String(Number(end_[0])) + '.' + String((Number(end_[1]) - 1))
              }
            }
          }
        }
      }
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    logOut () {
      this.$q.localStorage.remove('token')
      this.$router.push('/auth')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
    load () {
      api.call('vacationShowSingle')
        .then(({ data }) => {
          this.employees = data
        })
    },
    numberOfEmployees () {
      return this.employees.length
    },
    openModalById (employeeId) {
      this.employeeId = employeeId
      this.modal.open = true
    },
    actualize (data) {
      this.savedPeriods[data.period] = {
        period_start: data.period_start,
        period_end: data.period_end
      }
      console.log(data.period, data.period_start, data.period_end)
    },
    next () {
      this.enterSlide = 'slideInRight'
      this.leaveSlide = 'slideOutLeft'
      this.period++
    },
    back () {
      this.enterSlide = 'slideInLeft'
      this.leaveSlide = 'slideOutRight'
      this.period--
    },
    toComplete () {
      const periods = this.savedPeriods
      // eslint-disable-next-line prefer-const
      let data = {}
      for (let index = 1; index < 5; index++) {
        const element = periods[index]
        if (!element) continue
        // eslint-disable-next-line prefer-const
        let start_ = element.period_start.split('.')
        // eslint-disable-next-line prefer-const
        let end_ = element.period_end.split('.')

        start_[1] = String(Number(start_[1]) + 1)
        end_[1] = String(Number(end_[1]) + 1)

        if (Number(start_[0]) > 0 && Number(start_[0]) < 10) {
          start_[0] = '0' + start_[0]
        }
        if ((Number(start_[1]) + 1) > 0 && (Number(start_[1]) + 1) < 10) {
          start_[1] = '0' + start_[1]
        }
        if (Number(end_[0]) > 0 && Number(end_[0]) < 10) {
          end_[0] = '0' + end_[0]
        }
        if ((Number(end_[1]) + 1) > 0 && (Number(end_[1]) + 1) < 10) {
          end_[1] = '0' + end_[1]
        }

        const first = this.$moment(`${start_[0]}.${start_[1]}`, 'DD.MM')
        const second = this.$moment(`${end_[0]}.${end_[1]}`, 'DD.MM')
        console.log(first, second)

        if (first.isAfter(second)) {
          this.$q.notify({
            message: `Период №${index} имеет неправильные даты`,
            type: 'negative'
          })
          return
        }
        // console.log(first.diff(second, 'days'))
        if (second.diff(first, 'days') >= 30) {
          this.$q.notify({
            message: `Периоду №${index} задана длительность больше 30 дней`,
            type: 'negative'
          })
          return
        }

        data[`period_start_${index}`] = `${start_[0]}.${start_[1]}`
        data[`period_end_${index}`] = `${end_[0]}.${end_[1]}`
      }

      api.call('vacationEditSingle', {
        uuid: this.employees[this.employeeId].user.uuid,
        ...data
      })
        .then(({ data }) => {
          this.load()
          // this.$q.notify(data)
          this.modal.open = false
          this.dialogConfirm.open = true
        })
        .catch(this.$axios.errorHandler)
    }
  }
}
</script>
<style scoped lang="scss">
  .border-radius-10 {
    border-radius: 10px
  }
</style>
