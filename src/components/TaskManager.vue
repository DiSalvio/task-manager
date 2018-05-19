<template>
  <div>
    <input type="text" class="task-input" placeholder="Task here" v-model="newTask" @keyup.enter="addTask">
    <transition-group enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <task v-for="(task, index) in tasksFiltered" :key="task.id" :task="task" :index="index" :checkAll="!anyRemaining">
      </task>
    </transition-group>

    <checkAll :remaining="remaining" :anyRemaining="anyRemaining" :showClearCompletedButton="showClearCompletedButton" :completedTasks="completedTasks"></checkAll>
    <taskFilters></taskFilters>
  </div>
</template>

<script>
import Task from './Task'
import CheckAll from './CheckAll'
import TaskFilters from './TaskFilters'

export default {
  name: 'TaskManager',
  components: {
    Task,
    CheckAll,
    TaskFilters,
  },
  data() {
    return {
      newTask: '',
      idForTask: 3,
      filter: 'all',
      beforeEditCache: '',
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
          'completed': false,
          'editing': false,
        },
        {
          'id': 5,
          'title': 'Finish Vue Screencast 5',
          'completed': false,
          'editing': false,
        }
      ]
    }
  },
  created() {
    eventBus.$on('removedTask', (index) => this.removeTask(index))
    eventBus.$on('finishedEdit', (data) => this.finishedEdit(data))
    eventBus.$on('checkAllChanged', (checked) => this.checkAllTasks(checked))
    eventBus.$on('filterChanged', (filter) => this.filter = filter)
    eventBus.$on('clearedCompleted', () => this.clearCompleted())
  },
  beforeDestroy() {
    eventBus.$off('removedTask', (index) => this.removeTask(index))
    eventBus.$off('finishedEdit', (data) => this.finishedEdit(data))
    eventBus.$off('checkAllChanged', (checked) => this.checkAllTasks(checked))
    eventBus.$off('filterChanged', (filter) => this.filter = filter)
    eventBus.$off('clearedCompleted', () => this.clearCompleted())
  },
  computed: {
    remaining() {
      return this.tasks.filter(task => !task.completed).length
    },
    anyRemaining() {
      return this.remaining != 0
    },
    tasksFiltered() {
      if (this.filter == 'all') {
        return this.tasks
      } else if (this.filter == 'inProgress') {
        return this.tasks.filter(task => !task.completed)
      } else if (this.filter == 'completed') {
        return this.tasks.filter(task => task.completed)
      }
    },
    showClearCompletedButton() {
      return this.tasksFiltered.filter(task => task.completed).length > 0
    },
    completedTasks() {
      return this.tasks.filter(task => task.completed).length
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim().length == 0) {
        return
      }

      this.tasks.push({
        id: this.idForTask,
        title: this.newTask,
        completed: false,
        editing: false,
      })

      this.newTask = ''
      this.idForTask++
    },
    finishedEdit(data) {
      this.tasks.splice(data.index, 1, data.task)
    },
    removeTask(index) {
      this.tasks.splice(index, 1)
    },
    checkAllTasks(checked) {
      this.tasks.forEach((task) => task.completed = checked)
    },
    clearCompleted() {
      this.tasks = this.tasks.filter(task => !task.completed)
    }
  }
}

</script>

<style lang="scss">
  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

  .task-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus {
      outline: 0;
    }
  }

  .task {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.2s;
  }

  .remove-task {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: black;
    }
  }

  .task-left {
    display: flex;
    align-items: center;
  }

  .task-label{
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }

  .task-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    &:focus {
      outline: none;
    }
  }

  .completed {
    text-decoration: line-through;
    color: grey;
  }

  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }

  button {
    font-size: 14px;
    background-color: white;
    appearance: none;

    &:hover {
      background: lightgreen;
    }

    &:focus {
      outline: none;
    }
  }

  .active {
    background: lightgreen;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
