<template>
  <div id="app">
    <img src="./assets/logo.png">

    <!-- routeTransform是页面跳转过渡动画效果，此处 transition 会导致keep-alive缓存的页面返回后定位不准确-->
    <!--    <transition name="routeTransform">-->
    <!-- include 动态缓存页面 --->
    <keep-alive :include="this.$store.state.cacheComponents">
      <router-view></router-view>
    </keep-alive>
    <!--    </transition>-->
    <Loading></Loading>
  </div>
</template>

<script>
  import './assets/css/basic.css';
  import Loading from './components/loading/LoadingOverlay';
  export default {
    name: 'App',
    components: {Loading}
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 10px;
  }

  .routeTransform-enter-active {
    transition: opacity 500ms cubic-bezier(0.55, 0, 0.1, 1)
  }
  .routeTransform-leave-to, .routeTransform-enter{
    opacity: 0
  }
  .routeTransform-leave, .routeTransform-enter-to{
    opacity: 1
  }
</style>
