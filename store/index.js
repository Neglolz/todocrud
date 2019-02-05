import axios from 'axios'
export const strict = false

export const state = () => ({
  todos: [],
  alert: {
    show: false,
    type: 'error',
    text: 'storeValue'
  }
})

export const mutations = {
  init (state, todos) {
    state.todos = todos
  },
  add (state, todo) {
    state.todos = [...state.todos, todo]
  },
  remove (state, todo) {
    state.todos = state.todos.filter(t => t.id !== todo.id)
  },
  toggle (state, todo) {
    state.todos = state.todos.map(t =>
      t.id === todo.id
        ? todo
        : t
    )
  },
  edit (state, todo) {
    state.todos = state.todos.map(t =>
      t.id === todo.id
        ? todo
        : t
    )
  },
  setAlert (state, alert) {
    state.alert.show = alert.show
    state.alert.type = alert.type
    state.alert.text = alert.text
  }
}

export const actions = {
  async add ({ commit }, title) {
    try {
      const res = await axios.post('https://jsonplaceholder.typicode.com/todos',
        { title, completed: false })
      commit('add', res.data)
      commit('setAlert', { show: 'true', type: 'success', text: 'La tâche a été correctement ajoutée' })
    } catch (err) {
      commit('setAlert', { show: 'true', type: 'error', text: 'La tâche n\'a pas pu être ajoutée' + err.message })
    }
  },
  async remove ({ commit }, todo) {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
      commit('remove', todo)
      commit('setAlert', { show: 'true', type: 'success', text: 'La tâche a été ajoutée' })
    } catch (err) {
      commit('setAlert', { show: 'true', type: 'error', text: 'La tâche n\'a pas pu être ajoutée' + err.message })
    }
  },
  async toggle ({ commit }, todo) {
    try {
      const res = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        {
          completed: !todo.complete
        })
      commit('toggle', res.data)
      commit('setAlert', { show: 'true', type: 'success', text: 'Tâche terminé' })
    } catch (err) {
      commit('setAlert', { show: 'true', type: 'error', text: 'La tâche n\'a pas pu être désactivée' + err.message })
    }
  },
  async edit ({ commit }, todo) {
    try {
      await axios.patch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        { id: todo.id, title: todo.title, completed: false })
      commit('edit', todo)
      commit('setAlert', { show: 'true', type: 'success', text: 'La tâche a été éditée' })
    } catch (err) {
      commit('setAlert', { show: 'true', type: 'error', text: 'La tâche n\'a pas pu être éditée' + err.message })
    }
  }
}
