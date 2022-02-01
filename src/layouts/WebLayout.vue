<template lang="pug">
  q-layout.max-width(view="hHh lpR fFf")
    q-header.bg-white.height-header.row.items-center(
      v-if="headerShown"
      bordered
    )
      q-toolbar.max-width.q-px-lg
        q-btn(
          dense
          aria-label="Menu"
        )
          svg(width="149" height="46")
            use(xlink:href="acetarget-web.svg#logotype-web")
        q-toolbar-title
        .col
          .row.items-center.no-wrap.justify-end
            router-view(name="leading")
            q-select.wh.q-ml-lg.q-mr-sm(
              :options="projects"
              v-model="project"
              outlined
              color="red"
              label="Выбрать проект"
              behavior="menu"
              menu-anchor="bottom left"
              style="min-height: 60px;"
            )
            router-view(name="leadingMaterials")
            router-view(name="leadingStatements")
            header-settings-web.q-ml-xl.col-auto.cursor-pointer
              q-list
                q-item(clickable)
                  q-item-section(no-wrap)
                    router-link(tag="span",to="/home/admin/edit")
                      | Изменить личные данные
                q-item(clickable)
                  q-item-section.text-red-2
                    router-link(tag="span",to="/auth")
                      | Выйти
    q-page-container.q-px-lg
      router-view.q-pt-xl
</template>
<script>
export default {
  data () {
    return {
      search: null,
      headerShown: true,
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
    }
  },
  methods: {
    showListOfProjects () {
      this.listOfProjectsVisibility = !this.listOfProjectsVisibility
    }
  },
  beforeMount () {
    if (this.$route.name === 'auth') {
      this.headerShown = false
    } else {
      this.headerShown = true
    }
  },
  watch: {
    $route (to, from) {
      if (to.name === 'auth') {
        this.headerShown = false
      } else {
        this.headerShown = true
      }
      // if (to.path.search('/territory') !== -1) {
      //   this.allowedUsePull = false
      // } else if (to.path.search('bartermarket/create') !== -1) {
      //   this.allowedUsePull = false
      // } else {
      //   this.allowedUsePull = true
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
  .max-width {
    max-width: 1440px;
    margin: 0 auto;
  }
  .wh {
    width: 580px;
    height: 60px;
  }
  .height-header {
    height: 100px;
  }
</style>
