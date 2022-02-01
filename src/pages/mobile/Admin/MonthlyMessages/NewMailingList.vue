<template lang="pug">
  div
    q-item
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="search"
            color="red"
            dense
            placeholder="Поиск"
            @input="filter"
          )
            template(v-slot:prepend)
              q-icon(name="mdi-magnify")
    q-item
      q-item-section
        q-item-label
          q-select(
            :options="projects"
            v-model="project"
            outlined
            color="red"
            label="Выбрать проект"
            behavior="menu"
            menu-anchor="bottom left"
            dense
            @input="filter"
          )
    q-item.q-pt-sm.q-pb-none
      q-item-section
        q-item-label
          .text-grey.font-size-13
            | Сотрудников: {{ employees.length }}
    q-item.q-pt-none
      q-item-section
        q-item-label
          .q-pt-xs.q-pb-md.row.q-col-gutter-sm.justify-between.items-center
            .col-6
              q-btn.q-pl-md.q-pr-sm.shadow-5.full-width(
                v-if="holdActive == true"
                no-caps
                padding="none"
                @click="cancelSelection()"
              )
                .row.justify-between.full-width.items-center.no-wrap
                  .font-size-13.text-grey-5.div-no-wrap
                    span.text-no-wrap Отменить выбор
                  q-icon(name="mdi-window-close" color="red-2" size="15px")
              q-btn.q-pl-md.q-pr-sm.shadow-5.full-width(
                v-else
                no-caps
                padding="none"
                disable
              )
                .row.justify-between.full-width.items-center.no-wrap
                  .font-size-13.text-grey-5.div-no-wrap
                    span.text-no-wrap Отменить выбор
                  q-icon(name="mdi-window-close" color="red-2" size="15px")
            div
              q-checkbox.font-size-13.checkbox-border(
                v-model="selectAll"
                label="Выбрать всех"
              )
          .row.justify-between.no-wrap
            q-btn.font-size-15.text-no-wrap(
              :label="employeesListShown ? 'Свернуть список' : 'Развернуть список'"
              @click="employeesListShown = !employeesListShown"
              no-caps
              flat
              :ripple="false"
              dense
            )
              q-icon(v-if="employeesListShown" name="mdi-chevron-up" size="22px")
              q-icon(v-else name="mdi-chevron-down" size="22px")
            q-btn.font-size-15.text-no-wrap(
              :label="onlySelectedShown ? 'Показать всех' : 'Показать выбранных'"
              @click="showSelected"
              no-caps
              flat
              :ripple="false"
              dense
            )
          q-slide-transition
            q-item-label(
              v-if="employeesListShown"
              transition-show="slide-down"
              transition-hide="slide-up"
            )
              .q-content-spinner(v-if="isLoading")
                q-spinner-puff(
                  color="red"
                  size="3em"
                )
              div(v-else)
                q-card.q-mb-sm(
                  v-for="(employee, index) in employees"
                  :key="index"
                  flat
                  bordered
                  style="font-size: 17px"
                  :class="{'q-card-selection': employee.selected}"
                )
                  q-card-section.col(
                    v-if="holdActive == true"
                    @click="selectEmployee(index, employee.id)"
                  )
                    .row.no-wrap.justify-between.items-start
                      .q-pt-xs.text-weight-550.q-pb-md.text-no-wrap
                        | {{employee.first_name}} {{employee.last_name}} {{employee.patronymic}}
                      q-checkbox.font-size-13.checkbox-border.checkbox-size(
                        :value="employee.selected"
                        @input="selectEmployee(index, employee.id)"
                      )
                    .q-py-sm.row
                      .q-pr-xs Дата рождения:
                      .text-grey {{employee.birthday_at}}
                    .q-py-sm.row
                      .q-pr-xs Проект:
                      .text-grey {{employee.project_name}}
                  q-card-section.col(
                    v-else
                    :class="{'q-card-selection': employee.selected}"
                    v-touch-hold:600.mouse="(evt) => handleHold(evt, index, employee.id)"
                  )
                    .q-pt-xs.text-weight-550.q-pb-md.text-no-wrap
                      | {{employee.first_name}} {{employee.last_name}} {{employee.patronymic}}
                    .q-py-sm.row
                      .q-pr-xs Дата рождения:
                      .text-grey {{employee.birthday_at}}
                    .q-py-sm.row
                      .q-pr-xs Проект:
                      .text-grey {{employee.project_name}}
                .column.items-center
                  q-pagination(
                    v-if="current_search === 'all'"
                    v-model="current_page_all"
                    color="primary"
                    :max="last_page_all"
                    :max-pages="4"
                    :ellipses="false"
                    :boundary-numbers="false"
                    @input="showEmployees"
                  )
                  q-pagination(
                    v-else-if="current_search === 'fio'"
                    v-model="current_page_fio"
                    color="primary"
                    :max="last_page_fio"
                    :max-pages="4"
                    :ellipses="false"
                    :boundary-numbers="false"
                    @input="filterByFio"
                  )
                  q-pagination(
                    v-else-if="current_search === 'project'"
                    v-model="current_page_project"
                    color="primary"
                    :max="last_page_project"
                    :max-pages="4"
                    :ellipses="false"
                    :boundary-numbers="false"
                    @input="filterByProject"
                  )
                  q-pagination(
                    v-else-if="current_search === 'fio_project'"
                    v-model="current_page_fio_project"
                    color="primary"
                    :max="last_page_fio_project"
                    :max-pages="4"
                    :ellipses="false"
                    :boundary-numbers="false"
                    @input="filter"
                  )
                  q-pagination(
                    v-else="current_search === 'selected'"
                    v-model="current_page_selected"
                    color="primary"
                    :max="last_page_selected"
                    :max-pages="4"
                    :ellipses="false"
                    :boundary-numbers="false"
                    @input="showSelectedEmployees"
                  )
          //- template(v-slot:loading)
          //-   .row.justify-center.q-py-md
          //-     q-spinner(size="3em" color="red-2")
    q-item
      q-item-section
        q-item-label
          q-input(
            v-model="inputs.title"
            outlined
            label="Заголовок"
            bg-color="grey-2"
            color="red"
            dense
          )
    q-item
      q-item-section
        q-item-label
          q-input(
            v-model="inputs.message"
            type="textarea"
            outlined
            label="Сообщение"
            bg-color="grey-2"
            color="red"
            autogrow
          )
    q-item
      q-item-section
        q-item-label
          input(
            ref="uploadFile"
            type="file"
            accept=".doc, .docx, application/msword, application/vnd.ms-excel, .xls, .xlsx, application/pdf, application/vnd.ms-powerpoint, .ppt, .pptx, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            @change="() => fileSelect('doc')"
            hidden
          )
          input(
            v-if="mode == 'spa'"
            ref="uploadPhoto"
            type="file"
            accept="image/*"
            @change="() => fileSelect('photo')"
            hidden
          )
          .q-pt-sm.row.q-col-gutter-sm.justify-between
            .col-6
              q-btn.shadow-7.full-width(
                padding="md lg"
                @click="downloadDialog.open = true"
              )
                svg(width="22" height="22")
                  use(xlink:href="clip.svg#clip")
            .col-6
              q-btn.col-6.shadow-7.full-width(
                @click="mode == 'spa' ? $refs.uploadPhoto.click() : photoCamera()"
                padding="md lg"
              )
                svg(width="24" height="22")
                  use(xlink:href="camera.svg#camera")
    q-dialog(
      content-class="q-dialog-padding-fixed"
      v-model="downloadDialog.open"
    )
      q-card.full-width
        q-card-section
          q-item.q-px-xs
            q-item-section
              q-item-label
                .text-h6.text-center.text-weight-bold.q-pt-md Вложение
                .text-grey.q-my-md.text-center.text-body1 Выберите способ вложения
                q-btn.q-my-sm.full-width(
                  @click="$refs.uploadFile.click()"
                  no-caps
                  outline
                ) Вложить документ
                q-btn.q-my-sm.full-width(
                  @click="mode == 'spa' ? $refs.uploadPhoto.click() : photoSelect()"
                  no-caps
                  outline
                ) Вложить изображение
                q-btn.q-my-sm.full-width(
                  @click="downloadDialog.open = false; youtubeDialog.open = true"
                  no-caps
                  outline
                ) Добавить ссылку на YouTube
                OriginalButton.q-mt-sm.full-width(
                  color="red-2"
                  @click="downloadDialog.open = false"
                ) Закрыть
    q-dialog(
      content-class="q-dialog-padding-fixed"
      v-model="youtubeDialog.open"
    )
      q-card.full-width.height-dialog
        q-card-section
          q-item.q-px-xs
            q-item-section
              q-item-label
                .text-h6.text-center.text-weight-bold.q-pt-md YouTube
                .text-grey.q-my-md.text-center.text-body1 Прикрепите ссылку на видеоролик в YouTube
                q-input.q-py-sm(
                  v-model="videoUrl"
                  type="textarea"
                  outlined
                  label="Ссылка на YouTube"
                  bg-color="grey-2"
                  color="red"
                  autogrow
                  @input="showPreview"
                )
                q-video.img-blank(
                  v-if="convertedUrl != null || convertedUrl != undefined"
                  :src="convertedUrl"
                  :ratio="16/9"
                )
                //- https://www.youtube.com/watch?v=dQw4w9WgXcQ
                OriginalButton.q-mt-lg.q-mb-xs(
                  v-if="videoUrl"
                  color="red-2"
                  @click="addLink"
                ) Прикрепить
                InactiveButton.q-mt-lg.q-mb-xs(
                  v-else
                ) Прикрепить
                OriginalButton.q-mt-sm.full-width(
                  color="red-2"
                  @click="youtubeDialog.open = false; downloadDialog.open = true"
                ) Закрыть
    q-item(v-if="docs.length != 0")
      q-item-section
        q-item-label
          .q-pt-xs.row.q-col-gutter-sm.justify-between
            .col-6(
              v-for="(doc, index) in docs"
              :key="index"
            )
              q-btn.q-pl-md.q-pr-sm.shadow-5.full-width(
                no-caps
                padding="none"
              )
                .row.justify-between.full-width.items-center.no-wrap
                  .q-pr-sm.font-size-13.text-grey-5.ellipsis {{ doc.name }}
                  div(
                    @click="onRemoveDoc(index)"
                    style="width: 29px"
                  )
                    q-icon(name="mdi-window-close" color="red-2" size="15px")
    q-item(v-if="videos.length != 0")
      q-item-section
        q-item-label
          .q-pt-xs.row.q-col-gutter-sm
            .col-12(
              v-for="(video, index) in videos"
              :key="index"
            )
              q-btn.q-pl-md.q-pr-sm.full-width(
                color="grey-1"
                outline
                no-caps
                padding="none"
              )
                .row.justify-between.full-width.items-center.no-wrap
                  .font-size-13.text-blue.ellipsis {{ video }}
                  div(
                    @click="removeVideo(index)"
                    style="width: 29px"
                  )
                    q-icon(name="mdi-window-close" color="red-2" size="15px")
    q-item(v-if="images.length != 0")
      q-item-section
        q-item-label
          .q-pt-xs.row.q-col-gutter-sm.justify-start
            .col-4(
              v-for="(image, index) in images"
              :key="index"
            )
              .relative-position
                .click-photo(
                  v-gallery
                  :data-large="image"
                )
                  q-img.img-blank(
                    :src="image"
                  )
                q-btn.bg-grey-4.button-remove(
                  size="sm"
                  flat
                  round
                  color="grey-5"
                  icon="mdi-window-close"
                  @click="onRemoveImg(index)"
                )
    q-item.q-pt-lg
      q-item-section
        q-item-label
          OriginalButton(
            @click="openSelectionDaysDialog"
          ) Выбрать дату рассылки
    q-item
      q-item-section
        q-item-label
          OriginalButton(
            v-if="everythingIsFull()"
            color="red-2"
            @click="sendMessage"
          ) Назначить
          InactiveButton(
            v-else
          ) Назначить
    q-dialog(
      position="bottom"
      v-model="selectionDaysDialog.open"
    )
      q-swipe-to-close(v-model="selectionDaysDialog.open")
        q-card.no-border-radius
          q-card-section.q-py-sm.q-px-none.bg-grey-3
            q-item
              q-item-section
                q-item-label
                  | Выбор дня рассылки
              q-item-section(side)
                q-btn.bg-grey-4(
                  size="sm"
                  flat
                  round
                  color="grey-5"
                  icon="mdi-window-close"
                  @click="selectionDaysDialog.open = false"
                )
          q-card-section.q-px-none.q-pt-md
            q-item
              q-item-section
                q-item-label
                  | Выберите числа, в эти дни каждый месяц сообщение будет отправляться сотрудникам автоматически
            q-item
              q-item-section
                q-item-label.font-size-13.text-grey-5
                  | (Если месяц не содержит дат: 29,30,31, то сообщение отправится последним днем месяца)
            q-item
              q-item-section
                q-item-label
                  .q-pt-xs.row.q-col-gutter-sm.justify-between
                    .col-2(
                      v-for="(day, index) in selectionDaysDialog.prepared_days"
                      :key="index"
                    )
                      q-btn.full-width.text-weight-regular(
                        :class="day.selected ? 'bg-grey-2' : 'shadow-2'"
                        @click="toSelectDay(index)"
                      ) {{day.value}}
            q-item
              q-item-section
                q-item-label
                  OriginalButton(
                    v-if="daysSelected()"
                    color="red-2"
                    @click="toAccept"
                  ) Принять
                  InactiveButton(
                    v-else
                  ) Принять
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import _ from 'lodash'
import Api from 'modules/api'
const api = new Api('Admin')

// eslint-disable-next-line no-unused-vars
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core'
const { Camera } = Plugins
// eslint-disable-next-line no-unused-vars
const { Filesystem } = Plugins
import getVideoId from 'get-video-id'
export default {
  name: 'monthly-new-mailing-list',
  components: { OriginalButton, InactiveButton },

  data: () => ({
    isLoading: false,
    onlySelectedShown: false,
    selected_employees_ids: [],
    inputs: {
      label: 'default',
      title: null,
      message: null
    },
    errors: {
      label: 'default',
      title: null,
      message: null
    },
    employeesListShown: true,
    holdActive: false,
    search: null,
    selectAll: false,
    project: null,
    projects: [
      {
        label: 'Все',
        value: 'all'
      }
    ],
    listOfProjectsVisibility: false,
    employees: [],
    docs: [],
    images: [],
    downloadDialog: {
      open: false
    },
    youtubeDialog: {
      open: false
    },
    videoUrl: null,
    convertedUrl: null,
    videos: [],
    selectionDaysDialog: {
      open: false,
      days: [],
      prepared_days: []
    },

    current_search: 'all',
    current_page_all: 1,
    last_page_all: 1,
    current_page_fio: 1,
    last_page_fio: 1,
    current_page_project: 1,
    last_page_project: 1,
    current_page_fio_project: 1,
    last_page_fio_project: 1,
    current_page_selected: 1,
    last_page_selected: 1
  }),

  mounted () {
    this.showEmployees()

    api.call('projectList')
      .then(({ data }) => {
        _.each(data, (proj) => {
          this.projects.push({
            label: proj.name,
            value: proj.id
          })
        })
      })
    for (let i = 1; i <= 31; i++) {
      this.selectionDaysDialog.days.push({
        value: i,
        selected: false
      })
    }
    this.selectionDaysDialog.prepared_days = this.selectionDaysDialog.days.map(a => ({ ...a }))
  },

  computed: {
    mode () {
      return process.env.MODE
    }
  },

  methods: {
    filter () {
      if (this.search && this.project && this.project?.value !== 'all') {
        this.current_search = 'fio_project'
        this.showEmployeesByFioProject()
      } else if (this.search && (!this.project || this.project?.value === 'all')) {
        this.filterByFio()
      } else if (this.project && this.project?.value !== 'all' && !this.search) {
        this.filterByProject()
      } else {
        this.showEmployees()
      }
    },
    showEmployeesByFioProject () {
      if (this.search) {
        if (this.selected_employees_ids.length > 0) {
          this.holdActive = true
        }
        const fd = new FormData()
        fd.append('fio', this.search)
        fd.append('project_id', this.project.value)
        fd.append('page', this.current_page_fio_project)

        api.call('showEmployeesByFioAndProject', fd)
          .then(({ data }) => {
            this.employees = []
            this.current_page_fio_project = data.meta.current_page
            this.last_page_fio_project = data.meta.last_page
            for (let i = 0; i < data.data.length; i++) {
              this.employees.push({
                id: data.data[i].id,
                last_name: data.data[i].passport.last_name,
                first_name: data.data[i].passport.first_name,
                patronymic: data.data[i].passport.patronymic,
                birthday_at: data.data[i].passport.birthday_at,
                project_id: data.data[i].project_id,
                project_name: data.data[i].project_name,
                // eslint-disable-next-line
                selected: this.selected_employees_ids.includes(data.data[i].id) ? true : false
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
            console.log(this.employees)
          })
      } else {
        this.showEmployees()
      }
    },
    showSelected () {
      this.onlySelectedShown = !this.onlySelectedShown
      if (this.onlySelectedShown) {
        this.showSelectedEmployees()
      } else {
        this.filter()
      }
    },
    selectEmployee (index, employeeId) {
      this.employees[index].selected = !this.employees[index].selected
      if (!this.selected_employees_ids.includes(employeeId)) {
        this.selected_employees_ids.push(employeeId)
      } else {
        const removeId = this.selected_employees_ids.indexOf(employeeId)
        this.selected_employees_ids.splice(removeId, 1)
      }
    },
    showEmployees () {
      this.current_search = 'all'
      this.isLoading = true
      if (this.selected_employees_ids.length > 0) {
        this.holdActive = true
      }
      const fd = new FormData()
      fd.append('page', this.current_page_all)

      api.call('showEmployees', fd)
        .then(({ data }) => {
          this.employees = []
          this.current_page_all = data.meta.current_page
          this.last_page_all = data.meta.last_page

          for (let i = 0; i < data.data.length; i++) {
            this.employees.push({
              id: data.data[i].id,
              last_name: data.data[i].passport.last_name,
              first_name: data.data[i].passport.first_name,
              patronymic: data.data[i].passport.patronymic,
              birthday_at: data.data[i].passport.birthday_at,
              project_id: data.data[i].project_id,
              project_name: data.data[i].project_name,
              // eslint-disable-next-line
              selected: this.selected_employees_ids.includes(data.data[i].id) ? true : false
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
          this.isLoading = false
        })
    },
    showSelectedEmployees () {
      this.current_search = 'selected'
      this.isLoading = true
      if (this.selected_employees_ids.length > 0) {
        this.holdActive = true
      }
      const fd = new FormData()

      fd.append('page', this.current_page_selected)

      _.each(this.selected_employees_ids, (id) => {
        fd.append('selected_employees_ids[]', id)
      })

      api.call('showSelectedEmployees', fd)
        .then(({ data }) => {
          this.employees = []
          this.current_page_selected = data.meta.current_page
          this.last_page_selected = data.meta.last_page

          for (let i = 0; i < data.data.length; i++) {
            this.employees.push({
              id: data.data[i].id,
              last_name: data.data[i].passport.last_name,
              first_name: data.data[i].passport.first_name,
              patronymic: data.data[i].passport.patronymic,
              birthday_at: data.data[i].passport.birthday_at,
              project_id: data.data[i].project_id,
              project_name: data.data[i].project_name,
              // eslint-disable-next-line
              selected: this.selected_employees_ids.includes(data.data[i].id) ? true : false
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
          this.isLoading = false
        })
    },
    filterByFio () {
      this.current_search = 'fio'
      this.showEmployeesByFio()
    },
    showEmployeesByFio () {
      if (this.search) {
        if (this.selected_employees_ids.length > 0) {
          this.holdActive = true
        }
        const fd = new FormData()
        fd.append('fio', this.search)
        fd.append('page', this.current_page_fio)

        api.call('showEmployeesByFio', fd)
          .then(({ data }) => {
            this.employees = []
            this.current_page_fio = data.meta.current_page
            this.last_page_fio = data.meta.last_page

            for (let i = 0; i < data.data.length; i++) {
              this.employees.push({
                id: data.data[i].id,
                last_name: data.data[i].passport.last_name,
                first_name: data.data[i].passport.first_name,
                patronymic: data.data[i].passport.patronymic,
                birthday_at: data.data[i].passport.birthday_at,
                project_id: data.data[i].project_id,
                project_name: data.data[i].project_name,
                // eslint-disable-next-line
                selected: this.selected_employees_ids.includes(data.data[i].id) ? true : false
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
            console.log(this.employees)
          })
      } else {
        this.showEmployees()
      }
    },
    filterByProject () {
      if (this.project.value === 'all') {
        this.current_search = 'all'
        this.showEmployees()
      } else {
        this.current_search = 'project'
        this.showEmployeesByProject()
      }
    },
    showEmployeesByProject () {
      if (this.selected_employees_ids.length > 0) {
        this.holdActive = true
      }
      const fd = new FormData()
      fd.append('project_id', this.project.value)
      fd.append('page', this.current_page_project)

      api.call('showEmployeesByProject', fd)
        .then(({ data }) => {
          this.employees = []
          this.current_page_project = data.meta.current_page
          this.last_page_project = data.meta.last_page

          for (let i = 0; i < data.data.length; i++) {
            this.employees.push({
              id: data.data[i].id,
              last_name: data.data[i].passport.last_name,
              first_name: data.data[i].passport.first_name,
              patronymic: data.data[i].passport.patronymic,
              birthday_at: data.data[i].passport.birthday_at,
              project_id: data.data[i].project_id,
              project_name: data.data[i].project_name,
              // eslint-disable-next-line
              selected: this.selected_employees_ids.includes(data.data[i].id) ? true : false
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
          console.log(this.employees)
        })
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
      if (type === 'photo') {
        console.log(files, file)
        const image = await this.fileDataURL(this.$refs.uploadPhoto.files[0])

        this.images.push(image)
      } else if (type === 'doc') {
        console.log(this.$refs.uploadFile.files[0])
        const docName = this.$refs.uploadFile.files[0].name
        const docData = await this.fileDataURL(this.$refs.uploadFile.files[0])

        this.docs.push({
          name: docName,
          data: docData
        })
      }
    },
    async docSelect () {
      const doc = await Filesystem.readFile({
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8
      })

      this.docs.push(doc)
    },
    async photoSelect () {
      const image = await Camera.getPhoto({
        source: CameraSource.Photos,
        quality: 90,
        resultType: CameraResultType.DataUrl
      })

      this.images.push(image.dataUrl)
    },
    async photoCamera () {
      const image = await Camera.getPhoto({
        source: CameraSource.Camera,
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl
      })

      this.images.push(image.dataUrl)
    },
    showPreview () {
      const url = getVideoId(this.videoUrl)
      if (url.id) {
        if (url.service === 'youtube') {
          this.convertedUrl = `https://www.youtube.com/embed/${url.id}`
        }
      }
    },
    addLink () {
      this.videos.push(this.videoUrl)
      this.videoUrl = this.convertedUrl = null
      this.youtubeDialog.open = false
      this.downloadDialog.open = true
      console.log(this.videos)
    },
    showListOfProjects () {
      this.listOfProjectsVisibility = !this.listOfProjectsVisibility
    },
    everythingIsFull () {
      return this.daysSelected() & this.atLeastOneEmployeeSelected()
    },
    atLeastOneEmployeeSelected () {
      for (const employee in this.employees) {
        if (this.employees[employee].selected) {
          return true
        }
      }
    },
    handleHold (evt, indexEmployer, employeeId) {
      this.holdActive = true
      this.employees[indexEmployer].selected = true
      if (!this.selected_employees_ids.includes(employeeId)) {
        this.selected_employees_ids.push(employeeId)
      } else {
        const removeId = this.selected_employees_ids.indexOf(employeeId)
        this.selected_employees_ids.splice(removeId, 1)
      }
    },
    cancelSelection () {
      this.selectAll = false

      this.employees.forEach(elem => {
        elem.selected = false
      })

      this.$nextTick(() => {
        this.holdActive = false
      })
    },
    onRemoveDoc (index) {
      this.docs.splice(index, 1)
      this.$refs[`${index}-slade`].reset()
    },
    onRemoveImg (index) {
      this.images.splice(index, 1)
      this.$refs[`${index}-slade`].reset()
    },
    removeVideo (index) {
      this.videos.splice(index, 1)
      this.$refs[`${index}-slade`].reset()
    },
    toSelectDay (index) {
      this.selectionDaysDialog.prepared_days[index].selected = !this.selectionDaysDialog.prepared_days[index].selected
    },
    daysSelected () {
      for (const day in this.selectionDaysDialog.prepared_days) {
        if (this.selectionDaysDialog.prepared_days[day].selected) {
          return true
        }
      }
    },
    toAccept () {
      this.selectionDaysDialog.days = this.selectionDaysDialog.prepared_days.map(a => ({ ...a }))
      this.selectionDaysDialog.open = false
    },
    openSelectionDaysDialog (btn) {
      this.selectionDaysDialog.prepared_days = this.selectionDaysDialog.days.map(a => ({ ...a }))

      this.selectionDaysDialog.open = true
      btn.offLoad()
    },
    sendMessage (btn) {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })

      const fd = new FormData()

      _.each(this.selected_employees_ids, (id) => {
        fd.append('user_ids[]', id)
      })

      _.each(this.selectionDaysDialog.days, (day) => {
        if (day.selected) {
          fd.append('days[]', day.value)
        }
      })

      _.each(
        this.inputs,
        (val, key) => fd.append(key, val)
      )

      _.each(this.images, (val) => {
        if (val.startsWith('data:')) {
          fd.append('photos[]', this.$axios.dataURLtoBlob(val))
        } else {
          fd.append('photos[]', val)
        }
      })

      _.each(this.docs, (val) => {
        if (val.data.startsWith('data:')) {
          fd.append('docs[]', this.$axios.dataURLtoBlob(val.data))
        } else {
          fd.append('docs[]', val.data)
        }
      })

      _.each(this.videos, (val) => {
        fd.append('videos[]', val)
      })

      api.call('addMonthMessage', fd)
        .then(({ data }) => {
          this.$q.notify('Ежемесячное сообщение добавлено')
          this.$router.push('/home/admin')
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
    }
  },

  watch: {
    selectAll () {
      if (this.selectAll) {
        this.employees.forEach(elem => {
          elem.selected = this.selectAll
        })
        this.selected_employees_ids = []
        _.each(this.employees, (employee, key) => {
          this.selected_employees_ids.push(employee.id)
        })
      } else {
        this.employees.forEach(elem => {
          elem.selected = false
        })
        this.selected_employees_ids = []
      }

      if (!this.holdActive) {
        this.holdActive = true
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .border-radius-10 {
    border-radius: 10px;
  }
  .bottomButton {
    flex-grow: 1;
    align-items: flex-end;
    flex: 1;
  }
  .div-no-wrap {
    width: 80%;
    align-self: self-end;
    display: flex;
  }
  .text-no-wrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .img-blank {
    height: 110px;
    border-radius: 5px;
  }
  .click-photo {
    width: 100%;
    height: 100%;
  }
  .button-remove {
    position: absolute;
    transform: translate(25%, -25%);
    top: 0px;
    right: 0px;
    z-index: 1;
  }
  .checkbox-border {
    border: 1px !important;
    border-radius: 5px !important;
  }
  .checkbox-size {
    width: 30px;
    height: 20px;
  }
</style>
