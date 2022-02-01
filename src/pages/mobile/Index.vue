<template>
  <q-page padding class="flex flex-center text-center">
    {{userInfo}}
    <!-- <q-spinner
      color="primary"
      size="6em"
      :thickness="10"
    /> -->
    <!-- МАКЕТ ПРИЛОЖЕНИЯ ACE-TARGET<br>
    Слева доступно выезжающее меню, которое имеет ссылки на макеты
    <original-button
      class="q-mt-xs"
      color="red-2"
      @click="(btn) => leftDrawerOpen(btn)">
      Открыть меню
    </original-button>> -->
  </q-page>
</template>

<script>
// import OriginalButton from 'src/components/OriginalButton.vue'
export default {
  components: {
    // OriginalButton
  },
  name: 'PageIndex',
  data: () => ({
  }),
  beforeMount () {
    if (this.userInfo) {
      if (this.userInfo.has_need_fired) {
        this.$router.push('/fired')
        return
      }
      if (this.userInfo.role_name === 'Супервайзер') {
        this.$router.push('/home/merchant')
      } else if (this.userInfo.role_name === 'Администратор') {
        this.$router.push('/home/admin')
      } else {
        this.$router.push('/home/merchant')
      }
    } else {
      this.$router.push('auth')
    }
  },
  methods: {
    leftDrawerOpen (btn) {
      btn.offLoad()
      this.$root.$emit('leftDrawerOpen', true)
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters['user/info']
    }
  }

}
</script>
