import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    filter: 'all',
    tasks: [
      {
        'id': 1,
        'title': 'Finish Vue Screencast 1',
        'completed': true,
        'editing': false,
      },
      {
        'id': 2,
        'title': 'Finish Vue Screencast 2',
        'completed': true,
        'editing': false,
      },
      {
        'id': 3,
        'title': 'Finish Vue Screencast 3',
        'completed': true,
        'editing': false,
      },
      {
        'id': 4,
        'title': 'Finish Vue Screencast 4',
        'completed': true,
        'editing': false,
      },
      {
        'id': 5,
        'title': 'Finish Vue Screencast 5',
        'completed': false,
        'editing': false,
      }
    ]
  },
  getters: {
    remaining(state) {
      return state.tasks.filter(task => !task.completed).length
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0
    },
    tasksFiltered(state) {
      if (state.filter == 'all') {
        return state.tasks
      } else if (state.filter == 'inProgress') {
        return state.tasks.filter(task => !task.completed)
      } else if (state.filter == 'completed') {
        return state.tasks.filter(task => task.completed)
      }
    },
    showClearCompletedButton(state, getters) {
      return getters.tasksFiltered.filter(task => task.completed).length > 0
    },
    completedTasks(state) {
      return state.tasks.filter(task => task.completed).length
    }
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push({
        id: task.id,
        title: task.title,
        completed: false,
        editing: false,
      })
    },
    clearCompleted(state) {
      store.state.tasks = store.state.tasks.filter(task => !task.completed)
    },
    updateFilter(state, filter) {
      store.state.filter = filter
    },
    checkAll(state, event) {
      store.state.tasks.forEach((task) => task.completed = event.target.checked)
    },
    removeTask(state, id) {
      const index = state.tasks.findIndex(item => item.id == id)
      state.tasks.splice(index, 1)
    },
    updateTask(state, task) {
      const index = state.tasks.findIndex(item => item.id == task.id)
      state.tasks.splice(index, 1, {
        'id': task.id,
        'title': task.title,
        'completed': task.completed,
        'editing': task.editing,
      })
    },
  },
  actions: {
    addTask(context, task) {
      context.commit('addTask', task)
    },
    clearCompleted(context) {
      context.commit('clearCompleted')
    },
    updateFilter(context, filter) {
      context.commit('updateFilter', filter)
    },
    checkAll(context, event) {
      context.commit('checkAll', event)
    },
    removeTask(context, id) {
      context.commit('removeTask', id)
    },
    updateTask(context, task) {
      context.commit('updateTask', task)
    },
  }
})
