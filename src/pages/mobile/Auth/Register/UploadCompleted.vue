<template lang="pug">
  q-page
    q-item.q-pt-xl
      q-item-section
        q-item-label.text-center
          svg(width="136" height="42")
            use(xlink:href="acetarget.svg#logotype")
    div.q-my-xl.q-py-xl
      q-item.q-mb-md
        q-item-section
          q-item-label
            div.text-h4.text-weight-bolder.text-center Все документы загружены
            div.q-mt-md.text-h7.text-center.text-grey
              div Информация по документам загружена
              div и передана ответственному лицу на
              div проверку. О результате проверки Вы
              div узнаете на стартовом экране приложения
      q-item
        q-item-section
          q-item-label
            OriginalButton(
              color="red-2"
              to="/auth/register/register-completed"
            ) Продолжить
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
export default {
  components: { OriginalButton },
  data () {
    return {
    }
  },
  mounted () {
    this.$q.localStorage.set('reg-step', 'upload')
  }
}
</script>
