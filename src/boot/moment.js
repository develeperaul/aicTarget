import moment from 'moment'
import Vue from 'vue'

// Vue.use({
//   install (Vue, options) {
//     Vue.prototype.$moment = moment
//   }
// })

const momentjs = {
  install (Vue, options) {
    Vue.prototype.$moment = moment
  }
}

Vue.use(momentjs)
