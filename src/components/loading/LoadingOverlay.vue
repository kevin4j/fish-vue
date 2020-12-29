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
          }
          return request;
        });

        Axios.interceptors.response.use(response => {
          this.errorTimer && clearTimeout(this.errorTimer);
          hideLoading(this.loadingToast)
          this.loadMes = '';
          return response;
        }, error => {
          this.errorHanding(error)
        })
      },
      errorHanding (e) {
        console.log('loading error:' + e)
        // this.loadMes = this.method === 'get' ? this.mes_timeout_get : this.mes_timeout_post;
        this.errorTimer = setTimeout(() => {
          hideLoading(this.loadingToast)
          this.loadMes = ''
        }, 2000);
        return Promise.reject(e)
      }
    }
  }
</script>
<style>

</style>
