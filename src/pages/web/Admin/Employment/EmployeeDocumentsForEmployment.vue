<template lang="pug">
  q-page
    //- q-btn(
    //-   label="test"
    //-   @click="test"
    //- )
    q-card.q-pa-none.q-mb-xl(
      flat
      bordered
    )
      q-tabs(
        v-model="tab"
        inline-label
        no-caps
        outside-arrows
        class="bg-white"
        active-color="red-2"
      )
        q-card-section.full-width.q-pa-none(
          v-for="(tab, key) in tabs"
          :key="key"
          horizontal
          style="position:unset"
        )
          q-tab.full-width.q-py-sm(
            :name="tab.name"
            :label="tab.label"
            @click="selectedDoc=key+1"
          )
            div(
              v-if="tab.data.verified"
              style="position: absolute;bottom: -12px;z-index: 4000;background: rgb(255, 255, 255);transform: translateX(100%);"
            )
              q-icon(name="mdi-checkbox-marked-circle" color="green")
          q-separator(
            v-if="key < tabs.length-1"
            vertical
          )
    .row.justify-center
      .col-6.q-pr-md
        q-card.q-mb-sm.q-py-md.q-pl-md.q-pr-lg(
          flat
          bordered
        )
          q-scroll-area.rounded-borders(
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            style="height: 515px;"
          )
            q-card-section.items-center.q-pr-lg(
            )
              component(
                :is="`admin-register-${selectedDoc}`"
                :all_data="received_all_data"
              )
      .col-6.q-pl-md
        q-card(
          flat
          bordered
        )
          q-card-section.items-center.q-pa-none(
          )
            q-tab-panels(
              v-model="tab"
              animated
              style="height: 515px;"
            )
              q-tab-panel.q-pa-none(
                v-for="(tab, key) in tabs"
                :key="key"
                :name="tab.name"
              )
                q-item.q-pa-none
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
                        padding
                        height="300px"
                      )
                        q-carousel-slide.column.no-wrap.flex-center.q-pa-none.q-pt-none(
                          :name="key"
                          v-for="(photo, key) in tab.data.photos"
                          :key="key"
                        )
                          .click-photo(
                            v-gallery
                            :data-large="photo"
                          )
                            q-img.rounded-borders(
                              :src="photo"
                            )
    q-footer.bg-white.footer-header.row.items-center(
      bordered
     )
      q-toolbar.max-width.q-px-xl
        .col-6.q-pr-md
          .row.justify-between(
            v-for="(tab, key) in tabs"
            :key="key"
          )
            q-checkbox.text-black(
              v-model="tab.data.verified"
              v-if="key==selectedDoc-1 && key != 10"
              :true-value="true"
              :false-value="false"
              @input="verifyDoc"
            )
              .q-pl-sm Отметить проверенным
            span.text-blue.row.items-center.underline(
              v-if="key==selectedDoc-1 && key != 10"
              @click="click()"
            ) Переделать фотографию
        .col-6.q-pl-md
          .row.items-center.justify-end.text-no-wrap
            OriginalButton.q-mr-lg.text-black.q-px-lg(
              v-if="selectedDoc > 1"
              @click="(btn) => { selectedDoc--; btn.offLoad() }"
            ) Назад
            InactiveButton.q-mr-lg.text-black.q-px-lg(
              v-else
            ) Назад
            OriginalButton.q-px-lg(
              color="red-2"
              v-if="selectedDoc < 11"
              @click.native="(btn) => { selectedDoc = selectedDoc + 1;  }"
            ) Далее
            OriginalButton.q-px-lg(
              color="red-2"
              v-if="selectedDoc == 11  && allDocsAreVerified"
              @click="verifyRegistration"
            ) Отправить
            InactiveButton.q-px-lg(
              v-if="selectedDoc == 11 && !allDocsAreVerified"
            ) Отправить
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import components from './Docs/index'
import _ from 'lodash'
import Api from 'modules/api'
const api = new Api('Admin')

export default {
  components: { ...components, OriginalButton, InactiveButton },
  data () {
    return {
      comment: null,
      received_all_data: null,
      employees: [],
      thumbStyle: {
        right: '-2px',
        borderRadius: '10px',
        backgroundColor: '#C22821',
        width: '6px',
        opacity: 1
      },
      barStyle: {
        right: '-2px',
        borderRadius: '10px',
        backgroundColor: '#F2F2F2',
        width: '6px',
        opacity: 1
      },
      slide: 0,
      selectedDoc: 1,
      tab: 'passport',
      tabs: [
        {
          name: 'passport',
          label: 'Паспорт',
          data: null
        },
        {
          name: 'passport_other',
          label: 'Паспорт (доп.)',
          data: null
        },
        {
          name: 'inn',
          label: 'ИНН',
          data: null
        },
        {
          name: 'snils',
          label: 'СНИЛС',
          data: null
        },
        {
          name: 'bank_card',
          label: 'Карта',
          data: null
        },
        {
          name: 'bank_account',
          label: 'Реквизиты',
          data: null
        },
        {
          name: 'medcard',
          label: 'Медицинская книжка',
          data: null
        },
        {
          name: 'work_card',
          label: 'Трудовая',
          data: null
        },
        {
          name: 'a',
          label: 'Права',
          data: null
        },
        {
          name: 'b',
          label: 'СТС',
          data: null
        },
        {
          name: 'c',
          label: 'Вакансия',
          data: null
        }
      ]
    }
  },
  mounted () {
    api.call('showOneApplication', {
      params: {
        uuid: this.$route.params.uuid
      }
    })
      .then(({ data }) => {
        data = data.data
        this.tabs[0].data = data.passport
        this.tabs[1].data = data.passport // passport_other
        this.tabs[2].data = data.inn
        this.tabs[3].data = data.snils
        this.tabs[4].data = data.bank_card
        this.tabs[5].data = data.bank_account
        this.tabs[6].data = data.medcard
        this.tabs[7].data = data.work_card
        this.tabs[8].data = data.passport // driver's license
        this.tabs[9].data = data.passport // sts
        this.tabs[10].data = data.passport // vacancy
        this.received_all_data = data
      })
  },
  computed: {
    allDocsAreVerified () {
      return this.tabs.every(elem => elem.data.verified)
    }
  },
  watch: {
    selectedDoc (newDoc, oldDoc) {
      const data = this.tabs[newDoc - 1]
      this.tab = data.name
    }
  },
  methods: {
    test () {
      // console.log(this.tabs[2].data.verified)
      // console.log(this.selectedDoc)
      // for (let i = 0; i < this.tabs.length; i++) {
      //   if (this.tabs[i].doc === this.selectedDoc) {
      //     console.log(this.tabs[i])
      //   }
      // }
    },
    verifyDoc () {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })

      const fd = new FormData()
      fd.append('uuid', this.$route.params.uuid)
      fd.append('doc', this.selectedDoc)

      _.each(this.tabs, (val, key) => {
        if (key === this.selectedDoc - 1) {
          fd.append('conclusion', this.tabs[key].data.verified)
        }
      })

      api.call('verifyDocWeb', fd)
        .then(({ data }) => {
          console.log(fd)
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
    },
    verifyRegistration (btn) {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })

      const fd = new FormData()
      fd.append('uuid', this.$route.params.uuid)
      fd.append('comment', this.comment)

      api.call('verifyRegistrationWeb', fd)
        .then(({ data }) => {
          console.log(fd)
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
          btn.offLoad()
        })
    }
  }
}
</script>
<style scoped lang="scss">
  .footer-header {
    height: 100px;
  }
  .max-width {
    max-width: 1440px;
    margin: 0 auto;
  }
  .click-photo {
    width: 100%;
    height: auto;
  }
  .underline {
    text-decoration: underline;
  }
</style>
