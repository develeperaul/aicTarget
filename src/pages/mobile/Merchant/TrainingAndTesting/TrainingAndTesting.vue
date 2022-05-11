<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Назад"
            to="/home/merchant"
          )
          header-settings
            q-list(style="width: 239px")
              q-item(clickable)
                q-item-section(no-wrap)
                  router-link.col.q-pt-sm(
                    tag="span"
                    :to="{ name: 'merchant-info' }"
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
    q-item
      q-item-section
        q-item-label
          .text-h4.text-weight-bolder.q-mb-md
            | Обучение и тестирование
    q-list.q-px-md(separator)
      q-item.no-padding
        q-item-section
          router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",:to="{ name: 'testing', params: { openTab: 'testings' }}")
            | Доступные тесты
            q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label.q-py-lg.row.justify-between.items-center.no-wrap(@click="getPlanogramm")
            | Планограммы
            q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label.q-py-lg.row.justify-between.items-center.no-wrap(@click="getNotebookMerchant")
            | Тетрадь мерчендайзера
            q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      q-item.no-padding
        q-item-section
          q-item-label
            router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="/home/merchant/training-testing/materials")
              | Обучающие материалы
              q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
      //- q-item.no-padding
      //-   q-item-section
      //-     q-item-label
      //-       router-link.q-py-lg.row.justify-between.items-center.no-wrap(tag="span",to="/home/merchant/training-testing/video-materials")
      //-         | Видеообучение
      //-         q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
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
    a(style="display:none" download ref="linkDownload")
</template>
<script>
import { openURL } from "quasar";
import HeaderSettings from "components/HeaderSettings";
import Api from "modules/api";
import mime from "mime-types";
const api = new Api("User");
export default {
  components: { HeaderSettings },
  data: () => ({
    dialog: {
      open: false
    }
  }),
  computed: {
    project_id() {
      return this.$store.state.user.info.project_id;
    }
  },
  methods: {
    logOut() {
      this.$q.localStorage.remove("token");
      this.$router.push("/auth");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
    downloadFile(path) {
      // console.log(this.$axios.defaults.baseURL)
      openURL(`${this.$axios.defaults.baseURL}${path}`);
      // http://149.154.64.211/storage/common/filler_payform.pdf
    },
    //- getNotebookMerchant() {
    //-   api.call("getMerchandiserNotebook", this.project_id).then(({ data }) => {
    //-     this.$refs.linkDownload.href = window.URL.createObjectURL(data);
    //-     this.$refs.linkDownload.click();
    //-     this.$refs.linkDownload.href = null;
    //-   });
    //- },
    getNotebookMerchant() {
      // getPlanogram
      this.$q.loading.show();
      api.call("getMerchandiserNotebook", this.project_id).then(r => {
        const filename = `Тетрадь мерчендайзера.${mime.extension(r.data.type)}`;
        window.document.addEventListener(
          "deviceready",
          () => {
            let storageLocation = "";

            switch (cordova.platformId.toLowerCase()) {
              case "android":
                storageLocation = cordova.file.externalDataDirectory;
                break;

              case "ios":
                storageLocation = cordova.file.documentsDirectory;
                break;
            }
            const folderPath = storageLocation;
            console.log(mime.extension(r.data.type));
            window.resolveLocalFileSystemURL(
              folderPath,
              dir => {
                dir.getFile(
                  filename,
                  {
                    create: true
                  },
                  file => {
                    file.createWriter(
                      fileWriter => {
                        fileWriter.write(r.data);
                        fileWriter.onwriteend = () => {
                          this.$q.loading.hide();
                          alert(
                            `Файл успешно загружен в папку \n ${folderPath}${filename}`
                          );
                          // var url = file.toURL()
                          // console.log(cordova.file.externalApplicationStorageDirectory)
                          // console.log(`${folderPath}${filename}.${mime.extension(r.data.type)}`)
                          // cordova.plugins.fileOpener2.open(`${url}.${mime.extension(r.data.type)}`, r.data.type, {
                          //   error: function error (err) {
                          //     console.error(err)

                          //     alert(`url: ${url}. folder: ${folderPath}${filename}.${mime.extension(r.data.type)}`)
                          //   },
                          //   success: function success () {
                          //     console.log('success with opening the file')
                          //   }
                          // })
                        };

                        fileWriter.onerror = function(err) {
                          alert("Ошибка загрузки повторите еще");
                          console.error(err);
                        };
                      },
                      err => {
                        // failed
                        alert("Ошибка загрузки повторите еще");
                        this.$q.loading.hide();
                        console.error(err);
                      }
                    );
                  },
                  err => {
                    alert("Ошибка загрузки повторите еще");
                    this.$q.loading.hide();
                    console.error(err);
                  }
                );
              },
              err => {
                this.$q.loading.hide();
                alert("Ошибка чтения файла");
                console.error(err);
              }
            );
          },
          false
        );
      });
    },
    getPlanogramm() {
      // getPlanogram
      this.$q.loading.show();
      api.call("getPlanogram", this.project_id).then(r => {
        const filename = `Планограммы.${mime.extension(r.data.type)}`;
        window.document.addEventListener(
          "deviceready",
          () => {
            let storageLocation = "";

            switch (cordova.platformId.toLowerCase()) {
              case "android":
                storageLocation = cordova.file.externalDataDirectory;
                break;

              case "ios":
                storageLocation = cordova.file.documentsDirectory;
                break;
            }
            const folderPath = storageLocation;
            console.log(mime.extension(r.data.type));
            window.resolveLocalFileSystemURL(
              folderPath,
              dir => {
                dir.getFile(
                  filename,
                  {
                    create: true
                  },
                  file => {
                    file.createWriter(
                      fileWriter => {
                        fileWriter.write(r.data);
                        console.log(file);
                        fileWriter.onwriteend = () => {
                          this.$q.loading.hide();
                          alert(
                            `Файл успешно загружен в папку \n ${folderPath}${filename}`
                          );
                          // var url = file.toURL()
                          // console.log(cordova.file.externalApplicationStorageDirectory)
                          // console.log(`${folderPath}${filename}.${mime.extension(r.data.type)}`)
                          // cordova.plugins.fileOpener2.open(`${url}.${mime.extension(r.data.type)}`, r.data.type, {
                          //   error: function error (err) {
                          //     console.error(err)

                          //     alert(`url: ${url}. folder: ${folderPath}${filename}.${mime.extension(r.data.type)}`)
                          //   },
                          //   success: function success () {
                          //     console.log('success with opening the file')
                          //   }
                          // })
                        };

                        fileWriter.onerror = function(err) {
                          alert("Ошибка загрузки повторите еще");
                          console.error(err);
                        };
                      },
                      err => {
                        // failed
                        alert("Ошибка загрузки повторите еще");
                        this.$q.loading.hide();
                        console.error(err);
                      }
                    );
                  },
                  err => {
                    alert("Ошибка загрузки повторите еще");
                    this.$q.loading.hide();
                    console.error(err);
                  }
                );
              },
              err => {
                this.$q.loading.hide();
                alert("Ошибка чтения файла");
                console.error(err);
              }
            );
          },
          false
        );
      });
    }
  }
};
</script>
