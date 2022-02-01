<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Информирование"
            to="/home/merchant/information"
          )
          header-avatar
            q-list
              q-item(clickable)
                q-item-section(no-wrap)
                  router-link(tag="span",to="#")
                    | Первая кнопка
              q-item(clickable)
                q-item-section(no-wrap)
                  router-link(tag="span",to="")
                    | Вторая кнопка
    q-item
      q-item-section
        q-item-label
          .text-h4.text-weight-bolder.q-mb-md
            | Бонусы и доплаты
    q-item
      q-item-section
        q-item-label.text-grey
          | Получить информацию по отдельному бонусу или доплате:
    q-item
      q-item-section
        q-item-label
          q-carousel.bg-white.rounded-borders(
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            control-color="black"
            navigation-icon="mdi-circle-medium"
            navigation-active-icon="mdi-circle"
            navigation
            padding
            height="450px"
          )
            q-carousel-slide.column.no-wrap.flex-center.q-px-none.q-pt-none(
              :name="key"
              v-for="(bonus, key) in bonuses"
              :key="key"
            )
              q-card(flat bordered).full-width
                q-card-section.bg-grey-2
                  .text-weight-550 Бонус: "{{ bonus.title }}"
                q-card-section
                  q-list.q-px-xs(separator)
                    q-item.no-padding
                      q-item-section
                        q-item-label.q-py-lg.row.justify-between.no-wrap
                          .text-grey-5 Доля от общей суммы:
                          .text-no-wrap {{ bonus.share_of_the_total }} руб.
                    q-item.no-padding
                      q-item-section
                        q-item-label.q-py-lg.row.justify-between.no-wrap(
                          @click="modal.paysheet = true"
                        )
                          .text-grey-5 План:
                          .text-no-wrap {{ bonus.plan * 100 }}%
                    q-item.no-padding
                      q-item-section
                        q-item-label.q-py-lg.row.justify-between.no-wrap
                          .text-grey-5 Факт:
                          .text-no-wrap.text-green {{ bonus.fact }}%
                    q-item.no-padding
                      q-item-section
                        q-item-label.q-py-lg.row.justify-between.no-wrap
                          .text-grey-5 Выплата процентов:
                          .text-no-wrap {{ bonus.interest_payment }}%
                    q-separator.q-mb-md
    q-item.q-pt-lg
      q-item-section
        q-item-label
          OriginalButton Скачать все бонусы
            template(#last)
              span &nbsp;
              span.text-red-2 .pdf
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import Api from 'modules/api'
const api = new Api('MerchantBonuses')

import _ from 'lodash'

export default {
  components: { OriginalButton },
  data: () => ({
    slide: 0,
    bonuses: [
      // {
      //   title: 'Основы мерчендайзинга',
      //   value1: 7000.36,
      //   value2: 100,
      //   value3: 110,
      //   value4: 10
      // },
      // {
      //   title: 'Другой бонус',
      //   value1: 111,
      //   value2: 222,
      //   value3: 333,
      //   value4: 444
      // },
      // {
      //   title: 'Еще один бонус',
      //   value1: 111,
      //   value2: 222,
      //   value3: 333,
      //   value4: 444
      // },
      // {
      //   title: 'Еще один бонус',
      //   value1: 111,
      //   value2: 222,
      //   value3: 333,
      //   value4: 444
      // },
      // {
      //   title: 'Еще один бонус',
      //   value1: 111,
      //   value2: 222,
      //   value3: 333,
      //   value4: 444
      // }
    ]
  }),
  methods: {
  },
  mounted () {
    api.call('getBonuses')
      .then(({ data }) => {
        _.each(data, (bonus) => {
          this.bonuses.push({
            title: bonus.title,
            share_of_the_total: bonus.share_of_the_total,
            plan: bonus.plan,
            fact: Math.round(bonus.fact * 100),
            interest_payment: Math.round(bonus.interest_payment * 100)
          })
        })

        // this.$nextTick(() => {
        //   _.each(this.notifications, (element, key) => {
        //     this.$set(this.notifications[key], 'hide', false)
        //     this.$set(this.notifications[key], 'id_notify', key)
        //   })
        //   setTimeout(() => {
        //     this.duration = 300
        //   }, 100)
        // })
      })
      .catch()
      .finally(() => {
        this.isLoading = false
      })
  }
}
</script>
