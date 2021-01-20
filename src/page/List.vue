<template>
  <div class="content">
    <div>{{title}}</div>

    <div style="margin-bottom: 20px;" v-for="banner in data" v-bind:key="banner.id">
      <router-link :to="{path: '/detail', query: banner}">
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">{{banner.id}} . {{banner.info}}</van-divider>
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
  import {getDownloadUrl} from '../utils/commonTool';
  import {fetchData} from "../mock/fetch";

  export default {
    name: 'List',
    props: {
      title: String
    },
    data () {
      return {
        data: [],
        isHistory: false // 当前是否是缓存页面
      }
    },
    computed: {

    },
    mounted () {
      console.log('msg:'+this.$route.params.title);
      this.init();
    },
    methods: {
      init () {
        let that=this;
        return fetchData(getBannerList, {pageNum: 1, pageSize: 20}, {}, (data) => {
          data.forEach((d) => {
            d.imgUrl = getDownloadUrl(d.imgUrl)
          })
          that.data = that.data.concat(data);
        })
      }
    },
    beforeRouteLeave (to, from, next) {
      if (to.path === '/detail') {
        this.$store.commit('addCacheComponents', {name:'List', next: next});
      } else {
        this.$store.commit('removeCacheComponents', {name:'List', next: next})
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
