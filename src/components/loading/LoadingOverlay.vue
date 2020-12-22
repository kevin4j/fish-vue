<template>
  <div class="vld-parent">
    <LoadingOverlay :active.sync="loadVisible" :can-cancel="false" :is-full-page="true"
                    :width="loadStyle.width" :height="loadStyle.height" :color="loadStyle.color"
                    :loader="loadStyle.loader">
    </LoadingOverlay>
    <div class="loading-message_container" v-show="loadVisible">
      <div class="loading-message">
        {{loadMes}}
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Axios from 'axios'
  import LoadingOverlay from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  export default {
    name: 'loading',
    data () {
      return {
        loadStyle: {
          // loading图标模式 spinner/dots/bars
          loader: 'dots',
          width: 35,
          height: 35,
          color: '#007BFF'
        },
        loadVisible: !1,
        loadMes: '',
        method: '',
        mes_loading: '加载数据中',
        mes_waiting: '请求提交中',
        mes_timeout_get: '加载失败,请重新加载数据',
        mes_timeout_post: '提交失败，请重试'
      }
    },
    components: {
      LoadingOverlay
    },
    created () {
      this.initial()
    },
    methods: {
      initial () {
        // axios拦截器设置loading
        Axios.interceptors.request.use(request => {
          this.method = request.method;
          // this.loadMes = this.method ? this.mes_loading : this.mes_waiting;
          this.loadVisible = !request.noLoading;
          return request;
        });

        Axios.interceptors.response.use(response => {
          this.errorTimer && clearTimeout(this.errorTimer);
          setTimeout(() => {
            this.loadVisible = !1;
            this.loadMes = '';
          }, 100);
          return response;
        }, error => {
          this.errorHanding(error)
        })
      },
      errorHanding (e) {
        console.log('loading error:' + e)
        // this.loadMes = this.method === 'get' ? this.mes_timeout_get : this.mes_timeout_post;
        this.errorTimer = setTimeout(() => {
          this.loadVisible = !1;
          this.loadMes = ''
        }, 2000);
        return Promise.reject(e)
      }
    }
  }
</script>
<style>
  .loading-message_container{
    top:0;
    bottom:0;
    left:0;
    right: 0;
    display: flex;
    position: fixed;
    align-items: center;
  }
  .loading-message_container .loading-message{
    text-align: center;
    margin-top: 40px;
    /*color: #e61414;*/
    font-size: 14px;
    width: 100%;
  }
</style>
