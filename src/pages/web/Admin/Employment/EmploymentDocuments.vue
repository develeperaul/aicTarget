<template lang="pug">
  q-page
    .q-pb-lg.text-h4.text-weight-bolder
      | Документы на трудоустройство
    q-btn(
      label="test"
      @click="test"
    )
    .text-grey.q-pb-xs
      | Сотрудников: {{employees.length}}
    q-infinite-scroll(@load="onLoad" :offset="100")
      q-card.q-mb-sm(
        v-for="(employee, indexEmployee) in employees"
        :key="indexEmployee"
        flat
        bordered
      )
        q-card-section.row.q-pa-sm.items-center(
          style="height: 260px"
        )
          router-link.col.q-pl-lg(
            tag="span"
            :to="{ name: 'employment', params: {uuid: employee.uuid} }"
          )
            .text-grey.font-size-15 ФИО
            .q-pt-xs.text-weight-550.q-pb-md.font-size-22
              | {{employee.last_name}} {{employee.first_name}} {{employee.patronymic}}
            .text-grey.font-size-15 Год рождения
            .q-pt-xs.text-weight-550.q-pb-md.font-size-22
              | {{employee.birthday_at}}
            .text-grey.font-size-15 Название проекта
            .q-pt-xs.text-weight-550.font-size-22
             | {{employee.project_name}}
          q-scroll-area.rounded-borders(
            :thumb-style="thumbStyle"
            horizontal
            style="height: 240px; width: 65%;"
          )
            .row.no-wrap
              div(
                v-for="(image, indexPhoto) in photos_preview[indexEmployee]"
                :key="indexPhoto"
                style="width: 230px"
                :class="{'q-ml-md': indexPhoto > 0}"
              )
                .click-photo(
                  v-gallery
                  :data-large="image"
                )
                  .relative-position
                    q-img.img-blank(
                      :src="image"
                    )
                    q-badge.badge-custom(
                      rounded
                      color="primary"
                      :label="badges[indexPhoto]"
                    )
      template(v-slot:loading)
        .row.justify-center.q-my-md
          q-spinner(size="3em" color="red-2")
    q-footer.bg-white.footer-header.row.items-center(
      bordered
     )
      q-toolbar.max-width.q-px-xl
        q-toolbar-title
        .col-6
          .row.items-center.justify-end.text-no-wrap
            router-link(
              tag="span"
              to="/home/admin"
            )
              OriginalButton.text-black.q-px-lg(
              ) Назад
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import _ from 'lodash'
import Api from 'modules/api'
const api = new Api('Admin')

export default {
  components: { OriginalButton, InactiveButton },
  data () {
    return {
      employees: [],
      photos_preview: [],
      images: [
        'https://picsum.photos/400/300',
        'https://picsum.photos/200/300',
        'https://picsum.photos/300',
        'https://picsum.photos/300',
        'https://picsum.photos/200/300',
        'https://picsum.photos/400/300',
        'https://picsum.photos/200/300',
        'https://picsum.photos/300',
        'https://picsum.photos/300',
        'https://picsum.photos/200/300',
        'https://picsum.photos/400/300',
        'https://picsum.photos/200/300',
        'https://picsum.photos/300',
        'https://picsum.photos/300',
        'https://picsum.photos/200/300',
        'https://picsum.photos/400/300',
        'https://picsum.photos/200/300',
        'https://picsum.photos/300',
        'https://picsum.photos/300',
        'https://picsum.photos/200/300',
        'https://picsum.photos/400/300'
      ],
      thumbStyle: {
        bottom: '10px',
        borderRadius: '10px',
        backgroundColor: 'black',
        height: '8px',
        opacity: 0.5
      },
      badges: [
        'Паспорт',
        'СНИЛС',
        'ИНН',
        'Трудовая книжка',
        'Банковская карта',
        'Банковские реквизиты',
        'Медицинская книжка'
      ]
    }
  },
  mounted () {
    api.call('showNotVerifiedRegistrations')
      .then(({ data }) => {
        this.employees = data.data

        for (let i = 0; i < data.data.length; i++) {
          this.photos_preview.push([
            data.data[i].passport?.photos[0],
            data.data[i].snils?.photos[0],
            data.data[i].inn?.photos[0],
            data.data[i].work_card?.photos[0],
            data.data[i].bank_card?.photos[0],
            data.data[i].bank_account?.photos[0],
            data.data[i].medcard?.photos[0]
          ])
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
  methods: {
    test () {
      console.log(this.photos_preview)
    },
    numberOfEmployees () {
      return this.employees.length
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
}
</script>
<style scoped lang="scss">
  .border-radius-10 {
    border-radius: 10px
  }
  .footer-header {
    height: 100px;
  }
  .max-width {
    max-width: 1440px;
    margin: 0 auto;
  }
  .img-blank {
    width: 238px;
    height: 238px;
    border-radius: 10px;
  }
  .click-photo {
    width: 100%;
    height: 100%;
  }
  .badge-custom {
    position: absolute;
    // transform: translate(25%, -25%);
    left: 10px;
    top: 10px;
    // z-index: 1;
  }
</style>
