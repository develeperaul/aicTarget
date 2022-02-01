<template lang="pug">
  q-page.wrapper
    q-item.q-pt-xl
      q-item-section
        q-item-label.text-center
          svg(width="136" height="42")
            use(xlink:href="acetarget.svg#logotype")
    .q-my-xl.q-py-xl
      q-item.q-mb-md
        q-item-section
          q-item-label
            .text-h4.text-weight-bolder.text-center Пароль отправлен!
            .q-mt-md.text-center.text-grey
              div Проверьте Вашу почту, если ничего не
              div нашли, то смотрите папку “спам” или
              div попробуйте
                router-link.text-blue.q-ml-xs.text-weight-bold(
                  tag="span"
                  to="/auth/forgot-password"
                ) заново
      q-item
        q-item-section
          q-item-label
            OriginalButton(
              color="red-2"
              to="/auth"
            ) К авторизации
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
export default {
  components: { OriginalButton },
  data () {
    return {
    }
  },
  methods: {
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
