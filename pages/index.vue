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
  created() {
    this.$store.dispatch('fetchExpenses')
  }
}
</script>
