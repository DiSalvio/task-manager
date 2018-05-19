<template>
  <div class="extra-container">
    <div v-if="anyRemaining" ><label><input type="checkbox" :checked="!anyRemaining" @change="allChecked"> Check All </label></div>
    <div v-if="!anyRemaining" ><label><input type="checkbox" :checked="!anyRemaining" @change="allChecked"> Uncheck All </label></div>
    <button v-if="showClearCompletedButton" @click="clearCompleted">Clear {{ completedTasks }} completed tasks </button>
    <div>{{ remaining }} tasks to complete</div>
  </div>
</template>

<script>
export default {
  name: 'CheckAll',
  props: {
    remaining: {
      type: Number,
      required: true,
    },
    anyRemaining: {
      type: Boolean,
      required: true,
    },
    showClearCompletedButton: {
      type: Boolean,
      required: true,
    },
    completedTasks: {
      type: Number,
      required: true,
    }
  },
  methods: {
    allChecked() {
      eventBus.$emit('checkAllChanged', this.anyRemaining)
    },
    clearCompleted() {
      eventBus.$emit("clearedCompleted")
    }
  }
}
</script>
