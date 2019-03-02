<template>
  <ExpenseForm :onSubmit="createService" :data="expense">
    <button type="submit">Save</button>
  </ExpenseForm>
</template>

<script>
import ExpenseForm from './Form'

export default {
  components: { ExpenseForm },
  data: function() {
    return { expense: { name: '', fee: 0, periodicity: '' } }
  },
  methods: {
    createService(expense) {
      this.$store.dispatch('createExpense', expense)
    }
  }
}
</script>

