<template lang="pug">
  component(
    :is="`register-step-${step}`"
    :ref="`register-step-${step}`"

    :section-stored="section"
    :uuid="uuid"

    @uuid-store="uuidStore"
    @step-store="stepStore"

    @next="next()"
    @next-native="nativeStep"
    @back="back()"
  )
</template>
<script>
import components from './Steps/index'

export default {
  components: components,
  data: () => ({
    step: 1,
    section: null,
    maxStep: 3,
    uuid: null
  }),
  mounted () {
    this.nativeStep()
  },
  methods: {
    uuidStore (uuid) {
      this.$q.localStorage.set('reg-uuid', uuid)
      this.uuid = uuid
    },
    stepStore (step) {
      this.$q.localStorage.set('reg-step', step)
      // this.step = step
    },
    nativeStep (nativeStep) {
      console.log(nativeStep)
      const uuid = this.$q.localStorage.getItem('reg-uuid')
      if (uuid) {
        this.uuid = uuid
      }
      let step = this.$q.localStorage.getItem('reg-step')
      if (nativeStep) {
        step = nativeStep
      }
      if (step) {
        if (step === 'upload') {
          this.$router.push('/auth/register/upload-completed')
          return
        }
        if (step === 'final') {
          this.$router.push('/auth/register/register-completed')
          return
        }
        const separated = step.split('-')

        this.step = Number(separated[0])
        this.section = Number(separated[1])
      }
      this.$nextTick(() => {
        const component = this.$refs[`register-step-${this.step}`]
        if (component) {
          console.log(component.sectionChange)
          if (component.sectionChange) {
            component.sectionChange(this.section)
          }
        }
      })
    },
    next () {
      this.step++
    },
    back () {
      this.step--
    }
  }
}
</script>
