import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const instance = axios.create({
  baseURL: 'https://fierce-coast-28247.herokuapp.com',
  timeout: 1000,
  headers: {'Authorization': ''}
})

export const store = new Vuex.Store({
  state: {
    filter: 'all',
    tasks: [
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
      state.tasks = state.tasks.filter(task => !task.completed)
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    checkAll(state, event) {
      state.tasks.forEach((task) => task.completed = event.target.checked)
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
    getTasks(state, tasks) {
      state.tasks = tasks
    }
  },
  actions: {
    getTasks(context) {
      instance.get('/buckets/1/tasks')
        .then(response => {
          context.commit('getTasks', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addTask(context, task) {
      instance.post('/buckets/1/tasks', {
        title: task.title,
      })
        .then(response => {
          context.commit('addTask', response.data)
        })
        .catch(error => {
          console.log(error)
        })
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
      instance.delete('/buckets/1/tasks/' + id)
        .then(response => {
          context.commit('removeTask', id)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateTask(context, task) {
      instance.patch('/buckets/1/tasks/' + task.id, {
        title: task.title,
      })
        .then(response => {
          context.commit('updateTask', task)
        })
        .catch(error => {
          console.log(error)
        })
    },
  }
})
