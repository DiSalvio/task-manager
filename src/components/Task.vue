<template>
  <div class="task">
    <div class="task-left">
      <input type="checkbox" v-model="completed" @change="doneEdit">
      <div v-if="!editing" @dblclick="editTask()" class="task-label" :class="{ completed : completed }">
        {{ title }}
      </div>
      <input type="text"  v-model="title" v-else v-focus @blur="doneEdit()" @keyup.enter="doneEdit()" @keyup.esc="cancelEdit()" class="task-edit">
    </div>
    <div class="remove-task" @click="removeTask(id)">
        &times;
    </div>
  </div>
</template>

<script>
export default {
  name: 'task',
  props: {
    task: {
      type: Object,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      'id': this.task.id,
      'title': this.task.title,
      'completed': this.task.completed,
      'editing': this.task.editing,
      'beforeEditCache': this.task.beforeEditCache,
    }
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.task.completed
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
    removeTask(id) {
      this.$store.dispatch('removeTask', id)
    },
    editTask() {
      this.beforeEditCache = this.title
      this.editing = true
    },
    doneEdit() {
      if (this.title.trim().length == 0) {
        this.title = this.beforeEditCache
      }
      this.editing = false
      this.$store.dispatch('updateTask', {
        'id': this.id,
        'title': this.title,
        'completed': this.completed,
        'editing': this.editing,
      })
    },
    cancelEdit(task) {
      this.editing = false
      this.title = this.beforeEditCache
    },
  }
}
</script>
