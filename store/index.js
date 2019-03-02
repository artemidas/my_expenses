import request from '~/plugins/superagent'

export const state = () => ({
  expenses: [],
  editingExpense: null
})

export const mutations = {
  setExpenses(state, list) {
    state.expenses = list
  },
  createExpense(state, expense) {
    state.expenses.push(expense)
  },
  openExpenseEdit(state, expense) {
    state.editingExpense = expense.id
  },
  closeExpenseEdit(state) {
    state.editingExpense = null
  },
  updateExpense(state, updatedExpense) {
    state.expenses = state.expenses.map(expense =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    )
    state.editingExpense = null
  }
}

export const getters = {
  expenses(state) {
    return state.expenses
  },
  editingExpense(state) {
    return state.editingExpense
  }
}

export const actions = {
  async fetchExpenses({ commit }) {
    const res = await request('GET', '/api/expenses')
    commit('setExpenses', res.body)
  },
  async createExpense({ commit }, expense) {
    const res = await request('POST', '/api/expenses')
      .set('accept', 'json')
      .send(expense)
    commit('createExpense', res.body)
  },
  openExpenseEdit({ commit }, expense) {
    commit('openExpenseEdit', expense)
  },
  closeExpenseEdit({ commit }) {
    commit('closeExpenseEdit')
  },
  async updateExpense({ commit }, expense) {
    const res = await request('PATCH', '/api/expenses/' + expense.id)
      .set('accept', 'json')
      .send(expense)
    commit('updateExpense', res.body)
  }
}
