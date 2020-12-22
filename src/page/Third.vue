<template>
  <div class="content">
    <div>
      主题：{{detail.info}}
    </div>
    <div>
      author: {{ user.name }}
    </div>
    <div style="height:160px;text-align: center; margin: 0 auto">
      <img v-bind:src="detail.imgId"/>
    </div>
    <div>
      <a href="javascript:void(0);" v-on:click="goBack">返回</a>

      <a style="margin-left:20px;" href="javascript:void(0);" v-on:click="gotoUploadImage">上传图片Demo</a>
    </div>
    <p class="sublist_title">子列表(下拉刷新，上拉加载更多)</p>
    <div class="install_content page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore" :bottom-all-loaded="allLoaded">
        <ul class="category_list">
          <li v-for="msg in list" v-bind:key="msg.id">
              <p class="title">{{ msg.info}}</p>
          </li>
        </ul>
      </mt-loadmore>
    </div>



  </div>
</template>

<script>
  import {getAuthor, getBannerList} from '../mock/api'
  import {fetchData} from '../mock/fetch';
  import {getDefaultPagePrams, loadPageData, scrollLoad} from "@/utils/scrollLoad"
  import {showConfirm} from "../utils/commonTool";

  export default {
    name: 'Third',
    data () {
      return {
        user: {},
        detail: this.$route.query,
        list: [],
        allLoaded: false,
        wrapperHeight: 0,
        pageParams: getDefaultPagePrams({pageNum: 1, pageSize: 10}),
      }
    },
    mounted () {
      this.init();
      const that = this;
      setTimeout(function(){
        console.log(that.$refs.wrapper.getBoundingClientRect().top)
        that.wrapperHeight = document.documentElement.clientHeight - that.$refs.wrapper.getBoundingClientRect().top - 10;

        that.loadTop ()
      },200)
    },
    methods: {
      init () {
        return fetchData(getAuthor, {}, {}, (res) => {
          if (res) {
            this.user = res
          }
        })
      },
      loadTop (){
        let that = this;
        that.list = [];
        that.pageParams=getDefaultPagePrams({pageNum: 1, pageSize: 10});
        return that.loadBottom();
      },
      loadBottom (){
        let that = this;
        loadPageData(getBannerList, {

        },{}, function(res, pageLimit){
          console.log(JSON.stringify(pageLimit))
          if(res){
            that.list.push(...res);
          }
          if(pageLimit){
            that.allLoaded = !pageLimit.hasNextPage;
          }
          that.$refs.loadmore.onTopLoaded();
          that.$refs.loadmore.onBottomLoaded();
        }, that.pageParams)
      },
      goBack (){
        showConfirm("确认返回？", "", ()=>{
          window.history.back(-1);
        })
      },
      gotoUploadImage (){
        this.$router.push("/uploadImage");
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
  .page-loadmore-wrapper {
    overflow: scroll;
  }
  .sublist_title{
    background-color: #26ff96;
    text-align: center;
    padding: 5px;
  }
</style>
