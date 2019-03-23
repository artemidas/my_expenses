<template>
  <div>
    <ul>
      <li v-for="expense in expenses" :key="expense.id">
        <p>
          {{expense.name}} - Fee {{expense.fee}} - Periodicity
          {{expense.periodicity}}
        </p>
        <button @click="openExpenseEdit(expense)">Edit</button>
        <ExpenseEditForm v-if="expense.id === editingExpense" :data="expense">
          <button @click="closeExpenseEdit" type="button">Cancel</button>
        </ExpenseEditForm>
      </li>
    </ul>
    <p>Total {{ total }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ExpenseEditForm from './Form/Edit'

export default {
  components: {
    ExpenseEditForm
  },
  computed: {
    total() {
      return this.expenses.reduce(
        (accumulator, expense) => accumulator + Number(expense.fee),
        0
      )
    },
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

