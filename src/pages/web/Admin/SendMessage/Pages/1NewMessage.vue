<template lang="pug">
  div
    //- q-btn(
    //-   @click="test"
    //- ) test
    //- q-infinite-scroll(@load="onLoad" :offset="100")
    //- .row.justify-end
    //-   q-checkbox.checkbox-border.q-pr-lg(
    //-     v-model="selectAll"
    //-     label="Выбрать все"
    //-     left-label
    //-   )
    q-card.q-mb-sm(
      v-for="(employee, index) in employees"
      :key="index"
      flat
      bordered
    )
      q-card-section.row.q-pa-sm.items-center(
        @click="employee.selected = !employee.selected"
        style="height: 100px"
      )
        .col-10.row
          .col.q-pl-lg
            .text-grey Проект
            .q-pt-xs {{employee.project_name}}
          .col.q-pl-lg
            .text-grey Территория
            .q-pt-xs {{employee.territory}}
          .col.q-pl-lg
            .text-grey Фамилия
            .q-pt-xs {{employee.last_name}}
          .col.q-pl-lg
            .text-grey Имя
            .q-pt-xs {{employee.first_name}}
          .col.q-pl-lg
            .text-grey Отчество
            .q-pt-xs {{employee.patronymic}}
        .col-2.row
          .col.q-pl-lg.row.justify-end
            q-checkbox(
              v-model="employee.selected"
            ).q-pr-md
    q-footer.bg-white.footer-header.row.items-center(
      bordered
     )
      q-toolbar.max-width.q-px-xl
        .col-9.q-pr-md
          input(
            v-if="mode == 'spa'"
            ref="uploadFile"
            type="file"
            accept=".doc,.docx,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            @change="fileSelect"
            hidden
          )
          q-input(
            v-model="title"
            type="textarea"
            outlined
            label="Заголовок сообщения"
            bg-color="grey-2"
            color="red"
          )
          q-input(
            v-model="label"
            type="textarea"
            outlined
            label="Текст сообщения"
            bg-color="grey-2"
            color="red"
            input-style="height: 110px; max-height: 110px"
          )
          //- q-btn.text-black(
          //-   @click="mode == 'spa' ? $refs.uploadFile.click() : photoSelect"
          //-   no-caps
          //-   outline
          //-   dense
          //- ) Вложить документ
        .col-3.q-pl-md
          OriginalButton.full-width.text-black.q-mb-md(
            @click=""
          ) Настроить ежемесячную отправку
          OriginalButton.full-width(
            color="red-2"
            v-if="true"
            @click="sendMessage"
          ) Отправить сообщение
          InactiveButton(
            v-else
          ) Отправить сообщение
      //- template(v-slot:loading)
      //-   .row.justify-center.q-my-md
      //-     q-spinner(size="3em" color="red-2")
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import _ from 'lodash'
import Api from 'modules/api'
const api = new Api('Admin')
// eslint-disable-next-line no-unused-vars
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core'
// eslint-disable-next-line no-unused-vars
const { Camera } = Plugins

// eslint-disable-next-line no-unused-vars
const { Filesystem } = Plugins

// eslint-disable-next-line no-unused-vars
import getVideoId from 'get-video-id'
export default {
  name: 'admin-messages-1',
  components: { OriginalButton, InactiveButton },
  data: () => ({
    label: null,
    title: null,
    errors: {
      label: null
    },
    employees: [],
    user_ids: [],
    message: null,
    holdActive: false,
    selectAll: false,
    search: null
  }),
  beforeDestroy () {
    this.$root.$off('header-search')
    this.$root.$off('select-all')
  },
  mounted () {
    this.$root.$on('header-search', (val) => { this.search = val })
    this.$root.$on('select-all', (val) => { this.selectAll = val })
    api.call('showEmployees')
      .then(({ data }) => {
        data = data.data
        for (let i = 0; i < data.length; i++) {
          this.employees.push({
            id: i,
            last_name: data[i].last_name,
            first_name: data[i].first_name,
            patronymic: data[i].patronymic,
            project_name: data[i].project_name,
            territory: data[i].project_name,
            selected: false
          })
        }
      })
      .catch((data) => {
        console.log(data)
        if (data.response) {
          const errors = data.response.data.errors

          _.each(errors, (messages, key) => {
            console.log(key, this.errors[key])
            if (this.errors[key] !== undefined) {
              this.errors[key] = messages[0]
            }
          })
        }
      })
      .finally(() => {
        console.log('final')
      })
  },
  computed: {
    mode () {
      return process.env.MODE
    }
  },
  watch: {
    selectAll () {
      if (this.selectAll) {
        this.employees.forEach(elem => {
          elem.selected = true
        })
      } else {
        this.employees.forEach(elem => {
          elem.selected = false
        })
      }

      // if (!this.holdActive) {
      //   this.holdActive = true
      // }
    }
  },
  // computed: {
  //   user_ids () {
  //     for (let i = 0; i < this.employees.length; i++) {
  //       if (this.employees[i].selected) {
  //         this.user_ids.push(this.employees[i].id)
  //       }
  //     }
  //     return this.user_ids
  //   }
  // },
  methods: {
    // async fileSelect (type, files, file) {
    //   if (type === 'photo') {
    //     console.log(files, file)
    //     const image = await this.fileDataURL(this.$refs.uploadPhoto.files[0])

    //     this.images.push(image)
    //   } else if (type === 'doc') {
    //     console.log(this.$refs.uploadFile.files[0])
    //     const docName = this.$refs.uploadFile.files[0].name
    //     const docData = await this.fileDataURL(this.$refs.uploadFile.files[0])

    //     this.docs.push({
    //       name: docName,
    //       data: docData
    //     })
    //   }
    // },
    sendMessage (btn) {
      // console.log(btn)
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })

      const fd = new FormData()

      for (let i = 0; i < this.employees.length; i++) {
        if (this.employees[i].selected) {
          fd.append('user_ids[]', this.employees[i].id)
        }
      }
      fd.append('title', this.title)
      fd.append('message', this.label)

      _.each(this.images, (val) => {
        if (val.startsWith('data:')) {
          fd.append('photos[]', this.$axios.dataURLtoBlob(val))
        } else {
          fd.append('photos[]', val)
        }
      })

      _.each(this.docs, (val) => {
        fd.append('docs[]', val)
      })

      _.each(this.videos, (val) => {
        fd.append('videos[]', val)
      })

      api.call('sendMessage', fd)
        .then(({ data }) => {
          console.log(fd)
        })
        .catch((data) => {
          console.log(data)
          if (data.response) {
            const errors = data.response.data.errors

            _.each(errors, (messages, key) => {
              console.log(key, this.errors[key])
              if (this.errors[key] !== undefined) {
                this.errors[key] = messages[0]
              }
            })
          }
        })
        .finally(() => {
          btn.offLoad()
        })
    },
    async fileSelect (files, file) {
      console.log(files, file)
      const image = await this.fileDataURL(this.$refs.uploadFile.files[0])

      this.images.push(image)
    },
    async photoSelect () {
      navigator.camera.getPicture(
        data => { // on success
          console.log(data)
          this.images.push(`data:image/jpeg;base64,${data}`)
          console.log(this.images)
        },
        () => { // on fail
          this.$q.notify('Could not access device camera.')
        },
        {
          sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
          destinationType: navigator.camera.DestinationType.DATA_URL
        }
      )
    },
    // async docSelect () {
    //   const doc = await Filesystem.readFile({
    //     directory: FilesystemDirectory.Documents,
    //     encoding: FilesystemEncoding.UTF8
    //   })

    //   // console.log(image)
    //   // this.images.push(image.dataUrl)
    //   // console.log(doc)
    //   this.docs.push(doc)
    // },
    test () {
      console.log(this.$parent.user_ids)
    },
    onLoad (index, done) {
    // setTimeout(() => {
    //   if (this.employees) {
    //     this.employees.push({
    //       fullName: 'Самсонов Гурий Андреевич',
    //       dateOfBirth: '20.12.1980',
    //       proj: 'Проект 4'
    //     },
    //     {
    //       fullName: 'Веселов Владимир Ефимович',
    //       dateOfBirth: '16.03.1995',
    //       proj: 'Проект 5'
    //     },
    //     {
    //       fullName: 'Герасимов Рудольф Лукьевич',
    //       dateOfBirth: '20.12.1997',
    //       proj: 'Проект 6'
    //     })
    //     done()
    //   }
    // }, 1000)
    }
    // handleHold (evt, indexEmployer) {
    //   this.holdActive = true
    //   this.employees[indexEmployer].selected = true
    // },
  }

}
</script>
<style scoped>
  .footer-header {
    height: 177px;
  }
  .checkbox-border {
    border: 1px !important;
    border-radius: 5px !important;
  }
</style>
