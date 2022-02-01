<template lang="pug">
  div
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
  name: 'admin-tutorial-2',
  components: { OriginalButton, InactiveButton },
  // props: {
  //   all_data: {
  //     type: Object,
  //     required: false
  //   }
  // },
  data: () => ({
    label: null,
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

      fd.append('label', this.label)

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
      const image = await Camera.getPhoto({
        source: CameraSource.Photos,
        quality: 90,
        resultType: CameraResultType.DataUrl
      })

      // console.log(image)
      this.images.push(image.dataUrl)
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
      // this.user_ids = []
      // for (let i = 0; i < this.employees.length; i++) {
      //   if (this.employees[i].selected) {
      //     this.user_ids.push(this.employees[i].id)
      //   }
      // }
      // this.$parent.$attrs.user_ids = this.user_ids
      // console.log(this.user_ids)
      console.log(this.$parent.user_ids)
    }
    // handleHold (evt, indexEmployer) {
    //   this.holdActive = true
    //   this.employees[indexEmployer].selected = true
    // },
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
}
</script>
<style scoped>
  .img-blank {
    width: 90px;
    height: 90px;
    border-radius: 10px;
  }
  .click-photo {
    width: 100%;
    height: 100%;
  }
  .button-remove {
    position: absolute;
    transform: translate(25%, -25%);
    top: -7px;
    right: 6px;
    z-index: 1;
  }
  .checkbox-border {
    border: 1px !important;
    border-radius: 5px !important;
  }
</style>
