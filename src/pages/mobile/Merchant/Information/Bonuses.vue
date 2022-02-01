<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Информирование"
            to="/home/merchant/information"
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
            | Бонусы и доплаты
    q-item
      q-item-section
        q-item-label.text-grey
          | Получить информацию по отдельному бонусу или доплате:
    q-item
      q-item-section
        q-item-label
          .text-h4.text-weight-bolder.q-pa-md.text-center(v-if="bonuses.length == 0")
            | Бонусов нет
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
            height="auto"
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
                    q-item.no-padding(v-for="(dat, kk) in bonus.data" :key="`kk-${kk}`")
                      q-item-section(v-if="dat")
                        q-item-label.q-py-lg.row.justify-between.no-wrap
                          .text-grey-5 {{ kk }}:
                          span(:class="typeof dat == 'string' ? 'text-wrap text-right' : 'text-no-wrap'")
                            span(v-if="dat >=0 && dat <= 1") {{ Math.round(dat * 100) }}%
                            span(v-else-if="typeof dat == 'number'") {{ dat }} руб.
                            span(v-else) {{ dat }}
                            //- | {{ bonus.share_of_the_total }} руб.
                    //- q-item.no-padding
                    //-   q-item-section
                    //-     q-item-label.q-py-lg.row.justify-between.no-wrap(
                    //-       @click="modal.paysheet = true"
                    //-     )
                    //-       .text-grey-5 План:
                    //-       .text-no-wrap {{ bonus.plan * 100 }}%
                    //- q-item.no-padding
                    //-   q-item-section
                    //-     q-item-label.q-py-lg.row.justify-between.no-wrap
                    //-       .text-grey-5 Факт:
                    //-       .text-no-wrap.text-green {{ bonus.fact }}%
                    //- q-item.no-padding
                    //-   q-item-section
                    //-     q-item-label.q-py-lg.row.justify-between.no-wrap
                    //-       .text-grey-5 Выплата процентов:
                    //-       .text-no-wrap {{ bonus.interest_payment }}%
                    //- q-separator.q-mb-md
    //- q-item.q-pt-lg
    //-   q-item-section
    //-     q-item-label
    //-       OriginalButton Скачать все бонусы
    //-         template(#last)
    //-           span &nbsp;
    //-           span.text-red-2 .pdf
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
import Api from 'modules/api'
const api = new Api('MerchantBonuses')

import _ from 'lodash'

export default {
  components: { OriginalButton, HeaderSettings, InactiveButton },
  data: () => ({
    dialog: {
      open: false
    },
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
    logOut () {
      this.$q.localStorage.remove('token')
      this.$router.push('/auth')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    }
  },
  mounted () {
    api.call('getBonuses')
      .then(({ data }) => {
        console.log(data)
        _.each(data, (bonus, key) => {
          this.bonuses.push({
            title: `Бонус №${key + 1}`,
            data: bonus
            // share_of_the_total: bonus.share_of_the_total,
            // plan: bonus.plan,
            // fact: Math.round(bonus.fact * 100),
            // interest_payment: Math.round(bonus.interest_payment * 100)
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
