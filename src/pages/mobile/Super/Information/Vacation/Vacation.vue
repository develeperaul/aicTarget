<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Информирование"
            to="/home/merchant/information"
          )
          header-avatar
            q-list
              q-item(clickable)
                q-item-section(no-wrap)
                  router-link(tag="span",to="#")
                    | Первая кнопка
              q-item(clickable)
                q-item-section(no-wrap)
                  router-link(tag="span",to="")
                    | Вторая кнопка
    q-item
      q-item-section
        q-item-label
          .text-h4.text-weight-bolder.q-mb-md
            | Отпуск
    q-list.q-px-md(separator)
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="/home/merchant/information/vacation/payments")
              | Получить информацию по периодам ежегодного отпуска, а также по начисленным отпускным
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="")
              | Бланк на ежегодный отпуск
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="")
              | Бланк на перенос ежегодного отпуска
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="")
              | Бланк на административный отпуск
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="/home/merchant/information/vacation/annual")
              | Внести плановые даты ежегодного отпуска
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-separator
    q-item
      q-item-section
        q-item-label
          .q-pt-lg.text-grey Фото заполненных бланков:
    q-item
      q-item-section
        q-item-label.q-pt-sm.row.items-center.justify-evenly.no-wrap
          q-btn.q-px-xl.shadow-7(
            padding="md lg"
          )
            svg(width="22" height="22")
              use(xlink:href="clip.svg#clip")
          q-btn.q-px-xl.q-ml-sm.shadow-7(
            padding="md lg"
          )
            svg(width="24" height="22")
              use(xlink:href="camera.svg#camera")
</template>
<script>

export default {
  data: () => ({
  }),
  methods: {
  },
  mounted () {
  }
}
</script>
