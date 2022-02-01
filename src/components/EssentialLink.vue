<template lang="pug">
  q-item(
    :to="to"
    :title="title"
  )
    q-item-section(avatar)
      q-icon(
        name="mdi-link"
        color="black"
      )
    q-item-section
      q-item-label.text-blue
        | {{ title }}
      q-item-label(v-if="subtitle", caption)
        | {{ subtitle }}
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false
    },

    to: {
      type: String,
      default: '#'
    }
  }
}
</script>
