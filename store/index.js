import db from '~/plugins/firestore'

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
    const snapshot = await db.collection('expenses').get()
    const expenses = [];
    snapshot.forEach((doc) => {
      expenses.push({ id: doc.id, ...doc.data() })
    });
    commit('setExpenses', expenses)
  },
  async createExpense({ commit }, expense) {
    const docRef = await db.collection('expenses').add(expense);
    commit('createExpense', { id: docRef.id, ...expense })
  },
  openExpenseEdit({ commit }, expense) {
    commit('openExpenseEdit', expense)
  },
  closeExpenseEdit({ commit }) {
    commit('closeExpenseEdit')
  },
  async updateExpense({ commit }, expense) {
    const expenseRef = await db.collection('expenses').doc(expense.id)
    expenseRef.update(expense);
    commit('updateExpense', { id: expenseRef.id, ...expense })
  }
}
