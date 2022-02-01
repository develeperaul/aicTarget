import Vue from 'vue'
import HeaderLink from 'components/HeaderLink'
import HeaderAvatar from 'components/HeaderAvatar'
import HeaderSettings from 'components/HeaderSettings'
import HeaderSettingsWeb from 'components/HeaderSettingsWeb'

const calendarLocale = {
  days: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split('_'),
  daysShort: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
  months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
  monthsShort: 'Янв_Фев_Март_Апр_Май_Июнь_Июль_Авг_Сен_Окт_Нов_Дек'.split('_'),
  firstDayOfWeek: 1
}

const helpers = {
  install (Vue, options) {
    Vue.prototype.$utils = {
      calendarLocale
    }
  }
}
Vue.component('header-link', HeaderLink)
Vue.component('header-avatar', HeaderAvatar)
Vue.component('header-settings', HeaderSettings)
Vue.component('header-settings-web', HeaderSettingsWeb)

Vue.use(helpers)
// export default {
//   calendarLocale
// }
