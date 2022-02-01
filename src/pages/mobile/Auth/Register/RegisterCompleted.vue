<template lang="pug">
  q-page
    q-item.q-pt-xl
      q-item-section
        q-item-label.text-center
          svg(width="136" height="42")
            use(xlink:href="acetarget.svg#logotype")
    q-item.q-mt-xl
      q-item-section
        q-item-label.text-center
          div.text-h4.text-weight-bolder Регистрация завершена!
          div.q-mt-md.text-center.text-grey
            div Логин и пароль для входа автоматически
            div сгенерированы и отправлены на
            div указанный Вами почтовый адрес
    q-item.q-mt-md
      q-item-section
        q-item-label
          q-input(
            readonly
            bg-color="grey-2"
            outlined
            v-model="login"
            label="Логин"
            color="red"
          )
    q-item
      q-item-section
        q-item-label
          q-input(
            readonly
            bg-color="grey-2"
            outlined
            label="Пароль"
            color="red"
            v-model="password"
          )
            template(v-slot:append)
              svg.q-mr-sm(
                width="18"
                height="22"
                @click="copyText(password)"
              )
                use(xlink:href="copy.svg#copy")
    q-item
      q-item-section
        q-item-label
          OriginalButton(
            color="red-2"
            to="/auth"
          ) Войти
    q-item
      q-item-section
        q-item-label.text-center
          router-link.q-ml-xs.text-blue.text-weight-550.text-body2(
            tag="span",
            to="/auth"
          ) Зарегистрироваться заново
</template>
<script>

import Api from 'modules/api'
const apiAuth = new Api('Auth')

import OriginalButton from 'components/OriginalButton.vue'
import { copyToClipboard } from 'quasar'
export default {
  components: { OriginalButton, copyToClipboard },
  data () {
    return {
      login: '',
      password: ''
    }
  },
  mounted () {
    const uuid = this.$q.localStorage.getItem('reg-uuid')
    apiAuth.call('registerFinal', { uuid: uuid })
      .then(({ data }) => {
        console.log(data)
        this.login = data.data.login
        this.password = data.data.password
        this.$q.localStorage.remove('reg-uuid')
        this.$q.localStorage.remove('reg-step')

        this.$q.localStorage.set('auth-login-temp', this.login)
        this.$q.localStorage.set('auth-password-temp', this.password)
      })
  },
  methods: {
    copyText (text) {
      copyToClipboard(text)
        .then(() => {
          this.$q.notify({
            message: 'Скопировано в буфер обмена',
            timeout: 1500,
            color: 'grey'
            // textColor: 'black'
          })
        })
        .catch(() => {
          // fail
        })
    }

  }
}
</script>
<style scoped lang="scss">
</style>
