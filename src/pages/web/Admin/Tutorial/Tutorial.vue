<template lang="pug">
  q-page
    //- q-btn(
    //-   label="test"
    //-   @click="test"
    //- )
    .q-pb-lg.text-h4.text-weight-bolder
      | Новый обучающий материал
    .row.q-mb-lg
      q-card.col-6(
        flat
        bordered
        style="height: 55px"
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
              v-if="key < 1"
              vertical
            )
      .col-6.justify-end.row.items-end
        OriginalButton.q-px-lg(
          v-if="selectedPage == 1"
          @click="(btn) => {removeall = true; btn.offLoad()}"
        )
          .text-blue Удалить все
        q-checkbox.checkbox-border.q-pr-lg(
          v-if="selectedPage == 2"
          v-model="selectAll"
          label="Выбрать все"
          left-label
        )
    component(
      :is="`admin-tutorial-${selectedPage}`"
      :removeall="removeall"
    )
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import components from './index'
// import _ from 'lodash'
// import Api from 'modules/api'
// const api = new Api('Admin')

export default {
  components: { ...components, OriginalButton, InactiveButton },
  props: {
    removeall: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      // removeall: false,
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
      tab: 'adding_new',
      tabs: [
        {
          name: 'adding_new',
          label: 'Добавление нового',
          data: null
        },
        {
          name: 'recipient_list',
          label: 'Список получателей',
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
    // removeMaterials (btn) {
    //   btn.offLoad()
    //   this.$emit('removeall')
    // }
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
