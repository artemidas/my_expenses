<template>
  <div style="background-color: green;">
    <div class="container">
      <ExpenseForm :onSubmit="createService" :data="expense">
        <button type="submit">Save</button>
      </ExpenseForm>
      <div>Total {{ total }}</div>
    </div>
  </div>
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
  },
  computed: {
    total() {
      return this.$store.getters.expenses.reduce(
        (accumulator, expense) => accumulator + Number(expense.fee),
        0
      )
    }
  }
}
</script>
<style scoped>
</style>

