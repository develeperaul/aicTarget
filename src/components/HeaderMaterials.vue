<template lang="pug">
  q-select.wh.q-ml-md.q-mr-sm(
    :options="materials"
    v-model="material"
    outlined
    color="red"
    label="Вид материала"
    behavior="menu"
    menu-anchor="bottom left"
    style="min-height: 60px;"
  )
</template>
<script>
export default {
  data: () => ({
    material: null,
    materials: [
      {
        label: 'Все',
        value: 'Все'
      },
      {
        label: 'Material 1',
        value: 'material-1'
      },
      {
        label: 'Material 2',
        value: 'material-2'
      },
      {
        label: 'Material 3',
        value: 'material-3'
      },
      {
        label: 'Material 4',
        value: 'material-4'
      },
      {
        label: 'Material 5',
        value: 'material-5'
      }
    ],
    listOfMaterialsVisibility: false
  }),
  methods: {
    showListOfMaterials () {
      this.listOfMaterialsVisibility = !this.listOfMaterialsVisibility
    }
  }
}
</script>
<style lang="scss" scoped>
  .wh {
    width: 580px;
    height: 60px;
  }
</style>
