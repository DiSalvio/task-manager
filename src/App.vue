<template>
  <div id="app" class="container">
    <img src="./assets/logo.png" class="logo">
    <TaskManager/>
  </div>
</template>

<script>
import TaskManager from './components/TaskManager'

export default {
  name: 'App',
  components: {
    TaskManager
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  font-size: 24px;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
