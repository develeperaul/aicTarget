<template lang="pug">
  q-select.wh.q-ml-md.q-mr-sm(
    :options="statements"
    v-model="statement"
    outlined
    color="red"
    label="Вид заявления"
    behavior="menu"
    menu-anchor="bottom left"
    style="min-height: 60px;"
  )
</template>
<script>
export default {
  data: () => ({
    statement: null,
    statements: [
      {
        label: 'Все',
        value: 'Все'
      },
      {
        label: 'Statement 1',
        value: 'statement-1'
      },
      {
        label: 'Statement 2',
        value: 'statement-2'
      },
      {
        label: 'Statement 3',
        value: 'statement-3'
      },
      {
        label: 'Statement 4',
        value: 'statement-4'
      },
      {
        label: 'Statement 5',
        value: 'statement-5'
      }
    ],
    listOfStatementsVisibility: false
  }),
  methods: {
    showListOfStatements () {
      this.listOfStatementsVisibility = !this.listOfStatementsVisibility
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
