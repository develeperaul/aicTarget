<template lang="pug">
  div
    q-item
      q-item-section
        q-item-label
          .text-grey-5.font-size-13
            | Удаленные сообщения будут храниться в течение 30 дней, после этого восстаносить их будет невозможно
    .q-content-spinner(v-if="isLoading")
      q-spinner-puff(
        color="red"
        size="3em"
      )
    div(
      v-for="(notifies, key) in getFormatNotifications"
      :key="`${key}-notifies`"
    )
      //- | {{ isFullyHidden(key) }}
      q-slide-transition(:duration="duration")
        div(v-if="!isFullyHidden(key)")
          q-banner.bg-grey-2.text-left(dense).q-pl-md.q-my-md(
            transition-hide="slide-up"
          ) {{ notifies[0].date.format('DD.MM.YYYY') }}
      q-slide-transition(:duration="duration")
        q-list(
          v-if="!isFullyHidden(key)"
          transition-hide="slide-up"
          separator
        )
            q-slide-transition(
              v-for="(notify, key_n) in notifies"
              :key="`${key}-${key_n}-notify`"
              :duration="duration"
              @hide="onFullyHidden(notify.id)"
            )
              q-slide-item(
                @right="(details) => { onRight(details, notify.id) }"
                right-color="white"
                v-if="!notify.hide"
                transition-hide="slide-up"
              )
                template(v-slot:right)
                  q-icon(color="accent")
                    svg
                      use(xlink:href="undo-blue.svg#undo-blue")

                q-item(
                  :to="{ name: 'message', params: {id: notify.id} }"
                  clickable
                  v-ripple
                )
                  q-item-section.q-py-md
                    q-item-label.text-body1.text-weight-550.text-grey
                      | {{ notify.title }}
                  q-item-section.positioned-end(v-if="notify.has_important" side)
                    q-icon(name="mdi-alert-circle-outline" size="20" color="primary")
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
                .text-h6.text-center.text-weight-bold.q-mt-md Восстановление
                .text-grey.q-my-md.text-center.text-body1 Вы действительно хотите восстановить сообщение?
                OriginalButton.q-mt-sm.full-width.text-red-2(
                  @click="onRightParametr(true)"
                ) Восстановить сообщение
                OriginalButton.q-mt-sm.full-width(
                  @click="onRightParametr(false)"
                ) Отмена
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import _ from 'lodash'

import Api from 'modules/api'
const api = new Api('HomeMerchant')

export default {
  name: 'merchant-deleted',
  components: { OriginalButton },
  data: () => ({
    isLoading: false,
    duration: 100,
    notifications: [],
    dialog: {
      open: false,
      id_notify: null,
      ready: null
    }
  }),
  mounted () {
    this.isLoading = true
    api.call('getDeleted')
      .then(({ data }) => {
        _.each(data.data, (notification) => {
          this.notifications.push({
            id: notification.id,
            label: notification.label,
            title: notification.title,
            date: this.$moment(notification.created_at),
            has_important: notification.has_important
          })
        })

        this.$nextTick(() => {
          _.each(this.notifications, (element, key) => {
            this.$set(this.notifications[key], 'hide', false)
          })
          setTimeout(() => {
            this.duration = 300
          }, 100)
        })
      })
      .catch()
      .finally(() => {
        this.isLoading = false
      })
  },

  computed: {
    getFormatNotifications () {
      return _.orderBy(
        _.groupBy(
          _.orderBy(this.notifications, 'created_at', 'desc'),
          (notify) => notify.date.format('D.MM.YYYY')
        ),
        (val, key) => key,
        'desc'
      )
    },
    isFullyHidden () {
      return (key) => _.filter(this.getFormatNotifications[key], { hide: false }).length === 0
      // return _.every(this.notifications, { hide: false,  })
    }
  },

  methods: {
    onRight (details, idNotify) {
      // this.ready = details.ready
      // console.log(details)
      this.dialog = {
        open: true,
        id_notify: idNotify,
        ready: details.reset
      }
      // notify.hide = true
      // const ind = _.findIndex(this.notifications, { id_notify: idNotify })
      // this.$set(this.notifications[ind], 'hide', true)
    },
    onRightParametr (bool) {
      this.dialog.open = false
      this.dialog.ready()
      if (bool) {
        const ind = _.findIndex(this.notifications, { id: this.dialog.id_notify })
        this.$set(this.notifications[ind], 'hide', true)

        api.call('restoreMessage', { id: this.dialog.id_notify })
      }
    },
    onFullyHidden (idNotify) {
      setTimeout(() => {
        // TODO: Axios send API
      // this.$del(this.)
      // console.log(idNotify)
        // const ind = _.findIndex(this.notifications, { id_notify: idNotify })
        // this.$delete(this.notifications, ind)
      // this.notifications.splice(ind, 1)
      }, 500)
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
</style>
