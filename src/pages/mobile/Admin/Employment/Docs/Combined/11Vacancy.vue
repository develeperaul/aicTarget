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
      :auto-sizing="true"
      :height="2000"
      initial-position="top left"
      initial-size="contain"
      :zoom-speed="7"
      placeholder=""
    )
    .block-sticky(
      :style="{ height: `${stylePan.height}px` }"
    )
      //- div.q-pa-md(style="flex: 1;align-items: center;display: flex;flex-direction: column;")
      //-   q-avatar(
      //-     style="position:absolute;top:-25px"
      //-     color="primary"
      //-     text-color="white"
      //-     size="50px"
      //-     icon="mdi-menu"
      //-     v-touch-pan.vertical.prevent.mouse="handlePan"
      //-   )
      //-   //- q-separator
      //-   //- div(style="flex: 1 1 0%;align-items: center;display: flex;flex-direction: row-reverse;")
      //-     div(style="flex: 1 1 0%;align-items: center;display: flex;flex-direction: column-reverse;")
      //- div(style="height: calc(100% - 32px); position:relative; overflow-y:scroll;  -webkit-overflow-scrolling: touch;")
      //-   div 11
</template>
<script>
// import croppa from 'vue-croppa'
import _ from 'lodash'
export default {
  name: 'admin-register-combined-11',
  props: {
    photo: {
      type: String,
      required: false
    },
    all_data: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      calendarDateOfBirthVisibility: false,
      calendarDateOfIssueVisibility: false,

      image: null,
      styleCroppa: {
        height: 0,
        width: 0
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
    this.image = this.photo
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.styleContent)
    console.log('beforeDestroy')
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
      console.log(this.stylePan)
      console.log(info)
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
