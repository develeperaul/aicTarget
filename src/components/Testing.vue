<template lang="pug">
  //- div
    div
      q-radio(v-model="filter" val="all")
      q-radio(v-model="filter" :val="1")
      q-radio(v-model="filter" :val="2")
    div
      div(v-for="index in projectsFilter")
        | {{ index.title }}
  div(ref="pageIngo")
    croppa(
      :initial-image="image"
      :show-remove-button="false"
      :width="styleCroppa.width"
      :height="styleCroppa.height"
      initial-size="contain"
      :zoom-speed="7"
      placeholder=""
    )
    .block-sticky(
      :style="{ height: `${stylePan.height}px` }"
    )
      div.q-pa-md(style="flex: 1;align-items: center;display: flex;flex-direction: column;")
        q-avatar(
          style="position:absolute;top:-25px"
          color="primary"
          text-color="white"
          size="50px"
          icon="mdi-menu"
          v-touch-pan.vertical.prevent.mouse="handlePan"
        )
        //- q-separator
        //- div(style="flex: 1 1 0%;align-items: center;display: flex;flex-direction: row-reverse;")
          div(style="flex: 1 1 0%;align-items: center;display: flex;flex-direction: column-reverse;")
      div(style="height: calc(100% - 32px); position:relative; overflow-y:scroll;  -webkit-overflow-scrolling: touch;")
        q-item
          q-item-section
            q-item-label
              q-input(
                outlined
                bg-color="grey-2"
                v-model="all_data.passport.last_name"
                label="Фамилия*"
                color="red"
              )
                template.q-pa-none(
                  v-slot:append
                  v-if="isFull(all_data.passport.last_name)"
                )
                  svg.q-pl-none(width="12" height="8")
                    use.q-pl-none(xlink:href="check-mark.svg#check-mark")
        q-item
          q-item-section
            q-item-label
              q-input(
                outlined
                bg-color="grey-2"
                v-model="all_data.passport.first_name"
                label="Имя*"
                color="red"
              )
                template.q-pa-none(
                  v-slot:append
                  v-if="isFull(all_data.passport.first_name)"
                )
                  svg.q-pl-none(width="12" height="8")
                    use.q-pl-none(xlink:href="check-mark.svg#check-mark")
        q-item
          q-item-section
            q-item-label
              q-input(
                outlined
                bg-color="grey-2"
                v-model="all_data.passport.patronymic"
                label="Отчество*"
                color="red"
              )
                template.q-pa-none(
                  v-slot:append
                  v-if="isFull(all_data.passport.patronymic)"
                )
                  svg.q-pl-none(width="12" height="8")
                    use.q-pl-none(xlink:href="check-mark.svg#check-mark")
        q-item
          q-item-section
            q-item-label
              q-input(
                outlined
                bg-color="grey-2"
                label="Дата рождения*"
                color="red"
                ref="dataTarget"
                v-model="all_data.passport.birthday_at"
                mask="##.##.####"
                fill-mask="-"
                unmasked-value
              )
                template(v-slot:append)
                  .text-body2.text-blue(
                    v-if="!calendarDateOfBirthVisibility"
                    @click="toggleCalendar('dateOfBirth')"
                  ) Выбрать
                  .text-body2.text-blue(
                    v-else
                    @click="toggleCalendar('dateOfBirth')"
                  ) Свернуть
            q-slide-transition
              q-item-label(
                v-if="calendarDateOfBirthVisibility"
                transition-show="slide-down"
                transition-hide="slide-up"
              )
                q-date.full-width(
                  flat
                  v-model="all_data.passport.birthday_at"
                  mask="DD.MM.YYYY"
                  minimal
                  :locale="$utils.calendarLocale"
                )
        q-item
          q-item-section
            q-item-label
              q-input(
                outlined
                bg-color="grey-2"
                v-model="all_data.passport.passport_id"
                label="Серия и номер*"
                color="red"
                mask="##-##-######"
              )
                template.q-pa-none(
                  v-slot:append
                  v-if="isFull(all_data.passport.passport_id)"
                )
                  svg.q-pl-none(width="12" height="8")
                    use.q-pl-none(xlink:href="check-mark.svg#check-mark")
        q-item
          q-item-section
            q-item-label
              q-input(
                outlined
                bg-color="grey-2"
                label="Дата выдачи*"
                color="red"
                ref="dataTarget"
                v-model="all_data.passport.issuance_at"
                mask="##.##.####"
                fill-mask="-"
                unmasked-value
              )
                template(v-slot:append)
                  .text-body2.text-blue(
                    v-if="!calendarDateOfIssueVisibility"
                    @click="toggleCalendar('dateOfIssue')"
                  ) Выбрать
                  .text-body2.text-blue(
                    v-else
                    @click="toggleCalendar('dateOfIssue')"
                  ) Свернуть
            q-slide-transition
              q-item-label(
                v-if="calendarDateOfIssueVisibility"
                transition-show="slide-down"
                transition-hide="slide-up"
              )
                q-date.full-width(
                  flat
                  v-model="all_data.passport.issuance_at"
                  mask="DD.MM.YYYY"
                  minimal
                  :locale="$utils.calendarLocale"
                )
        q-item
          q-item-section
            q-item-label
              q-input(
                outlined
                bg-color="grey-2"
                v-model="all_data.passport.place_of_birth"
                label="Место рождения*"
                color="red"
              )
                template.q-pa-none(
                  v-slot:append
                  v-if="isFull(all_data.passport.place_of_birth)"
                )
                  svg.q-pl-none(width="12" height="8")
                    use.q-pl-none(xlink:href="check-mark.svg#check-mark")
        q-item
          q-item-section
            q-item-label
              q-input(
                outlined
                bg-color="grey-2"
                v-model="all_data.passport.code_subdivision"
                label="Код подразделения*"
                color="red"
                mask="###-###"
              )
                template.q-pa-none(
                  v-slot:append
                  v-if="isFull(all_data.passport.code_subdivision)"
                )
                  svg.q-pl-none(width="12" height="8")
                    use.q-pl-none(xlink:href="check-mark.svg#check-mark")
        q-item
          q-item-section
            q-item-label
              q-input(
                outlined
                bg-color="grey-2"
                v-model="all_data.passport.name_of_passport_creator"
                label="Наименование органа где выдан*"
                color="red"
              )
                template.q-pa-none(
                  v-slot:append
                  v-if="isFull(all_data.passport.name_of_passport_creator)"
                )
                  svg.q-pl-none(width="12" height="8")
                    use.q-pl-none(xlink:href="check-mark.svg#check-mark")
        q-item
          q-item-section
            q-item-label
              q-input(
                outlined
                bg-color="grey-2"
                v-model="all_data.passport.place_of_live"
                label="Место жительства*"
                color="red"
              )
                template.q-pa-none(
                  v-slot:append
                  v-if="isFull(all_data.passport.place_of_live)"
                )
                  svg.q-pl-none(width="12" height="8")
                    use.q-pl-none(xlink:href="check-mark.svg#check-mark")
</template>
<script>
// import croppa from 'vue-croppa'
import _ from 'lodash'
export default {
  // components: {
  //   croppa
  // },
  name: 'EditPage',
  props: {
    all_data: {
      type: Object,
      required: false
    },
    photo: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      calendarDateOfBirthVisibility: false,
      calendarDateOfIssueVisibility: false,

      image: null,
      styleCroppa: {
        height: 10,
        width: 10
      },
      stylePan: {
        height: 100
      },
      splitterModel: 50
    }
  },
  // computed: {
  //   someStyle: function () {
  //     console.log(this.$refs.pageIngo?.style)
  //     if (this.$refs.pageIngo) {
  //       // handler: function(val, oldVal) {
  //       let height = this.$refs.pageIngo ? this.$refs.pageIngo.style.minHeight : 0

  //       height = height.substring(height.length - 2, -2)
  //       height = Number(height)
  //       // console.log(margin, height)

  //       // height = height - margin

  //       // this.someStyle.height = `${height}px`
  //       return {
  //         height: `${height}px`
  //       }
  //     }
  //     return {
  //       height: '100px'
  //     }
  //     // return this.$refs.resizedContent ? this.$refs.resizedContent.clientHeight : 0
  //   }
  // },
  computed: {
    projectsFilter () {
      if (this.filter === 'all') return this.projects
      return _.filter(this.projects, (el) => el.project === this.filter)
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.styleContent)
    })
    // this.$axios.toDataURL(this.photo, (data) => {
    //   console.log(data, 'asd')
    //   this.image = data
    // })
    // console.log(data)
    this.image = this.photo
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.styleContent)
    // console.log('beforeDestroy')
  },
  watch: {
    image: {
      immediate: true,
      handler: function (newVal, oldVal) {
        this.styleContent()
      }
    },
    stylePan: {
      immediate: true,
      deep: true,
      handler: function (newVal, oldVal) {
        this.styleContent()
      }
    }
  },
  // watch: {
  //   morphGroupModel () {
  //     // const margin = this.$refs.resizedContent ? this.$refs.resizedContent.clientHeight : 0
  //     let height = this.$refs.pageIngo ? this.$refs.pageIngo.style.minHeight : 0

  //     height = height.substring(height.length - 2, -2)
  //     height = Number(height)
  //     // console.log(margin, height)

  //     // height = height - margin

  //     this.someStyle.height = `${height}px`
  //     // this.someStyle.marginTop = `${margin}px`
  //   }
  // },
  methods: {
    fixScrollIos () {
    },
    handlePan ({ evt, ...info }) {
      let height = this.stylePan.height - Math.floor(info.delta.y)
      if (height < 100) {
        height = 100
      } else if (height > 300) {
        height = 300
      }
      this.$set(this.stylePan, 'height', height)
      // console.log(this.stylePan)
      // console.log(info)
    },
    styleContent () {
      const height = window ? window.innerHeight : 0
      const width = window ? window.innerWidth : 0

      // height = height.substring(height.length - 2, -2)
      // height = Number(height)
      // Required to push handling of this to end of queue stack
      // Otherwise you will get the height before text replacement
      // setTimeout(() => {
      //   this.styleFrame.height = `${height}px`
      // }, 0)

      setTimeout(() => {
        // const boxheight = this.$refs.styleBox ? this.$refs.styleBox.clientHeight : '0px'
        // const boxwidth = this.$refs.styleBox ? this.$refs.styleBox.clientWidth : '0px'

        this.styleCroppa.height = height
        this.styleCroppa.width = width
      }, 0)
    },
    isFull (input) {
      if (input === null || input === '') {
        return false
      }
      return true
    }
    // morphContent1 () {
    //   this.morphGroupModel = boxValues[this.morphGroupModel]
    // }
  }
}
</script>
<style scoped lang="scss">
  // .transitionContent {
    // transition: all 3ms ease;
    // position: absolute;
    // overflow-y: scroll;
    // top: 0px;
    // width: 100%;
  // }
  .img-blank {

    padding: 0;
    min-height: 0;

    // top:0px !important;
    // left: 0px !important;
    // height: 90px;
    // border-radius: 5px;
  }
  .block-sticky {
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: #fff;
  }
</style>
