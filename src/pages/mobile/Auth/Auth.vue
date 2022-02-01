<template lang="pug">
  q-page.wrapper
    q-item.q-pt-xl
      q-item-section
        q-item-label.text-center
          svg(width="136" height="42")
            use(xlink:href="acetarget.svg#logotype")
    q-item.q-mt-xl
      q-item-section
        q-item-label
          div.text-h4.text-weight-bolder.text-center
            | Авторизация
          div.q-mt-md.text-h7.text-center.text-grey
            div Добро пожаловать,
            div воспользуйтесь формой входа
    q-item.q-mt-md
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="email"
            label="Логин"
            color="red"
            hide-bottom-space
          )
    q-item.q-mb-sm
      q-item-section
        q-item-label
          q-input(
            outlined
            bg-color="grey-2"
            v-model="password"
            label="Пароль"
            color="red"
            :type="isPwd ? 'password' : 'text'"
          )
            template(
              v-slot:append
            )
              q-icon(
                :name="isPwd ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              )
    q-item
      q-item-section
        q-item-label
          OriginalButton(
            color="red-2"
            @click="auth"
          ) Войти
        //- q-item-label
          OriginalButton(
            color="red-2"
            @click="tokenset"
          ) Войти
    q-item
      q-item-section
        q-item-label.text-center
          router-link.text-blue.text-weight-550.text-body2(
            tag="span",
            to="/auth/forgot-password"
          ) Забыли пароль?
    q-item.q-pb-lg.bottom
      q-item-section
        q-item-label.text-center.font-size-15
          .text-grey Еще нет аккаунта?
            router-link.q-ml-xs.text-blue.text-weight-550(
              tag="span",
              to="/auth/register"
            ) Зарегистрируйтесь
</template>
<script>
import Api from 'modules/api'
const apiAuth = new Api('Auth')
// const apiUser = new Api('User')
import OriginalButton from 'components/OriginalButton.vue'
export default {
  components: { OriginalButton },
  data () {
    return {
      email: null,
      password: null,
      isPwd: true
    }
  },
  mounted () {
    const log = this.$q.localStorage.getItem('auth-login-temp')
    const pass = this.$q.localStorage.getItem('auth-password-temp')
    this.$q.localStorage.remove('auth-login-temp')
    this.$q.localStorage.remove('auth-password-temp')
    if (log) this.email = log
    if (pass) this.password = pass
  },
  methods: {
    // tokenset () {
    //   const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiNDUzNzJlNmNhZjQ4OTFlZTdiNDQ3ZTZkMzYxNGQ3YjU2ZWE5ZjhiOWVhMmY2MzgyMmIyNWZiMTVmMDExYzc0NzM1YmQ5ZWQzODg4MmY2MGEiLCJpYXQiOjE2MTg3NTAxNzMuMjEzOTQ1LCJuYmYiOjE2MTg3NTAxNzMuMjE0MDE2LCJleHAiOjE2NTAyODYxNzMuMTgwMzcyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.j7XROPr7CHbxwCdO0pqEGx8pVH1JT6-ffcd2-Fx-RWoONnB5MCOQu7TPpUCnz-7Lk-JcKAQXfA8NNnQk7YUnqN2Md2IM2hDhRuQ_FLA7tBiG_TFhHl3u4TKBTRIPW-41jfpZBMwc85Ue9rKlPSJbKnX49JxxCTYU_NIY9cSKx96W492V1SQH6EYZLhl_g6YudO8SrbUg9kuPfxz_Pvfma7zgDlohc698LzHyeFamXGAIQoIqLgqg-HJN-FuiS7GakDubWlQ6uLYv1VR2IZHHnD2LOHUER2qnSCxkssqLK0LarjDoeP4L53i7nIIXpwd7TkXP1xJO_HtqJIpjhsJS5Cr_XVpQ-P7GbAYom5op2v1QdjqqzaMUvACRH14ncIm9b749L5cL4p0Yix2ZYQR5cTsYpOsoSYAtSptgm2xcThdxPKm3A7U-hlTN7fqlYoLrk3YVBvKI5NALR8_Ct3SPQEeanzx0YbPMfahRrqou7P7zG7qipnvX80cJRE7RDFU-fW4ejxvCAiLSJ7Y0GBmaTbl8z_ATRdqwtNviHhjwfeAgOAIYiAS9oU8u7lDq9cdX5Ys3puZkw2d9AtnyTwkNSTH8I2n-X_I5aKbt7C-fpSn97E1Y-i60vHMLoMwPNtYcrVqQ7NmgWCfV6hQGsntV-J2R-OsTsj97xqf3r62B2qo'
    //   this.$q.localStorage.set('token', token)
    // },
    auth (button) {
      this.$q.localStorage.remove('reg-uuid')
      this.$q.localStorage.remove('reg-step')

      apiAuth.call('auth', {
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          this.$store.dispatch('user/saveToken', data.access_token)
          this.$store.dispatch('user/fetchInfo')
            .then(() => {
              const info = this.$store.state.user.info
              if (info.has_need_fired) {
                this.$router.push('/fired')
                return
              }
              if (info.role_name === 'Супервайзер') {
                this.$router.push('/home/merchant')
              } else if (info.role_name === 'Администратор') {
                this.$router.push('/home/admin')
              } else {
                this.$router.push('/home/merchant')
              }
            })
        })
        .catch(this.$axios.errorHandler)
        .finally(() => {
          button.offLoad()
        })
      // apiUser.call('info', {})
      //   .then((data) => {
      //     console.log(data.data)
      //   })
    }
  }
}
</script>
<style lang="scss" scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
  }
  .bottom {
    flex-grow: 1;
    align-items: flex-end;
    flex: 1;
  }
</style>
