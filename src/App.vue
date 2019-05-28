<template>
  <v-app id="app"><Page /></v-app>
</template>

<script>
import Page from './components/Page.vue'

export default {
  name: 'app',
  components: { Page }
}
</script>

<style lang="scss">
html {
  margin: 0;
  font-size: 75%;
  box-sizing: border-box;

  @media screen and (min-height: 480px) {
    font-size: 100%;
  }
}
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
