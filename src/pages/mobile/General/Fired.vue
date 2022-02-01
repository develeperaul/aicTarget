<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.text-right
          router-link.q-ml-sm.text-blue.text-weight-550.font-size-15(tag="span",to="/auth") Выйти
    q-item
      q-item-section
        q-item-label
          div.text-h4.text-weight-bolder.text-left
            | Уважаемый коллега!
          div.text-body1.text-left.text-grey.q-my-md
            div К сожалению, Вы покидаете нашу
            div компанию. Для устранения
            div не благоприятных обстоятельств, просим
            div Вас заполнить короткую анкету, где
            div можно указать от одной до трёх причин увольнения.
          div.text-body1.text-left.text-grey.q-my-md
            div Данные ответов будут храниться в отделе
            div по работе с персоналом и не подлежат разглашению.
          div.text-body1.text-left.text-grey.q-my-md
            div Заранее спасибо!
    q-item
      q-item-section
        q-item-label
          OriginalButton.q-my-sm(
            color="red-2"
            @click="modal = true"
          ) Заполнить анкету
    q-dialog(
      v-model="modal"
      persistent
      seamless
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    )
      q-card
        q-item
          q-item-section
            q-item-label.text-right
              router-link.q-ml-sm.text-blue.text-weight-550.font-size-15(tag="span",to="/auth") Выйти
        q-item
          q-item-section
            q-item-label
              div.text-h4.text-weight-bolder.text-left
                | Причины увольнения
        q-list(separated)
          div(
            v-for="(reason, key) in reasons"
            :key="key"
          )
            q-item.q-pb-none
              q-item-section {{ reason.label }}
            q-item.column.q-py-none.q-pl-sm
              q-item-section
                q-radio(
                  size="xs"
                  v-model="radios.fiction[reason.key]"
                  :val="reason.key"
                  label="Нет"
                  @input="selectedRadioClear"
                )
                q-radio(
                  size="xs"
                  v-model="radios.first"
                  :val="reason.key"
                  label="Основная"
                  @input="selectedRadio1"
                )
                q-radio(
                  size="xs"
                  v-model="radios.second"
                  :val="reason.key"
                  label="Причина №2"
                  @input="selectedRadio2"
                )
                q-radio(
                  size="xs"
                  v-model="radios.third"
                  :val="reason.key"
                  label="Причина №3"
                  @input="selectedRadio3"
                )
            q-item(
              v-if="reason.has_comment"
            )
              q-item-section
                q-input(
                  outlined
                  v-model="comments[reason.key]"
                  bg-color="grey-2"
                  label="Комментарий"
                  color="red"
                )
        q-item
          q-item-section
            q-item-label
              OriginalButton.q-my-sm(
                color="red-2"
                @click="sendDismissal"
              ) Отправить
        div
          q-dialog(
            content-class="q-dialog-padding-fixed"
            v-model="dialog.open"
            persistent
          )
            q-card.full-width
              q-card-section
                q-item.q-px-xs
                  q-item-section
                    q-item-label
                      .text-h6.text-center.text-weight-bold.q-mt-md {{ dialog.title }}
                      .text-grey.q-my-md.text-center.text-body1 {{ dialog.subtitle }}
                      OriginalButton.q-mt-sm.full-width(
                        color="red-2"
                        @click="closeAll"
                      ) Закрыть
        //- q-card-section.row.items-center
        //-   q-avatar(icon='signal_wifi_off', color='primary', text-color='white')
        //-   span.q-ml-sm You are currently not connected to any network.
        //- q-card-actions(align='right')
        //-   q-btn(flat, label='Cancel', color='primary', v-close-popup)
        //-   q-btn(flat, label='Turn on Wifi', color='primary', v-close-popup)
</template>
<script>
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import OriginalButton from 'components/OriginalButton.vue'
import _ from 'lodash'

import Api from 'modules/api'
// eslint-disable-next-line no-unused-vars
const api = new Api('User')

export default {
  name: 'fired',
  components: { OriginalButton },
  data: () => ({
    modal: false,

    comments: {},

    radios: {
      fiction: {},
      first: null,
      second: null,
      third: null
    },
    reasons: [
      {
        label: '01. Низкая заработная плата',
        key: 'reason-1'
      },
      {
        label: '02. По семейным обстоятельствам',
        key: 'reason-2',
        has_comment: true
      },
      {
        label: '03. Слишком тяжелая нагрузка (тяжело справляться с работой)',
        key: 'reason-3'
      },
      {
        label: '04. По состоянию здоровья',
        key: 'reason-4'
      },
      {
        label: '05. Смена рода деятельности (работа по другой специальности, хобби и т.п.)',
        key: 'reason-5'
      },
      {
        label: '06. Не сложились отношения с руководителем',
        key: 'reason-6'
      },
      {
        label: '07. Работа не соответствовала ожиданиям',
        key: 'reason-7'
      },
      {
        label: '08. Удаленность от дома',
        key: 'reason-8'
      },
      {
        label: '09. Перевод в рамках проекта',
        key: 'reason-9'
      },
      {
        label: '10. Отсутствие перспектив карьерного роста',
        key: 'reason-10'
      },
      {
        label: '11. Нет четкой организации и дисциплины',
        key: 'reason-11'
      },
      {
        label: '12. Не устроил график работы',
        key: 'reason-12'
      },
      {
        label: '13. Другое',
        key: 'reason-13',
        has_comment: true
      }
    ],
    dialog: {
      open: false,
      title: 'Спасибо!',
      subtitle: 'Благодарим Вас за сотрудничество и заполнение анкеты!'
    }
  }),
  mounted () {
    _.each(this.reasons, (reason) => {
      this.$set(this.radios.fiction, reason.key, reason.key)
      this.$set(this.comments, reason.key, '')
    })
  },
  watch: {
    'radios.first': {
      handler: function (news, old) {
        if (!this.isSelectedRadio(old)) {
          this.$set(this.radios.fiction, old, old)
        }
      }
    },
    'radios.second': {
      handler: function (news, old) {
        if (!this.isSelectedRadio(old)) {
          this.$set(this.radios.fiction, old, old)
        }
      }
    },
    'radios.third': {
      handler: function (news, old) {
        if (!this.isSelectedRadio(old)) {
          this.$set(this.radios.fiction, old, old)
        }
      }
    }
  },
  methods: {
    isSelectedRadio (key) {
      return (
        this.radios.first === key ||
        this.radios.second === key ||
        this.radios.third === key
      )
    },
    selectedRadioClear (val, evt) {
      if (this.radios.first === val) {
        this.radios.first = null
      }
      if (this.radios.second === val) {
        this.radios.second = null
      }
      if (this.radios.third === val) {
        this.radios.third = null
      }

      this.$set(this.radios.fiction, val, val)
    },
    selectedRadio1 (val, evt) {
      this.$set(this.radios.fiction, val, false)

      // if (this.radios.first != null) {
      //   console.log(this.radios.first)
      //   // this.$set(
      //   //   this.radios.fiction,
      //   //   this.radios.second,
      //   //   this.radios.second
      //   // )
      // }

      if (this.radios.second === val) {
        this.radios.second = null
      }
      if (this.radios.third === val) {
        this.radios.third = null
      }
    },
    selectedRadio2 (val, evt) {
      this.$set(this.radios.fiction, val, false)

      if (this.radios.first === val) {
        this.radios.first = null
      }
      if (this.radios.third === val) {
        this.radios.third = null
      }
    },
    selectedRadio3 (val, evt) {
      this.$set(this.radios.fiction, val, false)

      if (this.radios.first === val) {
        this.radios.first = null
      }
      if (this.radios.second === val) {
        this.radios.second = null
      }
    },
    sendDismissal (btn) {
      let reason1Name, reason1Comment = null
      let reason2Name, reason2Comment = null
      let reason3Name, reason3Comment = null

      let validated = true

      _.each(this.reasons, (reason) => {
        if (reason.key === this.radios.first) {
          reason1Name = reason.label
          reason1Comment = this.comments[reason.key]
          if (reason.has_comment && reason1Comment === '') {
            this.$q.notify({ type: 'negative', message: 'Не написан комментарий для основной причины' })
            validated = false
          }
        }
        if (reason.key === this.radios.second) {
          reason2Name = reason.label
          reason2Comment = this.comments[reason.key]
          if (reason.has_comment && reason2Comment === '') {
            this.$q.notify({ type: 'negative', message: 'Не написан комментарий для причины №2' })
            validated = false
          }
        }
        if (reason.key === this.radios.third) {
          reason3Name = reason.label
          reason3Comment = this.comments[reason.key]
          if (reason.has_comment && reason3Comment === '') {
            this.$q.notify({ type: 'negative', message: 'Не написан комментарий для причины №3' })
            validated = false
          }
        }
        // this.$set(this.radios.fiction, reason.key, reason.key)
      })

      btn.offLoad()

      if (validated) {
        api.call('saveDismissal', {
          reason_one: reason1Name,
          reason_one_comment: reason1Comment,
          reason_two: reason2Name,
          reason_two_comment: reason2Comment,
          reason_three: reason3Name,
          reason_three_comment: reason3Comment
        })
          .then(({ data }) => {
            this.dialog.open = true
          })
          .finally(() => {
            btn.offLoad()
          })
        // console.log('all validated')
      }
      // console.log()
      // api.call('saveDismissal', {

      //  })
      //   .then(({ data }) => {
      //     this.dialog.open = true
      //   })
      //   .finally(() => {
      //     btn.offLoad()
      //   })
    },
    closeAll (btn) {
      this.dialog.open = false
      this.modal = false

      this.$q.localStorage.remove('token')
      this.$router.push('/auth')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    }
  }
}
</script>
