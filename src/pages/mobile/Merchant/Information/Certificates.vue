<template lang="pug">
  q-page
    q-item
      q-item-section
        q-item-label.row.justify-between
          header-link(
            title="Информирование"
            to="/home/merchant/information"
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
    //- q-item
    //-   q-item-section
    //-     q-item-label.text-h4.text-weight-bolder.q-mb-md
    //-       | Запрос справок
    q-list.q-px-md(separator)
      q-item.no-padding(
        v-for="(certificate, key) in certificates"
        :key="key"
      )
        q-item-section
          q-item-label.q-py-lg.row.justify-between.items-center.no-wrap(
            @click="certificate.open = true; period = {}; displayedPeriod = null; comment = null"
          )
            | {{certificate.name}}
            q-icon.q-pr-md(name="mdi-chevron-right" size="20px")
        q-dialog(
          v-model="certificate.open"
          position="bottom"
        )
          q-swipe-to-close(v-model="certificate.open")
            q-card.no-border-radius
              q-card-section.q-py-sm.q-px-none.bg-grey-3
                q-item
                  q-item-section
                    q-item-label
                      | Заполните пустые поля
                  q-item-section(side)
                    q-btn.bg-grey-4(
                      size="sm"
                      flat
                      round
                      color="grey-5"
                      icon="mdi-window-close"
                      @click="certificate.open=false"
                    )
              q-card-section.q-px-none.q-pt-md
                q-item
                  q-item-section
                    q-item-label.text-h6.text-weight-bold
                      | {{ certificate.name }}
                q-item
                  q-item-section
                    q-item-label.text-grey
                      | Укажите период за который необходимо предоставить справку
                q-item
                  q-item-section
                    q-item-label
                      q-input(
                        bg-color="grey-2"
                        outlined
                        label="Укажите период"
                        color="red"
                        ref="dataTarget"
                        @clear="clearInput"
                        mask="##.##.#### - ##.##.####"
                        v-model="displayedPeriod"
                      )
                      q-date.full-width(
                        flat
                        range
                        v-model="period"
                        mask="DD.MM.YYYY"
                        minimal
                        :locale="$utils.calendarLocale"
                        @click="setDisplayedPeriod()"
                      )
                q-item
                  q-item-section
                    q-item-label
                      q-input(
                        v-model="comment"
                        type="textarea"
                        bg-color="grey-2"
                        outlined
                        placeholder="Электронная справка или оригинал, укажите электронную почту или почтовый адрес индексом"
                        color="red"
                      )
                q-item
                  q-item-section
                    q-item-label
                      OriginalButton(
                        v-if="periodSelected"
                        color="red-2"
                        @click="(btn) => requestCert(btn, certificate.name)"
                      ) Запросить
                      InactiveButton(
                        v-else
                      ) Запросить
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
import OriginalButton from "components/OriginalButton.vue";
import InactiveButton from "components/InactiveButton.vue";
import HeaderSettings from "components/HeaderSettings";
import Api from "modules/api";
const api = new Api("User");
import _ from "lodash";
// import moment from 'moment'
export default {
  components: { OriginalButton, InactiveButton, HeaderSettings },
  data: () => ({
    period: {},
    comment: null,
    displayedPeriod: null,
    certificate: null,
    certificates: [
      {
        open: false,
        name: "2-НДФЛ (справка о доходах физического лица)"
      },
      {
        open: false,
        name: "Справка 182н (только уволенным сотрудникам)"
      },
      {
        open: false,
        name: "Справка с места работы"
      },
      {
        open: false,
        name:
          "Справка о доходах (для сотрудников в декрете) за 3, 6, 12 месяцев"
      },
      {
        open: false,
        name: "Справка о нахождении в декретном отпуске"
      },

      {
        open: false,
        name: "Справка о том, что сотрудник находится в отпуске до 3-х лет"
      },
      {
        open: false,
        name:
          "Справка о том, что сотрудник не находится в отпуске по уходу за ребенком до 3-х лет и не получает пособие до 1,5 лет"
      },
      {
        open: false,
        name:
          "Справка о неполучении единовременного пособия при рождении, пособия по уходу за ребенком до 1,5 лет"
      },
      {
        open: false,
        name: "Справка для центра занятости (уволенные сотрудники)"
      },
      {
        open: false,
        name: "Справка, что сотрудник не получает материальную помощь на детей"
      },
      {
        open: false,
        name:
          "Справка о том, что сотрудник получал / не получал оплату по листку нетрудоспособности"
      },
      {
        open: false,
        name: "Справка о предоставлении субсидий"
      }

      //- {
      //-   open: false,
      //-   name: 'Справка для расчета пособий/справка о доходах (для сотрудников в декрете)'
      //- },
      //- {
      //-   open: false,
      //-   name: 'Справка о неполучении родителем пособия'
      //- },
      //- {
      //-   open: false,
      //-   name: 'Справка для центра занятости'
      //- },
      //- {
      //-   open: false,
      //-   name: 'Справка для предоставления субсидий'
      //- }
    ],
    dialog: {
      open: false
    }
  }),
  computed: {
    periodSelected() {
      const from = this.period?.from;
      const to = this.period?.to;
      if (from !== undefined && to !== undefined) {
        return true;
      }
      return false;
    }
  },
  watch: {
    displayedPeriod: {
      handler(val) {
        const current = Date.now();
        const from = new Date(
          val
            ?.split("-")[0]
            ?.trim()
            .split(".")
            .reverse()
            .join("-")
        ).getTime();
        const to = new Date(
          val
            ?.split("-")[1]
            ?.trim()
            .split(".")
            .reverse()
            .join("-")
        ).getTime();
        if (
          !isNaN(from) &&
          from < current &&
          !isNaN(to) &&
          to <= current &&
          val.split("-")[0]?.trim().length === 10 &&
          val.split("-")[1]?.trim().length === 10
        ) {
          console.log(current);
          console.log(to);
          this.period = {
            from: val.split("-")[0]?.trim(),
            to: val.split("-")[1]?.trim()
          };
          this.setDisplayedPeriod();
        }
        // if (isNaN(from)) {
        //   // this.clearInput()
        //   console.log(val)
        //   this.displayedPeriod = ''
        //   this.period = {}
        // }
      }
    }
  },
  methods: {
    clearInput(v) {
      console.log(v);
    },
    logOut() {
      this.$q.localStorage.remove("token");
      this.$router.push("/auth");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
    requestCert(btn, certName) {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null;
      });

      const fd = new FormData();
      fd.append("reference_name", certName);
      fd.append("period_start", this.period.from);
      fd.append("period_end", this.period.to);
      fd.append("comment", this.comment);

      api
        .call("requestCert", fd)
        .then(({ data }) => {
          this.$q.notify("Справка заказана");
          console.log(fd);
        })
        .catch(e => {
          throw e;
          this.$axios.errorHandler;
        })
        .finally(() => {
          btn.offLoad();
        });
    },
    setDisplayedPeriod() {
      const from = this.period?.from;
      const to = this.period?.to;
      if (from !== undefined && to !== undefined) {
        this.displayedPeriod = from + " - " + to;
      } else {
        //- this.period = {};
        //- this.displayedPeriod = null;
      }
    }
  },

  mounted() {
    // const date = new Date()
    // console.log(date)
    // moment.now = function () { return +new Date(moment().format('YYYY-MM-DD')) }
  }
};
</script>
