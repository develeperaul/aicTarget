<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.text-right
          router-link.q-ml-sm.text-blue.text-weight-550.font-size-15(tag="span",to="/auth") Выйти
    q-item
      q-item-section
        q-item-label
          div.text-h4.text-weight-bolder.text-left
            | Работа с приложением
          div.text-body1.text-left.text-grey.q-my-md
            div Пожалуйста, предоставьте информацию для трудоустройства.
            div Внесите данные из документов и сделайте фото документов.
            div Способы сделать фото:
    q-item
      q-item-section
        q-item-label
          div.text-body1.text-left.q-my-md
            div.row.items-center
              span
                span.vertical-middle 01. Нажав на
                span.vertical-middle
                    svg.q-mx-sm(width="40" height="40")
                      use(xlink:href="clip-bg-grey.svg#clip-bg-grey")
                span.vertical-middle загрузить фото из памяти телефона
            div.row.items-center
              span
                span.vertical-middle 02. Нажав на
                span.vertical-middle
                  svg.q-mx-sm(width="40" height="40")
                    use(xlink:href="camera-bg-grey.svg#camera-bg-grey")
                span.vertical-middle сделать фото
    q-item
      q-item-section
        q-item-label
          div.text-body1.text-left.text-grey.q-my-md
            div Пожалуйста, убедитесь, что фото документов читаемы. Спасибо!
            div После проверки информации, Вам придёт уведомление, а после
              | завершения стажировки станет доступен основной функционал приложения
    q-item
      q-item-section
        q-item-label
          OriginalButton.q-my-sm(
            color="red-2"
            @click="next()"
          ) Далее
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
export default {
  name: 'register-step-2',
  components: { OriginalButton },
  methods: {
    next () {
      this.$emit('next')
    }
  }
}
</script>
<style scoped lang="scss">
  .content-block {
    line-height: 30px !important;
  }
  .icon-text {
    margin: 5px;
    padding: 8px;
    background: #333;
  }
</style>
