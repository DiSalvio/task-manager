<template>
  <div>
    <input type="text" class="task-input" placeholder="Task here" v-model="newTask" @keyup.enter="addTask">
    <transition-group enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <div v-for="(task, index) in tasksFiltered" :key="task.id" class="task">
        <div class="task-left">
          <input type="checkbox" v-model="task.completed">
          <div v-if="!task.editing" @dblclick="editTask(task)" class="task-label" :class="{ completed : task.completed }">
            {{ task.title }}
          </div>
          <input type="text"  v-model="task.title" v-else v-focus @blur="doneEdit(task)" @keyup.enter="doneEdit(task)" @keyup.esc="cancelEdit(task)" class="task-edit">
        </div>
        <div class="remove-task" @click="removeTask(index)">
            &times;
        </div>
      </div>
    </transition-group>

    <div class="extra-container">
      <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTasks"> Check All </label></div>
      <div>{{ remaining }} items left</div>
    </div>

    <div class="extra-container">
      <div>
        <button :class="{ active: filter == 'all' }" @click="filter = 'all'">All</button>
        <button :class="{ active: filter == 'inProgress' }" @click="filter = 'inProgress'">In Progress</button>
        <button :class="{ active: filter == 'completed' }" @click="filter = 'completed'">Completed</button>
      </div>
      <div>
        <transition name="fade">
          <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
        </transition>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'TaskManager',
  data () {
    return {
      newTask: '',
      idForTask: 3,
      beforeEditCache: '',
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
          'completed': false,
          'editing': false,
        },
        {
          'id': 3,
          'title': 'Finish Vue Screencast 3',
          'completed': false,
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
      return this.tasks.filter(task => task.completed).length > 0
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
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
    editTask(task) {
      this.beforeEditCache = task.title
      task.editing = true
    },
    doneEdit(task) {
      if (task.title.trim().length == 0) {
        task.title = this.beforeEditCache
      }
      task.editing = false
    },
    cancelEdit(task) {
      task.editing = false
      task.title = this.beforeEditCache
    },
    removeTask(index) {
      this.tasks.splice(index, 1)
    },
    checkAllTasks(event) {
      this.tasks.forEach((task) => task.completed = event.target.checked)
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
