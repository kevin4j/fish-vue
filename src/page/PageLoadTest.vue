<template>
    <PageLoad  :page-num="1" :page-size="20" :api="getBannerList" :params="params"
               v-model:list="list" :options="{noLoading: true}" :loaded-callback="loaded">
        <ul>
            <li v-for="msg in list" v-bind:key="msg.id">
                <p class="title">{{ msg.info}}</p>
            </li>
        </ul>
    </PageLoad>
</template>

<script>
    import PageLoad from "../components/pageload/PageLoad";
    import {getBannerList} from '../mock/api'
    export default {
        name: "PageLoadTest",
        components: {PageLoad},
        data (){
            return {
                getBannerList,
                params: {status:1, withError: true},
                list: [],
            }
        },
        methods: {
            loaded (res, pageLimit){
                console.log(JSON.stringify(pageLimit))
                // if(res){
                //     this.list.push(...res);
                // }
            }
        }
    }
</script>

<style scoped>
    .title{
        line-height: 40px;
    }
</style>