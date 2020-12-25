<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->

  <router-view v-slot="{ Component }">
    <transition name="routeTransform">
      <keep-alive  :include="this.$store.state.cacheComponents">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <LoadingOverlay></LoadingOverlay>
</template>

<script>
  import './assets/css/basic.css';
  import LoadingOverlay from "./components/loading/LoadingOverlay";
  export default {
    name: 'App',
    components: {
      LoadingOverlay

    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
