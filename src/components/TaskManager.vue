<template>
  <div>
    <input type="text" class="task-input" placeholder="Task here" v-model="newTask" @keyup.enter="addTask">
    <transition-group enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <task v-for="task in tasksFiltered" :key="task.id" :task="task" :checkAll="!anyRemaining"></task>
    </transition-group>

    <checkAll></checkAll>
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
      idForTask: 6,
      beforeEditCache: '',
    }
  },
  created() {
    this.$store.dispatch('getTasks')
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining
    },
    tasksFiltered() {
      return this.$store.getters.tasksFiltered
    },
    completed() {
      return this.$store.getters.completed
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim().length == 0) {
        return
      }

      this.$store.dispatch('addTask', {
        id: this.idForTask,
        title: this.newTask,
      })

      this.newTask = ''
      this.idForTask++
    },
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
