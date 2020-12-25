<template>
    <div style="display: inline-block">
        <a class="btn_02 wid150 marl15" href="javascript:void(0);" v-on:click="showPopup">{{btnName ? btnName : '在线客服'}}</a>
        <van-popup style="width: 80%;height: 100%;" v-model:show="show" position="right">
            <div style="height: 100%;overflow-y: scroll;">
                <iframe style="height: 100%;width: 100%;border: 0px;" :src="online_service" v-if="loadData"></iframe>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import { ref, toRefs } from 'vue';
    export default {
        props: {
            btnName: String
        },
        setup(props){
            const { btnName } = toRefs(props)
            console.log(btnName.value);
            const show = ref(false);
            const loadData = ref(false);
            const online_service = ref(process.env.VUE_APP_ONLINE_SERVICE);
            const showPopup = () => {
                show.value = true;
                loadData.value = true;
            };
            return {
                show,
                loadData,
                online_service,
                showPopup,
            };
        }
    }
</script>

<style scoped>
    .btn_02{height:45px;line-height:45px;font-size:16px;border-radius:23px;font-weight:500;display:inline-block;text-align:center;}
    .btn_02{background:#e3f8db;border:1px solid #4bd214;color:#4bd214}

    .wid150{width:150px;}
    .marl15{margin-left:15px;}
</style>