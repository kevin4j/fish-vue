<template>
  <div class="content">
    <div>
      主题：{{detail.info}}
    </div>
    <div class="img_div">
      <img v-bind:src="detail.imgId"/>
    </div>
    <div>
      <a href="javascript:void(0);" v-on:click="goBack">返回</a>
    </div>
    <p class="sublist_title">子列表(下拉刷新，上拉加载更多)</p>
    <div class="page-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <ul class="category_list">
            <li v-for="msg in list" v-bind:key="msg.id">
                <p class="title">{{ msg.info}}</p>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
  import {getBannerList} from '../mock/api'
  import {getDefaultPagePrams, loadPageData, pageNumName, pageSizeName} from "../utils/scrollLoad"
  import {showConfirm} from "../utils/commonTool";

  export default {
    name: 'BannerDetail',
    data () {
      return {
        user: {},
        detail: this.$route.query,
        list: [],
        loading: false,
        finished: false,
        wrapperHeight: 0,
        pageParams: getDefaultPagePrams({[pageNumName]: 1, [pageSizeName]: 20}),
      }
    },
    mounted () {
      const that = this;
      setTimeout(function(){
        console.log(that.$refs.wrapper.getBoundingClientRect().top)
        that.wrapperHeight = document.documentElement.clientHeight - that.$refs.wrapper.getBoundingClientRect().top - 10;

        that.onRefresh ()
      },200)
    },
    methods: {
      onRefresh (){
        let that = this;
        that.list = [];
        that.pageParams=getDefaultPagePrams({[pageNumName]: 1, [pageSizeName]: 20});
        return that.onLoad();
      },
      onLoad (){
        let that = this;
        loadPageData(getBannerList, {

        },{noLoading: true}, function(res, pageLimit){
          console.log(JSON.stringify(pageLimit))
          if(res){
            that.list.push(...res);
          }
          if(pageLimit){
            that.finished = !pageLimit.hasNextPage;
          }
          that.loading=false;
        },null, that.pageParams)
      },
      goBack (){
        showConfirm("确认返回？", "", ()=>{
          window.history.back(-1);
        }, ()=>{
          console.log("cancel")
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
  .content .img_div{
    height:160px;
    margin: 0 auto
  }
  .page-wrapper {
    overflow: scroll;
  }
  .sublist_title{
    background-color: #26ff96;
    text-align: center;
    padding: 5px;
  }
</style>
