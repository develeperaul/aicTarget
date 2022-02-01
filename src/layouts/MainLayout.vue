<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-if="environment_type === 'dev'"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-white"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          <br>
        </q-item-label>
        <EssentialLink
          v-for="(link, key) in essentialLinks"
          :key="key"
          :to="link.to"
          :title="link.title"
          :subtitle="link.subtitle"
        />
      </q-list>
    </q-drawer>
      <q-page-container>
        <q-pull-to-refresh
          @refresh="forceRerender"
          :disable="!allowedUsePull"
          color="primary"
        >
          <transition
            appear
            :enter-active-class="slideIn"
            :leave-active-class="slideOut"
            mode="out-in"
          >
            <router-view  :key="componentKey" />
          </transition>
        </q-pull-to-refresh>
      </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Авторизация',
    subtitle: 'Макет и дизайн',
    to: '/auth'
  },
  {
    title: 'Регистрация...',
    subtitle: 'Макет и дизайн',
    to: '/auth/register'
  },
  // {
  //   title: 'Забыли пароль?',
  //   subtitle: 'Макет и дизайн',
  //   to: '/auth/forgot'
  // },
  // {
  //   title: 'Пароль отправлен',
  //   subtitle: 'Макет и дизайн',
  //   to: '/auth/forgot/successful'
  // },
  {
    title: 'Админ - главная',
    subtitle: 'Макет и дизайн',
    to: '/home/admin'
  },
  {
    title: 'Пользователь - главная',
    subtitle: 'Макет и дизайн',
    to: '/home/merchant'
  },
  {
    title: 'Пользователь - информация',
    subtitle: 'Макет и дизайн',
    to: '/home/merchant/information'
  },
  {
    title: 'Пользователь - обучение',
    subtitle: 'Макет и дизайн',
    to: '/home/merchant/training-testing'
  },
  // {
  //   title: 'Супервайзер - главная',
  //   subtitle: 'Макет и дизайн',
  //   to: '/home/super'
  // },
  // {
  //   title: 'Супервайзер - управление территорией',
  //   subtitle: 'Макет и дизайн',
  //   to: '/home/super/territory'
  // },
  // {
  //   title: 'Личный кабинет - админ',
  //   subtitle: 'Макет и дизайн',
  //   to: '/home/admin/me'
  // },
  // {
  //   title: 'Супер - информация',
  //   subtitle: 'Макет и дизайн',
  //   to: '/home/super/information'
  // },
  // {
  //   title: 'Регистрация завершена',
  //   subtitle: 'Макет и дизайн',
  //   to: '/auth/register/register-completed'
  // },
  // {
  //   title: 'Все документы загружены',
  //   subtitle: 'Макет и дизайн',
  //   to: '/auth/register/upload-completed'
  // },
  // {
  //   title: 'Test',
  //   subtitle: 'Макет и дизайн',
  //   to: '/testing'
  // }
  {
    title: 'Страница увольнения',
    subtitle: 'Макет и дизайн',
    to: '/fired'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      slideIn: 'animated slideInRight',
      slideOut: 'animated slideOutLeft',
      lengthRoutes: 0,
      componentKey: 0,
      allowedUsePull: true,
      redirectTo: false
    }
  },
  watch: {
    userInfo (newVal, oldVal) {
      console.log(newVal, oldVal, 'from watch')
      // рауль if (!this.redirectTo) {
      if (this.redirectTo) {
        this.redirectTo = true
        if (newVal.has_need_fired) {
          this.$router.push('/fired')
          return
        }
        if (newVal.role_name === 'Супервайзер') {
          this.$router.push('/home/merchant')
        } else if (newVal.role_name === 'Администратор') {
          this.$router.push('/home/admin')
        } else {
          this.$router.push('/home/merchant')
        }
      }
      // if (!this.redirectTo) {
      //   if (info.has_need_fired) {
      //     this.$router.push('/fired')
      //     return
      //   }
      //   if (info.role_name === 'Супервайзер') {
      //     this.$router.push('/home/merchant')
      //   } else if (info.role_name === 'Администратор') {
      //     this.$router.push('/home/admin')
      //   } else {
      //     this.$router.push('/home/merchant')
      //   }
      // }
    },
    $route (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length

      if (toDepth <= fromDepth) {
        this.slideIn = 'animated slideInLeft'
        this.slideOut = 'animated slideOutRight'
      } else {
        this.slideIn = 'animated slideInRight'
        this.slideOut = 'animated slideOutLeft'
      }
      // console.log(typeof to.path)
      // Если вдруг надо вырубить рефреш
      if (to.path.startsWith('/territory') !== -1) {
        this.allowedUsePull = false
      } else if (to.path.startsWith('bartermarket/create') !== -1) {
        this.allowedUsePull = false
      } else {
        this.allowedUsePull = true
      }
      // console.log(this.lengthRoutes, window.history.length)
      // if (this.lengthRoutes === window.history.length) {
      //   this.slideIn = 'animated slideInLeft'
      //   this.slideOut = 'animated slideOutRight'
      // } else {
      //   this.slideIn = 'animated slideInRight'
      //   this.slideOut = 'animated slideOutLeft'
      // }
      // this.lengthRoutes = window.history.length
      // this.slideIn = toDepth < fromDepth ? 'animated slide-right' : 'animated slide-left'
      // this.slideIn = toDepth < fromDepth ? 'animated slide-right' : 'animated slide-left'
    }
  },
  mounted () {
    // console.log('123')
    this.$root.$on('leftDrawerOpen', (data) => {
      this.leftDrawerOpen = data
    })
  },
  computed: {
    environment_type () {
      return process.env.ENVIRONMENT_TYPE
    },
    userInfo () {
      return this.$store.getters['user/info']
    }
  },
  methods: {
    forceRerender (done) {
      this.componentKey += 1

      this.$store.dispatch('user/fetchInfo')
        .then(() => {
          const info = this.$store.state.user.info
          if (info.has_need_fired) {
            this.$router.push('/fired')
          }
        })
        .finally(() => {
          done()
        })
    }
  }
}
</script>
