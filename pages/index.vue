<template>
  <div>
    <ExpenseCreateForm></ExpenseCreateForm>
    <ExpensesList></ExpensesList>
  </div>
</template>

<script>
import ExpenseCreateForm from '~/components/Expenses/Form/Create'
import ExpensesList from '~/components/Expenses/List'

export default {
  components: {
    ExpenseCreateForm,
    ExpensesList
  },
  async fetch({ store }) {
    await store.dispatch('fetchExpenses')
  }
}
</script>
