<template>
  <div class="content">
    <div>简单滚动加载，不支持下拉刷新</div>

    <div>{{ '加载次数：'+ incrCount }}</div>
    <div style="margin-bottom: 10px;" v-for="banner in data" v-bind:key="banner.id">
      <router-link :to="{path: '/detail', query: banner}">
        <div>{{banner.info}}</div>
        <div>
          <img v-bind:src="banner.imgId"/>
        </div>
      </router-link>
    </div>
    <div class="noData_box" v-if="data==null || data.length==0">
      <img class="noData_img" src="@/assets/images/nodata.png" alt="">
      <p class="noData_t">暂无数据信息</p>
    </div>
  </div>
</template>

<script>
  import {getBannerList} from '../mock/api';
  import {scrollLoad,pageNumName, pageSizeName} from '../utils/scrollLoad';
  import {getDownloadUrl, showAlert} from '../utils/commonTool';

  export default {
    name: 'ScrollLoadTest',
    props: {
      title: String
    },
    data () {
      return {
        count: 0,
        data: [],
        isHistory: false // 当前是否是缓存页面
      }
    },
    computed: {
      incrCount () {
        return this.count + '次';
      }
    },
    mounted () {
      showAlert("监听滚动条事件，自动加载分页数据")
      this.init();

    },
    methods: {
      init () {
        let that=this;
        return scrollLoad(getBannerList, {[pageNumName]: 1, [pageSizeName]: 5}, {}, (data) => {
          that.count += 1;
          data.forEach((d) => {
            d.imgUrl = getDownloadUrl(d.imgUrl)
          })
          that.data = that.data.concat(data);
        })
      }
    },
    beforeRouteLeave (to, from, next) {
      if (to.path === '/detail') {
        this.$store.commit('addCacheComponents', {name:'ScrollLoadTest', next: next});
      } else {
        this.$store.commit('removeCacheComponents', {name:'ScrollLoadTest', next: next})
      }
    }
  }
</script>

<style scoped>
.content div{
  line-height: 40px;
}
.content div img{
  max-width: 100%;
  max-height: 100%;
}
</style>
