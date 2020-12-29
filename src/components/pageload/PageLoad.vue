<template>
    <div class="page-wrapper" ref="wrapper" :style="{ height: defaultWrapperHeight }">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <van-list v-model:loading="loading" :finished="finished" :finished-text="defaultFinishedText" @load="onLoad"
                      v-model:error="error" error-text="请求失败，点击重新加载">
                <slot></slot>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    import {getDefaultPagePrams, loadPageData} from "../../utils/scrollLoad";
    import {reactive, ref, toRefs, onMounted } from "vue";
    import {showToast} from "../../utils/commonTool";

    export default {
        name: "PageLoad",
        props: {
            list: Array, //数据列表，必须
            api: Function, //axios请求接口，必须
            params: Object, //请求参数
            loadedCallback: Function,  //请求回调，必须
            wrapperHeight: String, //列表数据包装区域高度
            pageNum: Number, //分页页码
            pageSize: Number, //分页页记录数
            loadingToast: Boolean, //请求过程中是否显示loading弹窗提示
            finishedText: String, //分页全部加载完后提示
            options: Object,
        },
        setup(props){
            console.log(props);
            let pageParams = reactive(getDefaultPagePrams({pageNum: props.pageNum, pageSize: props.pageSize}));
            let finished = ref(false);
            let loading = ref(false);
            let error = ref(false);
            const wrapper = ref(null);
            let {list, wrapperHeight, finishedText} = toRefs(props);
            const defaultFinishedText =  ref(finishedText == undefined ? "没有更多了" : finishedText.value);
            const defaultWrapperHeight = ref(wrapperHeight ? wrapperHeight.value : '');

            // 需要等待页面渲染后计算列表区域高度
            onMounted(()=>{
                setTimeout(function(){
                    console.log("计算列表默认高度："+(defaultWrapperHeight.value ? defaultWrapperHeight.value : document.documentElement.clientHeight - wrapper.value.getBoundingClientRect().top)+'px');
                    defaultWrapperHeight.value= defaultWrapperHeight.value ? defaultWrapperHeight.value : (document.documentElement.clientHeight - wrapper.value.getBoundingClientRect().top)+'px';
                    onRefresh();
                },100)

            })

            // 下拉刷新数据
            const onRefresh = function(){
                console.log("refresh")
                list.value.splice(0,list.value.length);
                pageParams=reactive(getDefaultPagePrams({pageNum: props.pageNum, pageSize: props.pageSize}));
                onLoad();
            }

            // 上拉加载更多数据
            const onLoad = function(){
                console.log("load...")
                loadPageData(props.api, props.params || {}, props.options, function(res, pageLimit){
                    if(pageLimit){
                        finished.value = !pageLimit.hasNextPage;
                    }
                    loading.value=false;
                    props.loadedCallback && props.loadedCallback(res, pageLimit);
                }, function(res){
                    loading.value=false;
                    error.value = true;
                    showToast(res.text || '请求异常');
                },pageParams)
            }
            return {
                wrapper,
                defaultWrapperHeight,
                defaultFinishedText,
                pageParams,
                finished,
                loading,
                error,
                onRefresh,
                onLoad
            }
        }
    }
</script>

<style scoped>
    .page-wrapper {
        overflow: scroll;
    }
</style>