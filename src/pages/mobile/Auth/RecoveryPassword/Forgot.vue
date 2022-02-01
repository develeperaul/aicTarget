<template lang="pug">
  q-page.wrapper
    q-item.q-pt-xl
      q-item-section
        q-item-label.text-center
          svg(width="136" height="42")
            use(xlink:href="acetarget.svg#logotype")
    q-item.q-mt-xl
      q-item-section
        q-item-label
          div.text-h4.text-weight-bolder.text-center Забыли пароль?
          div.text-h7.text-center.text-grey.q-mt-md
            div Введите Ваш E-mail и мы сгенерируем для
            div Вас новый пароль
    q-item.q-mt-md.q-mb-sm
      q-item-section
        q-item-label
          q-input(
            bg-color="grey-2"
            outlined
            v-model="email"
            label="Почта"
            color="red"
            type="email"
            :error="email_error != null"
            :error-message="email_error"
            @input="() => email_error = null"
          )
    q-item
      q-item-section
        q-item-label
          OriginalButton(
            color="red-2"
            @click="nextStep"
          ) Отправить
    q-item
      q-item-section
        q-item-label.text-center.text-body2
          .text-grey Я вспомнил пароль.
            router-link.q-ml-xs.text-blue.text-weight-550(
              tag="span",
              to="/auth"
            ) Вернуться к авторизации
    q-item.bottom.q-pb-lg
      q-item-section
        q-item-label.text-center.font-size-15
          .text-grey Еще нет аккаунта?
            router-link.q-ml-xs.text-blue.text-weight-550(
              tag="span",
              to="/auth/register"
            ) Зарегистрируйтесь
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import _ from 'lodash'
import Api from 'modules/api'
const api = new Api('Auth')
export default {
  props: [
    'reg'
  ],
  components: { OriginalButton },
  data () {
    return {
      email: null,
      email_error: null
    }
  },
  methods: {
    nextStep (btn) {
      this.email_error = null
      api.call('forgotPassword', { email: this.email })
        .then(({ data }) => {
          this.$router.push('/auth/sent-password')
        })
        .catch((data) => {
          if (data.response) {
            const errors = data.response.data.errors

            _.each(errors, (messages, key) => {
              if (this.email_error !== undefined) {
                this.email_error = messages[0]
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
  .wrapper {
    display: flex;
    flex-direction: column;
  }
  .bottom {
    flex-grow: 1;
    align-items: flex-end;
    flex: 1;
  }
</style>
