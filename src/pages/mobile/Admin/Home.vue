<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          .text-h6.text-weight-bolder.text-left(class="morphable-title")
            div Добрый день,
            div {{ userInfo.firstname }}!
          header-settings
            q-list(style="width: 239px")
              q-item(clickable)
                q-item-section(no-wrap)
                  router-link.col.q-pt-sm(
                    tag="span"
                    :to="{ name: 'admin-info' }"
                  ) Изменить личные данные
              q-item.q-pl-sm(clickable)
                q-item-section.text-red-2
                  q-btn(
                    no-caps
                    align="left"
                    dense
                    @click="dialog.open = true"
                  )
                    .q-pl-xs Выйти
    q-list.q-px-md(separator)
      q-item.no-padding
        q-item-section
          q-item-label.q-py-lg.row.justify-between.items-center.no-wrap
            router-link(tag="span",to="/home/admin/documents/employment")
              | Проверить фото документов на трудоустройство
            q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label.q-py-lg.row.justify-between.items-center.no-wrap
            router-link(tag="span",to="/home/admin/documents/vacation")
              | Проверить фото документов на отпуск
            q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label.q-py-lg.row.justify-between.items-center.no-wrap
            router-link(tag="span",to="/home/admin/send-message")
              | Отправить сообщение мерчендайзеру
            q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label.q-py-lg.row.justify-between.items-center.no-wrap
            router-link(tag="span",to="/home/admin/monthly-messages")
              | Настроить ежемесячные сообщения мерчендайзерам
            q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label.q-py-lg.row.justify-between.items-center.no-wrap
            input(
              ref="uploadFile"
              type="file"
              accept=".xlsb, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              @change="() => fileSelect('doc')"
              hidden
            )
            span(@click="$refs.uploadFile.click()")
              //- router-link(tag="span",to="/home/admin/edit-paysheet")
                //- | Корректировать список полей для расчетного листка
              | Загрузить список бонусов
              //- q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label.q-py-lg.row.justify-between.items-center.no-wrap
            router-link(tag="span",to="/home/admin/tutorial")
              | Загрузить обучающие материалы для мерчендайзеров
            q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-separator
    q-dialog(
      content-class="q-dialog-padding-fixed"
      v-model="dialog.open"
      persistant
    )
      q-card.full-width
        q-card-section
          q-item.q-px-xs
            q-item-section
              q-item-label
                .text-h6.text-center.text-weight-bold.q-mt-md Выход
                .text-grey.q-my-md.text-center.text-body1 Вы действительно хотите выйти из учетной записи?
                OriginalButton.q-mt-sm.full-width(
                  @click="logOut()"
                ) Да, хочу выйти
                OriginalButton.q-mt-sm.full-width.text-red-2(
                  @click="dialog.open = false"
                ) Отмена
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import HeaderSettings from 'components/HeaderSettings'
import Api from 'modules/api'
const api = new Api('Admin')
export default {
  components: { OriginalButton, HeaderSettings },
  data: () => ({
    dialog: {
      open: false
    }
  }),
  methods: {
    logOut () {
      this.$q.localStorage.remove('token')
      this.$router.push('/auth')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
    fileDataURL (file) {
      return new Promise((resolve, reject) => {
        const fr = new FileReader()
        fr.onload = () => resolve(fr.result)
        fr.onerror = reject
        fr.readAsDataURL(file)
      })
    },
    async fileSelect (type, files, file) {
      // if (type === 'photo') {
      //   console.log(files, file)
      //   const image = await this.fileDataURL(this.$refs.uploadPhoto.files[0])

      //   this.images.push(image)
      // } else if (type === 'doc') {
      //   console.log(this.$refs.uploadFile.files[0])
      // const docName = this.$refs.uploadFile.files[0].name
      // const docData = await this.fileDataURL(this.$refs.uploadFile.files[0])

      const fd = new FormData()
      // fd.append('excel', docData)
      fd.append('excel', this.$refs.uploadFile.files[0])

      api.call('importBonusList', fd)
        .then(({ data }) => {
          console.log(data)
          this.$q.notify('Бонусы успешно загружены')
          // this.$router.push('/home/admin')
        })
        .catch(this.$axios.errorHandler)
      // this.docs.push({
      //   name: docName,
      //   data: docData
      // })
      // }
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters['user/info']
    }
  }
}
</script>
