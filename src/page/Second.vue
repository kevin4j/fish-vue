<template>
  <div class="content">
    <div>{{title}}</div>

    <div>{{ '加载次数：'+ incrCount }}</div>
    <div style="margin-bottom: 10px;" v-for="banner in data" v-bind:key="banner.id">
      <router-link :to="{path: '/third', query: banner}">
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
  import {scrollLoad} from '../utils/scrollLoad';
  import {getDownloadUrl, showToast} from '../utils/commonTool';

  export default {
    name: 'Second',
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
      console.log('msg:'+this.$route.params.title);
      this.init();
      showToast("监听滚动条事件，自动加载分页数据")
    },
    methods: {
      init () {
        let that=this;
        return scrollLoad(getBannerList, {pageNum: 1, pageSize: 5}, {}, (data) => {
          that.count += 1;
          data.forEach((d) => {
            d.imgUrl = getDownloadUrl(d.imgUrl)
          })
          that.data = that.data.concat(data);
        })
      }
    },
    beforeRouteLeave (to, from, next) {
      console.log(to.path);
      if (to.path === '/third') {
        this.$store.commit('setCacheComponents', ['Second'])
        if (!this.isHistory) {
          this.isHistory = true;
          // 等待store响应，否则会出现第一次不缓存
          setTimeout(next, 100)
        } else {
          next();
        }
      } else {
        this.$store.commit('setCacheComponents', [])
        next();
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
