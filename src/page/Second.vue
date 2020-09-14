<template>
  <div class="content">
    <div>{{title}}</div>

    <div>{{ '加载次数：'+ incrCount }}</div>

    <div v-for="banner in data" v-bind:key="banner.id">
      <router-link :to="{path: '/third', query: banner}">
        <div>{{banner.info}}</div>
        <div>
          <img v-bind:src="banner.imgId"/>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {getBannerList} from '../mock/api';
  import {scrollLoad} from '../utils/scrollLoad';
  import {getDownloadUrl} from '../utils/commonTool';

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
        return this.count + 1;
      }
    },
    mounted () {
      console.log('msg:'+this.$route.params.title);
      this.init();
    },
    methods: {
      init () {
        return scrollLoad(getBannerList, {pageNum: 1, pageSize: 2}, (data) => {
          this.count += 1;
          data.forEach((d) => {
            d.imgUrl = getDownloadUrl(d.imgUrl)
          })
          this.data = this.data.concat(data);
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
