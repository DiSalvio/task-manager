<template>
  <div class="extra-container">
    <div>
      <button :class="{ active: filter == 'all' }" @click="changeFilter('all')">All</button>
      <button :class="{ active: filter == 'inProgress' }" @click="changeFilter('inProgress')">In Progress</button>
      <button :class="{ active: filter == 'completed' }" @click="changeFilter('completed')">Completed</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskFilters',
  computed: {
    filter() {
      return this.$store.state.filter
    }
  },
  methods: {
    changeFilter(filter) {
      this.$store.dispatch('updateFilter', filter)
    }
  }
}
</script>
