<template>
  <ExpenseForm :onSubmit="updateExpense" :data="expense">
    <slot></slot>
    <button type="submit">Update</button>
  </ExpenseForm>
</template>

<script>
import ExpenseForm from './Form'
export default {
  components: {
    ExpenseForm
  },
  props: {
    data: Object
  },
  data() {
    return { expense: this.$props.data }
  },
  methods: {
    updateExpense(expense) {
      this.$store.dispatch('updateExpense', expense)
    }
  }
}
</script>
