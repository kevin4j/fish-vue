import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import './mock/data'

Vue.use(Vuex)
Vue.config.productionTip = false

/* 响应式状态存储，用来缓存页面 */
const store = new Vuex.Store({
  state: {
    cacheComponents: [] // 需要缓存的组件，在具体页面跳转前进行设置
  },
  mutations: {
    setCacheComponents (state, data) {
      state.cacheComponents = data;
    }
  }
})

/* 页面跳转更新title */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
