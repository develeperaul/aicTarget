<template lang="pug">
  q-page
    //- q-btn(
    //-   label="test"
    //-   @click="test"
    //- )
    .q-pb-xl.q-pt-sm.text-h4.text-weight-550
      | Сообщения
    .row.q-mb-lg
      q-card.col-6(
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
          dense
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
              @click="selectedPage=key+1"
            )
            q-separator(
              v-if="key < 2"
              vertical
            )
      .col-6.justify-end.row.items-end
        q-checkbox.checkbox-border.q-pr-lg(
          v-if="selectedPage == 1"
          v-model="selectAll"
          label="Выбрать все"
          left-label
        )
    component(
      :is="`admin-messages-${selectedPage}`"
    )
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import components from './Pages/index'
// import _ from 'lodash'
// import Api from 'modules/api'
// const api = new Api('Admin')

export default {
  components: { ...components, OriginalButton, InactiveButton },
  data () {
    return {
      selectAll: false,
      user_ids: [123, 123, 123],
      inputs: {
        label: 'qqqqq'
      // user_id: 1
      },
      errors: {
        label: null
      // user_id: null
      },
      received_all_data: null,
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
      selectedPage: 1,
      tab: 'new_message',
      tabs: [
        {
          name: 'new_message',
          label: 'Новое сообщение',
          data: null
        },
        {
          name: 'messages_history',
          label: 'История сообщений',
          data: null
        },
        {
          name: 'mailing',
          label: 'Рассылка',
          data: null
        }
      ]
    }
  },
  watch: {
    selectedPage () {
      this.selectAll = false
    },
    selectAll () {
      this.$root.$emit('select-all', this.selectAll)
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    test () {
    }
  }
}
</script>
<style scoped lang="scss">
  .footer-header {
    height: 177px;
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
