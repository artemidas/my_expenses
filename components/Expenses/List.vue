<template>
  <ul>
    <div class="container">
      <li v-for="expense in expenses" :key="expense.id">
        <div class="expense-item">
          <p>
            {{expense.name}} - Fee {{expense.fee}} - Periodicity
            {{expense.periodicity}}
          </p>
          <button @click="openExpenseEdit(expense)">Edit</button>
        </div>
        <ExpenseEditForm v-if="expense.id === editingExpense" :data="expense">
          <button @click="closeExpenseEdit" type="button">Cancel</button>
        </ExpenseEditForm>
      </li>
    </div>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

import ExpenseEditForm from './Form/Edit'

export default {
  components: {
    ExpenseEditForm
  },
  computed: {
    ...mapGetters({
      expenses: 'expenses',
      editingExpense: 'editingExpense'
    })
  },
  methods: {
    openExpenseEdit(expense) {
      this.$store.dispatch('openExpenseEdit', expense)
    },
    closeExpenseEdit() {
      this.$store.dispatch('closeExpenseEdit')
    }
  }
}
</script>
<style scoped>
.expense-item {
  display: flex;
  justify-content: space-between;
}
</style>
