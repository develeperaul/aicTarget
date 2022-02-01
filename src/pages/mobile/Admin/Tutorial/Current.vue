<template lang="pug">
  div
    q-item
      q-item-section
        q-item-label
          q-select(
            :options="projects"
            v-model="project"
            outlined
            color="red"
            label="Выберите проект"
            behavior="menu"
            menu-anchor="bottom left"
            dense
            @input="showTutorials"
          )
    q-item(v-if="project")
      q-item-section
        q-item-label
          q-select(
            :options="categories"
            v-model="category"
            outlined
            color="red"
            label="Выберите категорию"
            behavior="menu"
            menu-anchor="bottom left"
            dense
            @input="showTutorials"
          )
    div(
      v-for="(tutorial, key) in tutorials"
      :key="key"
    )
      q-banner.bg-grey-2.text-left(dense).q-px-md.q-my-md(
        transition-hide="slide-up"
      )
        .row.no-wrap.justify-between
          div(style="font-size: 17px") Обновлено {{ tutorial.updated_at }}
          q-btn(
            icon="mdi-pencil"
            dense
            size="sm"
            @click="editTutorial(tutorial)"
          )
      q-item(v-if="tutorial.convertedVideos.length")
        q-item-section
          q-item-label.text-weight-550
            | Видеоматериалы:
          .q-pt-md.row.q-col-gutter-sm.justify-start
            .col-4(
              v-for="(video, index) in tutorial.convertedVideos"
              :key="index"
            )
              q-video.img-blank(
                v-if="video != null || video != undefined"
                :src="video"
                :ratio="16/9"
              )
      q-item(v-if="tutorial.photos.length")
        q-item-section
          q-item-label.text-weight-550
            | Фотоматериалы:
          .q-pt-md.row.q-col-gutter-sm.justify-start
            .col-4(
              v-for="(image, indexPhoto) in tutorial.photos"
              :key="indexPhoto"
            )
              .relative-position
                .click-photo(
                  v-gallery
                  :data-large="image"
                )
                  q-img.img-blank(
                    :src="image"
                  )
      q-item(v-if="tutorial.docs.length")
        q-item-section
          q-item-label.text-weight-550
            | Документы:
          .q-pt-md.row.q-col-gutter-sm.justify-between
            .col-6(
              v-for="(doc, indexDoc) in tutorial.docs"
              :key="indexDoc"
            )
              q-btn.q-pl-md.q-pr-sm.shadow-5.full-width(
                no-caps
                padding="none"
                replace
                @click="downloadDoc(tutorial.id, indexDoc)"
              )
                .row.justify-between.full-width.items-center.no-wrap
                  .q-pr-sm.font-size-13.text-grey-5.ellipsis Документ №{{ indexDoc + 1 }}
      q-item(v-if="tutorial.links.length")
        q-item-section
          q-item-label.text-weight-550
            | Ссылки:
            .q-pt-xs.row.q-col-gutter-sm.justify-between
              .col-12(
                v-for="(link, indexLink) in tutorial.links"
                :key="indexLink"
              )
                q-btn.q-pl-md.q-pr-sm.full-width(
                  color="grey-1"
                  outline
                  no-caps
                  padding="none"
                )
                  .row.justify-between.full-width.items-center.no-wrap
                    .font-size-13.text-blue.ellipsis {{ link }}
      q-item(v-if="tutorial.description")
        q-item-section
          q-item-label
            q-input(
              v-model="tutorial.description"
              type="textarea"
              outlined
              label="Описание"
              bg-color="grey-2"
              color="red"
              autogrow
              readonly
            )
    q-item.q-pt-lg
      q-item-section
        q-item-label
          OriginalButton(
            color="red-2"
            @click="(btn) => testMethod(btn, 'arg-1')"
          ) Новые материалы
    q-dialog(
      position="bottom"
      v-model="modal.open"
    )
      q-swipe-to-close(v-model="modal.open")
        q-card.no-border-radius
          q-card-section.q-py-sm.q-px-none.bg-grey-3
            q-item
              q-item-section
                q-item-label
                  .text-weight-550 Добавить материалы
              q-item-section(side)
                q-btn.bg-grey-4(
                  size="sm"
                  flat
                  round
                  color="grey-5"
                  icon="mdi-window-close"
                  @click="modal.open = false"
                )
          q-card-section.q-px-none.q-pt-md
            q-item(v-if="new_convertedUrls.length")
              q-item-section
                q-item-label.text-weight-550
                  | Видеоматериалы:
                .q-pt-md.row.q-col-gutter-sm.justify-start
                  .col-4(
                    v-for="(video, index) in new_convertedUrls"
                    :key="index"
                  )
                    .relative-position
                      div
                        q-video.img-blank(
                          v-if="video != null || video != undefined"
                          :src="video"
                          :ratio="16/9"
                        )
                      q-btn.bg-grey-4.button-remove(
                        size="sm"
                        flat
                        round
                        color="grey-5"
                        icon="mdi-window-close"
                        @click="onRemoveVideo_new(index)"
                      )
            q-item(v-if="new_tutorial.images.length")
              q-item-section
                q-item-label.text-weight-550
                  | Фотоматериалы:
                .q-pt-md.row.q-col-gutter-sm.justify-start
                  .col-4(
                    v-for="(image, index) in new_tutorial.images"
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
            q-item(v-if="new_tutorial.docs.length")
              q-item-section
                q-item-label.text-weight-550
                  | Документы:
                .q-pt-md.row.q-col-gutter-sm.justify-between
                  .col-6(
                    v-for="(doc, index) in new_tutorial.docs"
                    :key="index"
                  )
                    q-btn.q-pl-md.q-pr-sm.shadow-5.full-width(
                      no-caps
                      padding="none"
                    )
                      .row.justify-between.full-width.items-center.no-wrap
                        .q-pr-sm.font-size-13.text-grey-5.ellipsis Документ №{{ index + 1 }}
                        div(
                          @click="onRemoveDoc(index)"
                          style="width: 29px"
                        )
                          q-icon(name="mdi-window-close" color="red-2" size="15px")
            q-item(v-if="new_tutorial.links.length")
              q-item-section
                q-item-label.text-weight-550
                  | Ссылки:
                  .q-pt-xs.row.q-col-gutter-sm.justify-between
                    .col-12(
                      v-for="(link, index) in new_tutorial.links"
                      :key="index"
                    )
                      q-btn.q-pl-md.q-pr-sm.full-width(
                        color="grey-1"
                        outline
                        no-caps
                        padding="none"
                      )
                        .row.justify-between.full-width.items-center.no-wrap
                          .font-size-13.text-blue.ellipsis {{ link }}
                          div(
                            @click="onRemoveLink(index)"
                            style="width: 29px"
                          )
                            q-icon(name="mdi-window-close" color="red-2" size="15px")
            div(
              v-for="(input, index) in modal.inputs"
              :key="index"
            )
              q-item.q-pb-none
                q-item-section
                  q-item-label
                    q-input(
                      :label="'Ссылка ' + ++index"
                      v-model="input.link"
                      outlined
                      bg-color="grey-2"
                      color="red"
                    )
            q-item
              q-item-section
                q-item-label
                  OriginalButton.shadow-0.q-pa-none.text-blue(
                    padding="none"
                    @click="(btn) => addInput(btn)"
                    dense
                  ) + Добавить ссылку
                  OriginalButton(
                    v-if="atLeastOneInputIsFull()"
                    color="red-2"
                    @click="(btn) => addLinks(btn)"
                    dense
                  ) Вложить ссылки
                  InactiveButton(
                    v-else
                    dense
                  ) Вложить ссылки
            q-item
              q-item-section
                q-item-label
                  q-select(
                    :options="projects"
                    v-model="new_tutorial.project"
                    outlined
                    color="red"
                    bg-color="grey-2"
                    label="Выберите проект"
                    behavior="menu"
                    menu-anchor="bottom left"
                    dense
                  )
            q-item
              q-item-section
                q-item-label
                  q-select(
                    :options="categories"
                    v-model="new_tutorial.category"
                    outlined
                    color="red"
                    bg-color="grey-2"
                    label="Укажите категорию"
                    behavior="menu"
                    menu-anchor="bottom left"
                    dense
                  )
            q-item
              q-item-section
                q-item-label
                  q-input(
                    v-model="new_tutorial.description"
                    type="textarea"
                    outlined
                    label="Описание"
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
                          v-model="new_videoUrl"
                          type="textarea"
                          outlined
                          label="Ссылка на YouTube"
                          bg-color="grey-2"
                          color="red"
                          autogrow
                          @input="showPreview"
                          :rules="[ val => isYoutubeLink(val) || 'Пожалуйста введите корректную ссылку' ]"
                          lazy-rules
                          hide-bottom-space
                        )
                        q-video.img-blank(
                          v-if="new_convertedUrl != null || new_convertedUrl != undefined"
                          :src="new_convertedUrl"
                          :ratio="16/9"
                        )
                        //- https://www.youtube.com/watch?v=dQw4w9WgXcQ
                        OriginalButton.q-mt-lg.q-mb-xs(
                          v-if="new_videoUrl"
                          color="red-2"
                          @click="addVideo"
                        ) Прикрепить
                        InactiveButton.q-mt-lg.q-mb-xs(
                          v-else
                        ) Прикрепить
                        OriginalButton.q-mt-sm.full-width(
                          color="red-2"
                          @click="youtubeDialog.open = false; downloadDialog.open = true"
                        ) Закрыть
            q-item
              q-item-section
                q-item-label
                  OriginalButton(
                    v-if="true"
                    color="red-2"
                    @click="postTutorials"
                  ) Разместить
                  InactiveButton(
                    v-else
                  ) Разместить
    q-dialog(
      position="bottom"
      v-model="modalEdit.open"
    )
      q-swipe-to-close(v-model="modalEdit.open")
        q-card.no-border-radius
          q-card-section.q-py-sm.q-px-none.bg-grey-3
            q-item
              q-item-section
                q-item-label
                  .text-weight-550 Изменить материал
              q-item-section(side)
                q-btn.bg-grey-4(
                  size="sm"
                  flat
                  round
                  color="grey-5"
                  icon="mdi-window-close"
                  @click="modalEdit.open = false"
                )
          q-card-section.q-px-none.q-pt-md(v-if="tutorials")
            q-item
              q-item-section
                q-item-label
                  q-select(
                    :options="projects"
                    v-model="edit_project"
                    outlined
                    color="red"
                    bg-color="grey-2"
                    label="Выберите проект"
                    behavior="menu"
                    menu-anchor="bottom left"
                    dense
                  )
            q-item
              q-item-section
                q-item-label
                  q-select(
                    :options="categories"
                    v-model="edit_category"
                    outlined
                    color="red"
                    bg-color="grey-2"
                    label="Укажите категорию"
                    behavior="menu"
                    menu-anchor="bottom left"
                    dense
                  )
            q-item
              q-item-section
                q-item-label
                  q-input(
                    v-model="edit_tutorial.description"
                    type="textarea"
                    outlined
                    label="Описание"
                    bg-color="grey-2"
                    color="red"
                    autogrow
                  )
            q-item
              q-item-section
                q-item-label.text-weight-550
                  | Видеоматериалы:
                .q-pt-md.row.q-col-gutter-sm.justify-start
                  .col-4(
                    v-for="(video, indexVideo) in  edit_tutorial.convertedVideos"
                    :key="indexVideo"
                  )
                    .relative-position
                      div
                        q-video.img-blank(
                          v-if="video != null || video != undefined"
                          :src="video"
                          :ratio="16/9"
                        )
                      q-btn.bg-grey-4.button-remove(
                        size="sm"
                        flat
                        round
                        color="grey-5"
                        icon="mdi-window-close"
                        @click="onRemoveVideo_edit(indexVideo)"
                      )
            q-item
              q-item-section
                q-item-label.text-weight-550
                  | Фотоматериалы:
                .q-pt-md.row.q-col-gutter-sm.justify-start
                  .col-4(
                    v-for="(image, indexPhoto) in edit_tutorial.photos"
                    :key="indexPhoto"
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
                        @click="onRemoveImg_edit(indexPhoto)"
                      )
            q-item
              q-item-section
                q-item-label.text-weight-550
                  | Документы:
                .q-pt-md.row.q-col-gutter-sm.justify-between
                  .col-6(
                    v-for="(doc, index) in edit_tutorial.docs"
                    :key="index"
                  )
                    q-btn.q-pl-md.q-pr-sm.shadow-5.full-width(
                      no-caps
                      padding="none"
                    )
                      .row.justify-between.full-width.items-center.no-wrap
                        .q-pr-sm.font-size-13.text-grey-5.ellipsis Документ {{ index + 1 }}
                        div(
                          @click="onRemoveDoc_edit(index)"
                          style="width: 29px"
                        )
                          q-icon(name="mdi-window-close" color="red-2" size="15px")
            q-item(v-if="edit_tutorial.links")
              q-item-section
                q-item-label.text-weight-550
                  | Ссылки:
                  .q-pt-xs.row.q-col-gutter-sm.justify-between
                    .col-12(
                      v-for="(link, index) in edit_tutorial.links"
                      :key="index"
                    )
                      q-btn.q-pl-md.q-pr-sm.full-width(
                        color="grey-1"
                        outline
                        no-caps
                        padding="none"
                      )
                        .row.justify-between.full-width.items-center.no-wrap
                          .font-size-13.text-blue.ellipsis {{ link }}
                          div(
                            @click="onRemoveLink_edit(index)"
                            style="width: 29px"
                          )
                            q-icon(name="mdi-window-close" color="red-2" size="15px")
            div(
              v-for="(input, index) in modalEdit.inputs"
              :key="index"
            )
              q-item.q-pb-none
                q-item-section
                  q-item-label
                    q-input(
                      :label="'Ссылка ' + ++index"
                      v-model="input.link"
                      outlined
                      bg-color="grey-2"
                      color="red"
                    )
            q-item
              q-item-section
                q-item-label
                  OriginalButton.shadow-0.q-pa-none.text-blue(
                    padding="none"
                    @click="(btn) => addInput_edit(btn)"
                    dense
                  ) + Добавить ссылку
                  OriginalButton(
                    v-if="atLeastOneInputIsFull_edit()"
                    color="red-2"
                    @click="(btn) => addLinks_edit(btn)"
                    dense
                  ) Вложить ссылки
                  InactiveButton(
                    v-else
                    dense
                  ) Вложить ссылки
            q-item
              q-item-section
                q-item-label
                  input(
                    ref="uploadFileEdit"
                    type="file"
                    accept=".doc, .docx, application/msword, application/vnd.ms-excel, .xls, .xlsx, application/pdf, application/vnd.ms-powerpoint, .ppt, .pptx, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    @change="() => fileSelectEdit('doc')"
                    hidden
                  )
                  input(
                    v-if="mode == 'spa'"
                    ref="uploadPhotoEdit"
                    type="file"
                    accept="image/*"
                    @change="() => fileSelectEdit('photo')"
                    hidden
                  )
                  .q-pt-sm.row.q-col-gutter-sm.justify-between
                    .col-6
                      q-btn.shadow-7.full-width(
                        padding="md lg"
                        @click="downloadDialogEdit.open = true"
                      )
                        svg(width="22" height="22")
                          use(xlink:href="clip.svg#clip")
                    .col-6
                      q-btn.col-6.shadow-7.full-width(
                        @click="mode == 'spa' ? $refs.uploadPhotoEdit.click() : photoCameraEdit()"
                        padding="md lg"
                      )
                        svg(width="24" height="22")
                          use(xlink:href="camera.svg#camera")
            q-dialog(
              content-class="q-dialog-padding-fixed"
              v-model="downloadDialogEdit.open"
            )
              q-card.full-width
                q-card-section
                  q-item.q-px-xs
                    q-item-section
                      q-item-label
                        .text-h6.text-center.text-weight-bold.q-pt-md Вложение
                        .text-grey.q-my-md.text-center.text-body1 Выберите способ вложения
                        q-btn.q-my-sm.full-width(
                          @click="$refs.uploadFileEdit.click()"
                          no-caps
                          outline
                        ) Вложить документ
                        q-btn.q-my-sm.full-width(
                          @click="mode == 'spa' ? $refs.uploadPhotoEdit.click() : photoSelectEdit()"
                          no-caps
                          outline
                        ) Вложить изображение
                        q-btn.q-my-sm.full-width(
                          @click="downloadDialogEdit.open = false; youtubeDialogEdit.open = true"
                          no-caps
                          outline
                        ) Добавить ссылку на YouTube
                        OriginalButton.q-mt-sm.full-width(
                          color="red-2"
                          @click="downloadDialogEdit.open = false"
                        ) Закрыть
            q-dialog(
              content-class="q-dialog-padding-fixed"
              v-model="youtubeDialogEdit.open"
            )
              q-card.full-width.height-dialog
                q-card-section
                  q-item.q-px-xs
                    q-item-section
                      q-item-label
                        .text-h6.text-center.text-weight-bold.q-pt-md YouTube
                        .text-grey.q-my-md.text-center.text-body1 Прикрепите ссылку на видеоролик в YouTube
                        q-input.q-py-sm(
                          v-model="edit_videoUrl"
                          type="textarea"
                          outlined
                          label="Ссылка на YouTube"
                          bg-color="grey-2"
                          color="red"
                          autogrow
                          @input="showPreviewEdit"
                          :rules="[ val => isYoutubeLink(val) || 'Пожалуйста введите корректную ссылку' ]"
                          lazy-rules
                          hide-bottom-space
                        )
                        q-video.img-blank(
                          v-if="edit_convertedUrl != null || edit_convertedUrl != undefined"
                          :src="edit_convertedUrl"
                          :ratio="16/9"
                        )
                        //- https://www.youtube.com/watch?v=dQw4w9WgXcQ
                        OriginalButton.q-mt-lg.q-mb-xs(
                          v-if="edit_videoUrl"
                          color="red-2"
                          @click="addVideoEdit"
                        ) Прикрепить
                        InactiveButton.q-mt-lg.q-mb-xs(
                          v-else
                        ) Прикрепить
                        OriginalButton.q-mt-sm.full-width(
                          color="red-2"
                          @click="youtubeDialogEdit.open = false; downloadDialogEdit.open = true"
                        ) Закрыть
            q-item
              q-item-section
                q-item-label
                  OriginalButton(
                    v-if="true"
                    color="red-2"
                    @click="saveTutorial"
                  ) Сохранить
                  InactiveButton(
                    v-else
                  ) Сохранить
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
import { openURL } from 'quasar'

export default {
  name: 'tutorial-current',
  components: { OriginalButton, InactiveButton },
  data: () => ({
    tutorials: [],
    editId: 1,
    convertedUrls: [],

    new_tutorial: {
      project: null,
      category: null,
      description: null,
      images: [],
      docs: [],
      links: []
    },
    new_videos: [],
    new_videoUrl: null,
    new_convertedUrl: null,
    new_convertedUrls: [],

    edit_tutorial: {
    },
    edit_videoUrl: null,
    edit_convertedUrl: null,
    edit_convertedUrls: [],

    project: null,
    edit_project: null,
    projects: [],
    category: null,
    edit_category: null,
    categories: [{
      label: 'Все категории',
      value: 'all'
    }],
    modal: {
      open: false,
      inputs: [
        {
          link: null
        }
      ]
    },
    modalEdit: {
      open: false,
      inputs: [
        {
          link: null
        }
      ]
    },
    downloadDialog: {
      open: false
    },
    youtubeDialog: {
      open: false
    },
    downloadDialogEdit: {
      open: false
    },
    youtubeDialogEdit: {
      open: false
    },
    listOfProjectsVisibility: false
  }),
  mounted () {
    api.call('projectList')
      .then(({ data }) => {
        _.each(data, (proj) => {
          this.projects.push({
            label: proj.name,
            value: proj.id
          })
        })
      })
    api.call('categoryList')
      .then(({ data }) => {
        _.each(data, (category) => {
          this.categories.push({
            label: category.name,
            value: category.id
          })
        })
      })
    // this.showTutorials()
  },

  computed: {
    mode () {
      return process.env.TYPE
    }
  },

  methods: {
    editTutorial (tutorial) {
      this.edit_tutorial = _.cloneDeep(tutorial)
      _.each(this.projects, (project) => {
        if (project.value === this.edit_tutorial.project_id) {
          this.edit_project = project
        }
      })
      _.each(this.categories, (category) => {
        if (category.value === this.edit_tutorial.category_id) {
          this.edit_category = category
        }
      })
      // this.edit_project =
      this.modalEdit.open = true
    },
    saveTutorial (btn) {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })

      const fd = new FormData()

      fd.append('tutorial_id', this.edit_tutorial.id)
      fd.append('project_id', this.edit_project.value)
      fd.append('category_id', this.edit_category.value)
      fd.append('description', this.edit_tutorial.description)

      _.each(this.edit_tutorial.videos, (val) => {
        fd.append('videos[]', val)
      })

      _.each(this.edit_tutorial.photos, (val) => {
        if (val.startsWith('data:')) {
          fd.append('photos[]', this.$axios.dataURLtoBlob(val))
        } else {
          fd.append('photos[]', val)
        }
      })

      _.each(this.edit_tutorial.docs, (val) => {
        if (val.startsWith('data:')) {
          fd.append('docs[]', this.$axios.dataURLtoBlob(val))
        } else {
          fd.append('docs[]', val)
        }
      })

      _.each(this.edit_tutorial.links, (val) => {
        fd.append('links[]', val)
      })

      api.call('saveTutorial', fd)
        .then(({ data }) => {
          this.$q.notify('Материалы изменены')
          this.edit_tutorial = {}
          this.edit_videoUrl = null
          this.edit_convertedUrl = null
          this.edit_convertedUrls = []
          this.modalEdit.open = false
          // this.$router.push('/home/admin')
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
    showTutorials () {
      api.call('showTutorials', {
        project_id: this.project.value,
        category_id: this.category?.value ? this.category?.value : 'all'
      })
        .then(({ data }) => {
          data = data.data
          this.tutorials = []
          this.convertedUrls = []
          let urls = []

          // _.each(data, (val, key1) => {
          //   _.each(val.data.videos, (video, key2) => {
          //     // console.log(video)
          //     const url = getVideoId(video)
          //     if (url.id) {
          //       if (url.service === 'youtube') {
          //         video = `https://www.youtube.com/embed/${url.id}`
          //         this.convertedUrls.push(video)
          //         // console.log(video)
          //       }
          //     }
          //   })
          // })
          _.each(data, (val) => {
            urls = []
            _.each(val.data.videos, (video) => {
              // urls = []
              const url = getVideoId(video)
              if (url.id) {
                video = `https://www.youtube.com/embed/${url.id}`
                urls.push(video)
              }
            })

            this.tutorials.push({
              id: val.id,
              project_id: val.project_id,
              category_id: val.category_id,
              description: val.description,
              photos: val.data.photos,
              docs: val.data.docs,
              links: val.data.links,
              videos: val.data.videos,
              convertedVideos: urls,
              created_at: this.$moment(val.created_at).format('DD.MM.YYYY'),
              updated_at: this.$moment(val.updated_at).format('DD.MM.YYYY')
            })
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    postTutorials (btn) {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })

      const fd = new FormData()

      fd.append('project_id', this.new_tutorial.project.value)
      fd.append('category_id', this.new_tutorial.category.value)
      fd.append('description', this.new_tutorial.description)

      _.each(this.new_videos, (val) => {
        fd.append('videos[]', val)
      })

      _.each(this.new_tutorial.images, (val) => {
        if (val.startsWith('data:')) {
          fd.append('photos[]', this.$axios.dataURLtoBlob(val))
        } else {
          fd.append('photos[]', val)
        }
      })

      _.each(this.new_tutorial.docs, (val) => {
        if (val.startsWith('data:')) {
          fd.append('docs[]', this.$axios.dataURLtoBlob(val))
        } else {
          fd.append('docs[]', val)
        }
      })

      _.each(this.new_tutorial.links, (val) => {
        fd.append('links[]', val)
      })

      api.call('postTutorials', fd)
        .then(({ data }) => {
          this.$q.notify('Материалы опубликованы')
          this.modal.open = false
          this.new_tutorial = {
            project: null,
            category: null,
            description: null,
            images: [],
            docs: [],
            links: []
          }
          this.new_videos = []
          this.new_videoUrl = null
          this.new_convertedUrl = null
          this.new_convertedUrls = []
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
    filter () {
      this.showTutorials()
    },
    downloadDoc (tutorialId, documentId) {
      api.call('downloadDoc', {
        tutorialId: tutorialId,
        docId: documentId
      })
        .then(({ data }) => {
          openURL(data)
        })
        .finally(() => {
          this.loading = false
        })
    },
    isYoutubeLink (val) {
      const url = getVideoId(val)
      if (url.id) {
        if (url.service === 'youtube') {
          return true
        } else {
          return false
        }
      }
    },
    testMethod (btn, arg) {
      btn.offLoad()
      console.log(arg)
      this.modal.open = true
    },
    onRemoveDoc (index) {
      this.new_tutorial.docs.splice(index, 1)
      this.$refs[`${index}-slade`].reset()
    },
    onRemoveDoc_edit (index) {
      this.edit_tutorial.docs.splice(index, 1)
      this.$refs[`${index}-slade`].reset()
    },
    onRemoveImg (index) {
      this.new_tutorial.images.splice(index, 1)
      this.$refs[`${index}-slade`].reset()
    },
    onRemoveImg_edit (index) {
      this.edit_tutorial.photos.splice(index, 1)
      this.$refs[`${index}-slade`].reset()
    },
    onRemoveVideo (index) {
      this.new_videos.splice(index, 1)
      this.$refs[`${index}-slade`].reset()
    },
    onRemoveVideo_new (index) {
      this.new_videos.splice(index, 1)
      this.$refs[`${index}-slade`].reset()
    },
    onRemoveVideo_edit (index) {
      this.edit_tutorial.videos.splice(index, 1)
      this.edit_tutorial.convertedVideos.splice(index, 1)
      this.$refs[`${index}-slade`].reset()
    },
    onRemoveLink (index) {
      this.new_tutorial.links.splice(index, 1)
      this.$refs[`${index}-slade`].reset()
    },
    onRemoveLink_edit (index) {
      this.edit_tutorial.links.splice(index, 1)
      this.$refs[`${index}-slade`].reset()
    },
    everythingIsFull () {
      return true
    },
    addInput (btn) {
      btn.offLoad()
      this.modal.inputs.push({
        link: null
      })
    },
    addLinks (btn) {
      btn.offLoad()
      this.modal.inputs.forEach(input => {
        if (input.link) {
          this.new_tutorial.links.push(input.link)
          this.modal.inputs = [
            {
              link: null
            }
          ]
        }
      })
    },
    addInput_edit (btn) {
      btn.offLoad()
      this.modalEdit.inputs.push({
        link: null
      })
    },
    addLinks_edit (btn) {
      btn.offLoad()
      this.modalEdit.inputs.forEach(input => {
        if (input.link) {
          this.edit_tutorial.links.push(input.link)
          this.modalEdit.inputs = [
            {
              link: null
            }
          ]
        }
      })
    },
    atLeastOneInputIsFull () {
      for (const input in this.modal.inputs) {
        if (this.modal.inputs[input].link) {
          return true
        }
      }
    },
    atLeastOneInputIsFull_edit () {
      for (const input in this.modalEdit.inputs) {
        if (this.modalEdit.inputs[input].link) {
          return true
        }
      }
    },
    showListOfProjects () {
      this.listOfProjectsVisibility = !this.listOfProjectsVisibility
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

        this.new_tutorial.images.push(image)
      } else if (type === 'doc') {
        console.log(this.$refs.uploadFile.files[0])
        // const docName = this.$refs.uploadFile.files[0].name
        const doc = await this.fileDataURL(this.$refs.uploadFile.files[0])

        this.new_tutorial.docs.push(doc)
      }

      this.downloadDialog.open = false
    },
    async fileSelectEdit (type, files, file) {
      if (type === 'photo') {
        console.log(files, file)
        const image = await this.fileDataURL(this.$refs.uploadPhotoEdit.files[0])

        this.edit_tutorial.photos.push(image)
      } else if (type === 'doc') {
        console.log(this.$refs.uploadFileEdit.files[0])
        const doc = await this.fileDataURL(this.$refs.uploadFileEdit.files[0])

        this.edit_tutorial.docs.push(doc)
      }

      this.downloadDialog.open = false
    },
    async photoSelect () {
      const image = await Camera.getPhoto({
        source: CameraSource.Photos,
        quality: 90,
        resultType: CameraResultType.DataUrl
      })

      this.new_tutorial.images.push(image.dataUrl)

      this.downloadDialog.open = false
    },
    async photoSelectEdit () {
      const image = await Camera.getPhoto({
        source: CameraSource.Photos,
        quality: 90,
        resultType: CameraResultType.DataUrl
      })

      this.edit_tutorial.photos.push(image.dataUrl)

      this.downloadDialog.open = false
    },
    async photoCamera () {
      const image = await Camera.getPhoto({
        source: CameraSource.Camera,
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl
      })

      this.new_tutorial.images.push(image.dataUrl)
    },
    async photoCameraEdit () {
      const image = await Camera.getPhoto({
        source: CameraSource.Camera,
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl
      })

      this.edit_tutorial.photos.push(image.dataUrl)
    },
    showPreview () {
      const url = getVideoId(this.new_videoUrl)
      if (url.id) {
        if (url.service === 'youtube') {
          this.new_convertedUrl = `https://www.youtube.com/embed/${url.id}`
        }
      }
    },
    showPreviewEdit () {
      const url = getVideoId(this.edit_videoUrl)
      if (url.id) {
        if (url.service === 'youtube') {
          this.edit_convertedUrl = `https://www.youtube.com/embed/${url.id}`
        }
      }
    },
    addVideo () {
      this.new_videos.push(this.new_videoUrl)
      this.new_videoUrl = this.new_convertedUrl = null
      this.downloadDialog.open = false
      this.youtubeDialog.open = false
    },
    addVideoEdit () {
      this.edit_tutorial.videos.push(this.edit_videoUrl)
      const url = getVideoId(this.edit_videoUrl)
      if (url.id) {
        this.edit_tutorial.convertedVideos.push(`https://www.youtube.com/embed/${url.id}`)
      }
      // this.edit_tutorial.videos.push(this.edit_videoUrl)
      this.edit_videoUrl = this.edit_convertedUrl = null
      this.downloadDialogEdit.open = false
      this.youtubeDialogEdit.open = false
    }
  },
  watch: {
    new_videos () {
      this.new_convertedUrls = []
      _.each(this.new_videos, (val) => {
        const url = getVideoId(val)
        if (url.id) {
          if (url.service === 'youtube') {
            this.new_convertedUrls.push(`https://www.youtube.com/embed/${url.id}`)
          }
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .border-radius-10 {
    border-radius: 10px;
  }
  .positioned-end {
    justify-content: flex-end !important;
  }
  .wrapper {
    display:flex;
    flex-direction: column;
  }
  .bottomButton {
    flex-grow: 1;
    align-items: flex-end;
    flex: 1;
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
</style>
