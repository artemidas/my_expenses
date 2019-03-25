<template>
  <form v-on:submit.prevent="onFormSubmit">
    <label for="name">Name</label>
    <input id="name" type="text" :value="expense.name" @input="onInput('name', $event)">
    <label for="fee">Fee</label>
    <input id="fee" type="number" :value="expense.fee" @input="onInput('fee', $event)">
    <label for="periodicity">Name</label>
    <select
      name="periodicity"
      id="periodicity"
      :value="expense.periodicity"
      @input="onInput('periodicity', $event)"
    >
      <option disabled value>Select an option</option>
      <option value="Monthly">Monthly</option>
      <option value="Yearly">Yearly</option>
    </select>
    <slot></slot>
  </form>
</template>

<script>
import assign from 'lodash/assign'

export default {
  name: 'ExpenseForm',
  props: {
    onSubmit: Function,
    data: Object
  },
  data: function() {
    return { expense: this.$props.data }
  },
  methods: {
    onInput(field, e) {
      this.expense = assign({}, this.expense, {
        [field]: e.target.value
      })
    },
    onFormSubmit() {
      this.$props.onSubmit(this.expense)
      this.expense = { name: '', fee: 0, periodicity: '' }
    }
  }
}
</script>

