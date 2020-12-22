<template>
    <div style="display: inline-block">
        <a class="btn_02 wid150 marl15" href="#" v-on:click="open">在线客服</a>
        <mt-popup style="width: 80%;height: 100%;" v-model="currentValue" position="right" closeOnClickModal="true">
            <div style="height: 100%;overflow-y: scroll;">
                <iframe style="height: 100%;width: 100%;" :src="online_service" v-if="loadData"></iframe>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    export default {
        name: "OnlineService",
        data() {
            return {
                currentValue: false,
                online_service: process.env.VUE_APP_ONLINE_SERVICE,
                loadData: false,
            };
        },
        methods: {
            open() {
                this.currentValue = true;
                this.loadData = true;
            },
            hide(){
                this.currentValue = false;
            }
        }
    }
</script>

<style scoped>
    .btn_02{height:45px;line-height:45px;font-size:16px;border-radius:23px;font-weight:500;display:inline-block;text-align:center;}
    .btn_02{background:#e3f8db;border:1px solid #4bd214;color:#4bd214}

    .wid150{width:150px;}
    .marl15{margin-left:15px;}
</style>