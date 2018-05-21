<template>
  <div class="extra-container">
    <div v-if="anyRemaining" ><label><input type="checkbox" :checked="!anyRemaining" @change="checkAll"> Check All </label></div>
    <div v-if="!anyRemaining" ><label><input type="checkbox" :checked="!anyRemaining" @change="checkAll"> Uncheck All </label></div>
    <button v-if="showClearCompletedButton" @click="clearCompleted">Clear {{ completedTasks }} completed tasks </button>
    <div>{{ remaining }} tasks to complete</div>
  </div>
</template>

<script>
export default {
  name: 'CheckAll',
  computed: {
    remaining() {
      return this.$store.getters.remaining
    },
    anyRemaining() {
      return this.$store.getters.anyRemaining
    },
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton
    },
    completedTasks() {
      return this.$store.getters.completedTasks
    }
  },
  methods: {
    checkAll(event) {
      this.$store.dispatch('checkAll', event)
    },
    clearCompleted() {
      this.$store.dispatch('clearCompleted')
    }
  }
}
</script>
