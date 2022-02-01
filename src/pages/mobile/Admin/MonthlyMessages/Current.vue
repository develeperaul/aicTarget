<template lang="pug">
  div
    q-item.q-pt-none
      q-item-section
        q-item-label
          .q-pt-xs.q-pb-md.row.q-col-gutter-sm.justify-between.items-center
            .col-6
              q-btn.q-pl-md.q-pr-sm.shadow-5.full-width(
                v-if="holdActive == true"
                no-caps
                padding="none"
                @click="cancelSelection()"
              )
                .row.justify-between.full-width.items-center.no-wrap
                  .font-size-13.text-grey-5.div-no-wrap
                    span.text-no-wrap Отменить выбор
                  q-icon(name="mdi-window-close" color="red-2" size="15px")
              q-btn.q-pl-md.q-pr-sm.shadow-5.full-width(
                v-else
                no-caps
                padding="none"
                disable
              )
                .row.justify-between.full-width.items-center.no-wrap
                  .font-size-13.text-grey-5.div-no-wrap
                    span.text-no-wrap Отменить выбор
                  q-icon(name="mdi-window-close" color="red-2" size="15px")
            div
              q-checkbox.font-size-13.checkbox-border(
                v-model="selectAll"
                label="Выбрать всех"
              )
          q-card.q-mb-sm(
            v-for="(mailing, index) in mailings"
            :key="index"
            flat
            bordered
            style="font-size: 17px"
            :class="{'q-card-selection': mailing.selected}"
          )
            q-card-section.col(
              v-if="holdActive == true"
              @click="mailing.selected = !mailing.selected"
            )
              .row.no-wrap.justify-between.items-start
                .q-pt-xs.text-grey.font-size-15 {{mailing.date.format('DD.MM.YYYY')}}
                q-checkbox.font-size-13.checkbox-border.checkbox-size(
                  v-model="mailing.selected"
                )
              .q-py-sm.lh {{mailing.message}}
              .q-pr-xs.row.font-size-15.justify-between
                .col.text-grey.q-pt-sm Прочитано:
                .col-8.text-right
                  .text-blue {{percentRead(mailing.read, mailing.total)}}% ({{mailing.read}}/{{mailing.total}})
                  q-linear-progress(
                    :value="mailing.read/mailing.total"
                    size="xs"
                  )
            q-card-section.col(
              v-else
              :class="{'q-card-selection': mailing.selected}"
              v-touch-hold:600.mouse="(evt) => handleHold(evt, index)"
            )
              .q-pt-xs.text-grey.font-size-15 {{mailing.date.format('DD.MM.YYYY')}}
              .q-py-sm.lh {{mailing.message}}
              .q-pr-xs.row.font-size-15.justify-between
                .col.text-grey.q-pt-sm Прочитано:
                .col-8.text-right
                  .text-blue {{percentRead(mailing.read, mailing.total)}}% ({{mailing.read}}/{{mailing.total}})
                  q-linear-progress(
                    :value="mailing.read/mailing.total"
                    size="xs"
                  )
          template(v-slot:loading)
            .row.justify-center.q-py-md
              q-spinner(size="3em" color="red-2")
    q-item.q-pt-lg
      q-item-section
        q-item-label
          OriginalButton(
            v-if="atLeastOneMailingSelected()"
            color="red-2"
            @click="dialog.open = true"
          ) Удалить выбранные
          InactiveButton(
            v-else
          ) Удалить выбранные
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
                .text-h6.text-center.text-weight-bold.q-mt-md Удаление
                .text-grey.q-my-md.text-center.text-body1 Вы действительно хотите удалить сообщение?
                OriginalButton.q-mt-sm.full-width.text-red-2(
                  @click="removeMailing()"
                ) Удалить сообщение
                OriginalButton.q-mt-sm.full-width(
                  @click="dialog.open = false"
                ) Отмена
</template>
<script>
import Api from 'modules/api'
const api = new Api('Admin')

import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
// function getRandomIntInclusive (min, max) {
//   min = Math.ceil(min)
//   max = Math.floor(max)
//   return Math.floor(Math.random() * (max - min + 1)) + min
// }
import _ from 'lodash'
export default {
  name: 'monthly-current',
  components: { OriginalButton, InactiveButton },
  data: () => ({
    dialog: {
      open: false
    },
    holdActive: false,
    search: null,
    project: null,
    selectAll: false,
    message: '',
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
    mailings: []
  }),
  mounted () {
    // let not = {
    //   date: this.$moment().add(getRandomIntInclusive(-10, 0), 'day').add(getRandomIntInclusive(-2, 0), 'year'),
    //   message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis nisl eget amet lorem fermentum pellentesque laoreet quis. Odio habitant donec diam amet.',
    //   read: getRandomIntInclusive(0, 350),
    //   total: 0,
    //   selected: false
    // }
    // not.total = getRandomIntInclusive(not.read, 350)

    // this.mailings.push(not)
    // not = {
    //   date: this.$moment().add(getRandomIntInclusive(-10, 0), 'day').add(getRandomIntInclusive(-2, 0), 'year'),
    //   message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis nisl eget amet lorem fermentum pellentesque laoreet quis. Odio habitant donec diam amet.',
    //   read: getRandomIntInclusive(0, 350),
    //   total: 0,
    //   selected: false
    // }
    // not.total = getRandomIntInclusive(not.read, 350)

    // this.mailings.push(not)
    // not = {
    //   date: this.$moment().add(getRandomIntInclusive(-10, 0), 'day').add(getRandomIntInclusive(-2, 0), 'year'),
    //   message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis nisl eget amet lorem fermentum pellentesque laoreet quis. Odio habitant donec diam amet.',
    //   read: getRandomIntInclusive(0, 350),
    //   total: 0,
    //   selected: false
    // }
    // not.total = getRandomIntInclusive(not.read, 350)

    // this.mailings.push(not)
    this.show()
    console.log(this.mailings)
    this.mailings.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date)
    })
  },

  computed: {
  },

  methods: {
    atLeastOneMailingSelected () {
      for (const mailing in this.mailings) {
        if (this.mailings[mailing].selected) { return true }
      }
    },
    handleHold (evt, indexMailing) {
      this.holdActive = true
      this.mailings[indexMailing].selected = true
    },
    cancelSelection () {
      this.selectAll = false

      this.mailings.forEach(elem => {
        elem.selected = false
      })

      this.$nextTick(() => {
        this.holdActive = false
      })
    },
    removeMailing () {
      for (let i = this.mailings.length - 1; i >= 0; i--) {
        if (this.mailings[i].selected) {
          api.call('removeMonthMessage', { id: this.mailings[i].id })
            .then(() => {
              this.show()
            })
          // this.mailings.splice(i, 1)
        }
      }
      this.dialog.open = false
    },
    percentRead (read, total) {
      // мобилка
      if (total === 0) return 0
      return Math.round(read / total * 100)
    },
    show () {
      this.mailings = []
      api.call('showMonthMessage')
        .then(({ data }) => {
          console.log(data)
          // not =
          // not.total = getRandomIntInclusive(not.read, 350)
          _.each(data, (mail) => {
            this.mailings.push({
              date: this.$moment(mail.created_at),
              message: mail.message,
              id: mail.id,
              read: 0,
              total: 0,
              selected: false
            })
          })
        })
      console.log(this.mailings)
      console.log('current')
    }
  },
  watch: {
    selectAll () {
      if (this.selectAll) {
        this.mailings.forEach(elem => {
          elem.selected = this.selectAll
        })
      } else {
        this.mailings.forEach(elem => {
          elem.selected = false
        })
      }
      if (!this.holdActive) this.holdActive = true
    }
  }
}
</script>
<style scoped lang="scss">
  .border-radius-10 {
    border-radius: 10px;
  }
  .positioned-end {
    justify-content: flex-end !important;
  }
  .wrapper {
    display:flex;
    flex-direction: column;
  }
  .bottomButton {
    flex-grow: 1;
    align-items: flex-end;
    flex: 1;
  }
  .div-no-wrap {
    width: 80%;
    align-self: self-end;
    display: flex;
  }
  .text-no-wrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .img-blank {
    height: 110px;
    border-radius: 5px;
  }
  .click-photo {
    width: 100%;
    height: 100%;
  }
  .button-remove {
    position: absolute;
    transform: translate(25%, -25%);
    top: 0px;
    right: 0px;
    z-index: 1;
  }
  .checkbox-border {
    border: 1px !important;
    border-radius: 5px !important;
  }
  .checkbox-size {
    width: 30px;
    height: 20px;
  }
</style>
