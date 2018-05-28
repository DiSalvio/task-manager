<template>
  <div class="task">
    <div class="task-left">
      <input type="checkbox" v-model="completed" @change="doneEdit">
      <div v-if="!editing" @dblclick="editTask()" @click="displayDescription()" class="task-label" :class="{ completed : completed }">
        {{ title }}
      </div>
      <input type="text"  v-model="title" v-else v-focus  @keyup.enter="doneEdit()" @keyup.esc="cancelEdit()" class="task-edit">
      <div v-if="!editing" class="task-label">{{ status }}</div>
      <input type="text" v-model="status" v-else  @keyup.enter="doneEdit()" @keyup.esc="cancelEdit()" class="task-edit">
      <div v-if="!editing" class="task-label">{{ started_on }}</div>
      <input type="date" v-model="started_on" v-else  @keyup.enter="doneEdit()" @keyup.esc="cancelEdit()" class="task-edit">
      <div v-if="!editing" class="task-label">{{ complete_by }}</div>
      <input type="date" v-model="complete_by" v-else  @keyup.enter="doneEdit()" @keyup.esc="cancelEdit()" class="task-edit">
      <div class="remove-task" @click="removeTask(id)">
          &times;
      </div>
    </div>
    <div>
      <div v-if="showDescription && !editing" class="task-description">
        {{ description }}
      </div>
      <input type="textarea" v-model="description" v-if="showDescription && editing" @keyup.enter="doneEdit()" @keyup.esc="cancelEdit()">
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
      'status': this.task.status,
      'description': this.task.description,
      'started_on': this.task.started_on,
      'complete_by': this.task.complete_by,
      'editing': this.task.editing,
      'showDescription': this.task.showDescription,
      'beforeEditCache': this.task.beforeEditCache,
    }
  },
  filters: {
    truncate(description) {
      if (!description) {
        return
      } else if (description.length < 15) {
        return description
      } else {
        return description.slice(0, 15) + "..."
      }
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
      } else {
        this.$store.dispatch('updateTask', {
          'id': this.id,
          'title': this.title,
          'description': this.description,
          'status': this.status,
          'started_on': this.started_on,
          'complete_by': this.complete_by,
          'completed': this.completed,
          'editing': this.editing,
        })
      }
      this.editing = false
    },
    cancelEdit(task) {
      this.editing = false
      this.title = this.beforeEditCache
    },
    displayDescription() {
      this.showDescription = !this.showDescription
    }
  }
}
</script>
