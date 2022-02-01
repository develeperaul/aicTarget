<template lang="pug">
  div
    .q-content-spinner(v-if="isLoading")
      q-spinner-puff(
        color="red"
        size="3em"
      )
    div(v-else)
      .q-pa-xl.text-center(v-if="getFormatNotifications.length == 0")
        | Нет новых уведомлений
      div(
        v-for="(notifies, key) in getFormatNotifications"
        :key="`${key}-notifies`"
      )
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
                    .row.items-center.text-red
                      q-icon(name="mdi-trash-can-outline")
                  q-item.full-width.text-left(
                    @click="readMessage(notify.id)"
                    clickable
                    v-ripple
                  )
                    q-item-section.q-py-md
                      q-item-label.text-weight-550(
                        :class="{'text-grey': notify.read}"
                      )
                        | {{ notify.title }}
                    q-item-section.positioned-end(v-if="notify.has_important" side)
                      q-icon(name="mdi-alert-circle-outline" size="20" color="primary")
    q-item(v-if="!isLoading")
      q-item-section
        q-item-label
          OriginalButton.q-my-sm.q-mb-md(
            :disabled="!userInfo.is_active"
            :to="userInfo.is_active?'/home/merchant/information':''"
            color="red-2"
          ) Запросить информацию
          OriginalButton.q-py-md(
            v-if="userInfo.role_name != 'Супервайзер'"
            :disabled="!userInfo.is_active"
            :to="userInfo.is_active?'/home/merchant/training-testing':''"
          ) Обучающие материалы
          OriginalButton.q-py-md(
            v-if="userInfo.role_name == 'Супервайзер'"
            :disabled="!userInfo.is_active"
            :to="userInfo.is_active?'/home/merchant/territory':''"
          ) Управление территорией
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
                OriginalButton.q-mt-sm.text-red-2(
                  @click="onRightParametr(true)"
                ) Удалить сообщение
                OriginalButton.q-mt-sm(
                  @click="onRightParametr(false)"
                ) Отмена
</template>
<script>
import Api from 'modules/api'
const api = new Api('HomeMerchant')

import OriginalButton from 'components/OriginalButton.vue'
import _ from 'lodash'

export default {
  name: 'merchant-actual',
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
    api.call('getActual')
      .then(({ data }) => {
        // this.notifications = data.data
        _.each(data.data, (notification) => {
          this.notifications.push({
            id: notification.id,
            label: notification.label,
            title: notification.title,
            read: notification.read,
            date: this.$moment(notification.created_at),
            dateunix: this.$moment(notification.created_at).format('X'),
            has_important: notification.is_important
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
    userInfo () {
      return this.$store.getters['user/info']
    },
    getFormatNotifications () {
      return _.orderBy(
        _.groupBy(
          _.orderBy(this.notifications, 'dateunix', 'desc'),
          (notify) => notify.date.format('DD.MM.YYYY')
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
    test () {
      console.log('notifications: ', this.notifications)
      // console.log('getFormat: ', this.getFormatNotifications)
    },
    onRightParametr (bool) {
      this.dialog.open = false
      this.dialog.ready()
      if (bool) {
        const ind = _.findIndex(this.notifications, { id: this.dialog.id_notify })
        this.$set(this.notifications[ind], 'hide', true)

        api.call('deleteMessage', { id: this.dialog.id_notify })
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
    },
    readMessage (notifyId) {
      api.call('readMessage', { id: notifyId })
      this.$router.push({ name: 'message', params: { id: notifyId } })
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
