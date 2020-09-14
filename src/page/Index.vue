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
    <ul class="clearfix category_list">
      <li v-for="msg in list" v-bind:key="msg.id">
        <router-link :to="{name: 'Second', params:{ title: msg.name}}">
          <p class="find_goods_img" v-bind:style="{ lineHeight:imgHeight }"><img v-bind:src="msg.coverImgUrl" alt="" v-bind:style="{ height:imgHeight }"/></p>
          <p class="title">{{ msg.name}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getWindowWidth} from "../utils/window";
  import {getCategoryList} from '../mock/api';
  import {fetchData} from "../mock/fetch";

  export default {
      name: 'Index',
      data () {
        const imgHeight=Math.ceil((getWindowWidth()*0.47)*300/350)+'px';
        return {
          username: 'kevin',
          imgHeight,
          list: [],
          API_BASE_URL: process.env.VUE_APP_API_BASE_URL,
          IMG_BASE_URL: process.env.VUE_APP_IMG_BASE_URL,
          NODE_ENV: process.env.VUE_APP_NODE_ENV
        }
      },
      mounted() {
        this.initCategory();
      },
      methods:{
        initCategory(){
          fetchData(getCategoryList).then((res)=>{
            this.list = res.data;
          })
        }
      }
  }
</script>

<style scoped>
.content div{
  line-height: 30px;
}
.system_info{
  text-align: left;
  padding: 10px;
}
.category_list{margin-top:10px;padding:0px 5px;background:#f4f4f4;}
.category_list li{width:47%;margin-bottom:10px;float:left;padding-left:2%;}
.category_list li a{border-radius:5px;background:#fff;display:block;padding-bottom:5px;}
.category_list li .title{font-size:13px;color:#333;line-height:36px;padding:0 10px;height:36px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;margin-bottom:4px;}
.category_list li .num{font-size:13px;color:#fc7945;line-height:20px;padding:0 10px;}
.find_goods_img{margin-bottom:5px;background:#e6eaed;border-radius:5px 5px 0 0;overflow:hidden;}
.find_goods_img img{width:100%;vertical-align:middle;object-fit:contain;}
</style>
