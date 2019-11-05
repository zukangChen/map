<template>
  <div id="app">
    <!-- <HelloWorld></HelloWorld> -->
    <!-- <test></test> -->
    <test2></test2>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue' 
// import test from './components/test.vue'
import test2 from './components/test2.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld,
    // test,
    test2
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
