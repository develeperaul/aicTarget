<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted () {
    if (this.$axios.token) {
      this.$store.dispatch('user/fetchInfo')
        .then(() => {
          const info = this.$store.state.user.info
          if (info.has_need_fired) {
            this.$router.push('/fired')
          }
        })
        .catch(() => {
          this.$router.push('/auth')
          // console.log('error, handle')
        })
    } else {
      this.$router.push('/auth')
    }
  }
}
</script>
<style>
  #q-app {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
