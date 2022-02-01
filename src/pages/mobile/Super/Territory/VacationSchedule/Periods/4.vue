<template lang="pug">
  div
    q-item
      q-item-section
        q-item-label.text-weight-550
          | Дата начала отпуска периода 4:
    q-item
      q-item-section
        q-select(
          :options="options.startDays"
          v-model="inputs.startDay"
          label="Число"
          outlined
          color="red"
          behavior="menu"
          menu-anchor="bottom left"
        )
      q-item-section
        q-item-label
          q-select(
            :options="options.months"
            v-model="inputs.startMonth"
            label="Месяц"
            outlined
            color="red"
            behavior="menu"
            menu-anchor="bottom left"
            @input="updateNumberOfStartDays()"
          )
    q-item
      q-item-section
        q-item-label.text-weight-550
          | Дата окончания отпуска периода 4:
    q-item
      q-item-section
        q-select(
          :options="options.endDays"
          v-model="inputs.endDay"
          label="Число"
          outlined
          color="red"
          behavior="menu"
          menu-anchor="bottom left"
        )
      q-item-section
        q-item-label
          q-select(
            :options="options.months"
            v-model="inputs.endMonth"
            label="Месяц"
            outlined
            color="red"
            behavior="menu"
            menu-anchor="bottom left"
            @input="updateNumberOfEndDays()"
          )
    q-item.q-pt-md.q-pb-xl
      q-item-section
        q-item-label
          OriginalButton(
            @click="back()"
          ) Предыдущий период
        q-item-label.q-pt-sm
          OriginalButton(
            v-if="everythingIsFull()"
            color="red-2"
            @click.native="toComplete()"
          ) Завершить
          InactiveButton(
            v-else
          ) Завершить
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import { date } from 'quasar'

export default {
  name: 'vacation-schedule-period-3',
  components: { OriginalButton, InactiveButton, date },
  props: ['periods'],
  data: () => ({
    startMonthId: null,
    endMonthId: null,
    monthId: null,
    daysInMonth: [],
    options: {
      startDays: [],
      endDays: [],
      months: []
    },
    inputs: {
      startDay: null,
      startMonth: null,
      endDay: null,
      endMonth: null
    }
  }),

  methods: {
    everythingIsFull () {
      for (const item in this.inputs) {
        if (!this.inputs[item]) {
          return false
        }
      } return true
    },
    updateNumberOfStartDays () {
      // get month id
      for (let i = 0; i < 12; i++) {
        if (this.options.months[i] === this.inputs.startMonth) {
          this.startMonthId = i
        }
      }
      // get the number of days in the month by id
      const newDate = new Date(this.$moment().format('YYYY'), this.startMonthId)
      this.daysInMonth = date.daysInMonth(newDate)
      // if the selected number is greater, then we set the maximum value
      if (this.inputs.startDay > this.daysInMonth) {
        this.inputs.startDay = this.daysInMonth
      }
      // overwrite the array of numbers for the selected month
      this.options.startDays = []
      for (let d = 1; d <= this.daysInMonth; d++) {
        this.options.startDays.push(d)
      }
    },
    updateNumberOfEndDays () {
      for (let i = 0; i < 12; i++) {
        if (this.options.months[i] === this.inputs.endMonth) {
          this.endMonthId = i
        }
      }

      const newDate = new Date(this.$moment().format('YYYY'), this.endMonthId)
      this.daysInMonth = date.daysInMonth(newDate)
      if (this.inputs.endDay > this.daysInMonth) {
        this.inputs.endDay = this.daysInMonth
      }
      this.options.endDays = []
      for (let d = 1; d <= this.daysInMonth; d++) {
        this.options.endDays.push(d)
      }
    },
    back () {
      this.$emit('back')
    },
    next () {
      this.$emit('next')
      this.$emit('accept-period', {
        period: 4,
        period_start: `${this.inputs.startDay}.${this.startMonthId}`,
        period_end: `${this.inputs.endDay}.${this.endMonthId}`
      })
    },
    toComplete () {
      this.$emit('accept-period', {
        period: 4,
        period_start: `${this.inputs.startDay}.${this.startMonthId}`,
        period_end: `${this.inputs.endDay}.${this.endMonthId}`
      })
      setTimeout(() => {
        this.$emit('to-complete')
      }, 200)
    }
  },
  mounted () {
    for (let day = 1; day <= 31; day++) {
      this.options.startDays.push(day)
    }
    for (let day = 1; day <= 31; day++) {
      this.options.endDays.push(day)
    }
    this.options.months = this.$utils.calendarLocale.months

    setTimeout(() => {
      if (this.periods) {
        const start_ = this.periods.period_start.split('.')
        const end_ = this.periods.period_end.split('.')

        if (start_[0]) {
          this.inputs.startDay = start_[0]
        }
        if (start_[1]) {
          this.inputs.startMonth = this.options.months[start_[1]]
          this.updateNumberOfStartDays()
        }
        if (end_[0]) {
          this.inputs.endDay = end_[0]
        }
        if (end_[1]) {
          this.inputs.endMonth = this.options.months[end_[1]]
          this.updateNumberOfEndDays()
        }
      }
    }, 100)
  }
}
</script>
<style scoped lang="scss">
</style>
