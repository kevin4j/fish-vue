<template>
  <div class="content">
    <div>Hello {{ username }}</div>
    <div class="system_info">
      <p>当前环境：{{NODE_ENV}}</p>
      <p>API_BASE_URL:</p>
      <p>{{API_BASE_URL}}</p>
      <p>IMG_BASE_URL:</p>
      <p>{{IMG_BASE_URL}}</p>
    </div>
    <div class="category_div">
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">组件Demo</van-divider>
      <ul class="category_list">
        <li>
          <router-link :to="{name: 'PageLoadTest'}">
            <p class="find_goods_img" v-bind:style="{ lineHeight:imgHeight }"><img v-bind:src="pageLoadImgUrl" alt="" v-bind:style="{ height:imgHeight }"/></p>
            <p class="title">分页加载组件</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'ScrollLoadTest'}">
            <p class="find_goods_img" v-bind:style="{ lineHeight:imgHeight }"><img v-bind:src="scrollLoadImgUrl" alt="" v-bind:style="{ height:imgHeight }"/></p>
            <p class="title">简单滚动加载组件</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'UploadImage'}">
            <p class="find_goods_img" v-bind:style="{ lineHeight:imgHeight }"><img v-bind:src="uploadImgUrl" alt="" v-bind:style="{ height:imgHeight }"/></p>
            <p class="title">上传图片组件</p>
          </router-link>
        </li>
      </ul>

      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">测试数据</van-divider>
      <ul class="category_list">
        <li v-for="msg in list" v-bind:key="msg.id">
          <router-link :to="{name: 'BannerList', params:{ title: msg.name}}">
            <p class="find_goods_img" v-bind:style="{ lineHeight:imgHeight }"><img v-bind:src="msg.coverImgUrl" alt="" v-bind:style="{ height:imgHeight }"/></p>
            <p class="title">{{ msg.name}}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="btn_div">
      <OnlineService btnName="咨询作者"></OnlineService>
    </div>
  </div>
</template>

<script>
  import {getWindowWidth} from "../utils/window";
  import {getAuthor, getCategoryList} from '../mock/api';
  import {fetchData} from "../mock/fetch";
  import {getRandomImgTextUrl} from "../mock/data/image";

  export default {
      name: 'Index',
      components: {
      },
      data () {
        const imgHeight=Math.ceil((getWindowWidth()*0.47)*300/350)+'px';
        return {
          username: '',
          imgHeight,
          list: [],
          API_BASE_URL: process.env.VUE_APP_API_BASE_URL,
          IMG_BASE_URL: process.env.VUE_APP_IMG_BASE_URL,
          NODE_ENV: process.env.VUE_APP_NODE_ENV,
          pageLoadImgUrl : getRandomImgTextUrl('Page'),
          scrollLoadImgUrl : getRandomImgTextUrl('Scroll'),
          uploadImgUrl : getRandomImgTextUrl('Upload'),

        }
      },
      mounted() {
        this.initAuthor();
        this.initCategory();
      },
      methods:{
        initAuthor () {
          return fetchData(getAuthor, {}, {}, (res) => {
            if (res) {
              this.username = res.name;
            }
          })
        },
        initCategory(){
          let that = this;
          fetchData(getCategoryList, {}, {}, (res)=>{
            that.list = res;
          })
        }
      }
  }
</script>

<style scoped>
.system_info p{
  line-height: 30px;
}
.system_info{
  text-align: left;
  padding: 10px;
}
.category_div{margin-bottom: 65px;}
.category_list{margin-top:10px;background:#f4f4f4;}
.category_list li{width:48%;margin-bottom:10px;display: inline-block;padding:0 1%;}
.category_list li a{border-radius:5px;background:#fff;display:block;padding-bottom:5px;}
.category_list li .title{font-size:13px;color:#333;line-height:36px;padding:0 10px;height:36px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;margin-bottom:4px;}
.category_list li .num{font-size:13px;color:#fc7945;line-height:20px;padding:0 10px;}
.find_goods_img{margin-bottom:5px;background:#e6eaed;border-radius:5px 5px 0 0;overflow:hidden;}
.find_goods_img img{width:100%;vertical-align:middle;object-fit:contain;}

.btn_div {
  padding: 10px 15px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  text-align: center;
}
</style>
