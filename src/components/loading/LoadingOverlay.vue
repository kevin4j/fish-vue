<template>
  <div class="vld-parent">

  </div>
</template>
<script type="text/ecmascript-6">
  import Axios from 'axios'
  import {hideLoading, showLoading} from "../../utils/commonTool";
  export default {
    name: 'LoadingOverlay',
    data () {
      return {
        loadingCount: 0,
        loadingToast: null,
        loadMes: '',
        method: '',
        mes_loading: '加载数据中',
        mes_waiting: '请求提交中',
        mes_timeout_get: '加载失败,请重新加载数据',
        mes_timeout_post: '提交失败，请重试'
      }
    },
    components: {

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
          if(!request.noLoading){
            this.loadingToast = showLoading("稍等片刻");
            this.loadingCount ++;
          }
          return request;
        });

        Axios.interceptors.response.use(response => {
          this.errorTimer && clearTimeout(this.errorTimer);
          if(!response.config || !response.config.noLoading){
            this.loadingCount --;
          }

          if(this.loadingCount<=0){
            this.clearLoading();
          }
          return response;
        }, error => {
          this.errorHanding(error)
        })
      },
      errorHanding (e) {
        console.log('loading error:' + e)
        // this.loadMes = this.method === 'get' ? this.mes_timeout_get : this.mes_timeout_post;
        this.errorTimer = setTimeout(() => {
          this.clearLoading();
        }, 2000);
        return Promise.reject(e)
      },
      clearLoading(){
        this.loadingCount = 0;
        hideLoading(this.loadingToast)
        this.loadMes = '';
      }
    }
  }
</script>
<style>

</style>
