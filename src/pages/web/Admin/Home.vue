<template lang="pug">
  q-page
    .q-pb-lg.text-h4.text-weight-bolder
      | Главный экран
    .row.justify-center
      .col-6.q-pr-md
        q-select.q-pb-xl(
          :options="projects"
          v-model="project"
          outlined
          color="red"
          label="Выбрать проект"
          behavior="menu"
          menu-anchor="bottom left"
        )
        q-card.q-mb-md.shadow-7(
          style="font-size: 20px"
        )
          router-link.cursor-pointer.row.q-py-lg.q-px-lg.height-section.items-center(
            tag="span"
            to="/home/admin/documents/employment"
          )
            q-card-section.col
              div Проверить фото документов на трудоустройство
              .row.font-size-15
                .q-pr-xs.text-grey Текущее кол-во сотрудников на проверку:
                .text-red-2 123
            .col-auto.items-center
              q-icon(name="mdi-chevron-right" size="24px")
        q-card.q-mb-md.shadow-7(
          style="font-size: 20px"
        )
          router-link.cursor-pointer.row.q-py-lg.q-px-lg.height-section.items-center(
            tag="span"
            to="/home/admin/documents/vacation"
          )
            q-card-section.col
              div Проверить фото заявлений на отпуск
              .row.font-size-15
                .q-pr-xs.text-grey Текущее кол-во сотрудников на проверку:
                .text-red-2 123
            .col-auto.items-center.row
              q-icon(name="mdi-chevron-right" size="24px")
        q-card.q-mb-md.shadow-7(
          style="font-size: 20px"
        )
          router-link.cursor-pointer.row.q-py-lg.q-px-lg.height-section.items-center(
            tag="span"
            to="/home/admin/send-message"
          )
            q-card-section.col
              div Сообщение мерчендайзерам
            .col-auto.items-center.row
              q-icon(name="mdi-chevron-right" size="24px")
      .col-6.q-pl-md
        .row.q-pb-xl.no-wrap.justify-between
          q-input.full-width(
            bg-color="grey-2"
            v-model="project"
            outlined
            color="red"
            label="Введите название"
          )
          OriginalButton.q-ml-sm.shadow-0(
            style="width: 50%"
            color="red-2"
            @click="modal.open = false"
          ) Найти
        q-card.q-mb-md.shadow-7(
          style="font-size: 20px"
        )
          router-link.cursor-pointer.row.q-py-lg.q-px-lg.height-section.items-center(
            tag="span"
            to="/home/admin/edit-paysheet"
          )
            q-card-section.col
              div Корректировать список полей для расчетного листа
            .col-auto.items-center.row
              q-icon(name="mdi-chevron-right" size="24px")
        q-card.q-mb-md.shadow-7(
          style="font-size: 20px"
        )
          router-link.cursor-pointer.row.q-py-lg.q-px-lg.height-section.items-center(
            tag="span"
            to="/home/admin/tutorial"
          )
            q-card-section.col
              div Загрузить шаблоны заявлений на отпуск, обучающие материалы для мерчендайзеров
            .col-auto.items-center.row
              q-icon(name="mdi-chevron-right" size="24px")
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
export default {
  components: { OriginalButton },
  data: () => ({
    project: null,
    projects: [
      {
        label: 'Все',
        value: 'Все'
      },
      {
        label: 'Project 1',
        value: 'proj-1'
      },
      {
        label: 'Project 2',
        value: 'proj-2'
      },
      {
        label: 'Project 3',
        value: 'proj-3'
      },
      {
        label: 'Project 4',
        value: 'proj-4'
      },
      {
        label: 'Project 5',
        value: 'proj-5'
      }
    ],
    listOfProjectsVisibility: false
  }),
  methods: {
    showListOfProjects () {
      this.listOfProjectsVisibility = !this.listOfProjectsVisibility
    }
  }
}
</script>
<style lang="scss" scoped>
  .height-section {
    height: 150px;
  }
</style>
