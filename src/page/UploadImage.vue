import Compressor from "compressorjs";
<template>
    <div>
        <div class="textarea"><textarea class="textarea_con" v-on:click="inputFocus" maxlength="200" rows="5" v-model="content" placeholder="如在有其他意见或建议，告诉我们吧。"></textarea></div>

        <div class="img_list">
            <div v-for="(fileUrl,index) in files" v-bind:key="index" class="img_div">
                <img class="img" :src="fileUrl" alt="" v-on:click="previewImages(fileUrl)"/>
                <img class="img_close" src="@/assets/images/guanbi.png" v-on:click="deleteImage(index)"/>
            </div>
        </div>

        <a class="upload" v-on:click="chooseImage" v-if="isWx"><img class="icon" src="@/assets/images/icon_img.png" alt=""/>上传图片</a>
        <div v-on:click="onUpload" v-if="!isWx">
            <file-upload
                    class="upload"
                    ref="upload"
                    :post-action=uploadUrl
                    @input-filter="inputFilter"
                    @input-file="inputFile"
                    extensions="gif,jpg,jpeg,png,webp"
                    :size="1024 * 1024 * 10"
            >
                上传图片
            </file-upload>
        </div>
    </div>
</template>

<script>
    import {fetchData} from "@/mock/fetch";
    import {getWxPrams} from "@/mock/api";
    import {getDownloadUrl, showToast, getMobileSystem} from "@/utils/commonTool";
    import {isWx, wxChooseImage, wxConfig, wxPreviewImages} from "@/utils/wxUtil"
    import FileUpload  from 'vue-upload-component'
    import Compressor from 'compressorjs';
    import LoadingOverlay from 'vue-loading-overlay';
    import {getUploadUrl} from "../utils/commonTool";

    export default {
        name: "UploadImage",
        components: {
            FileUpload,
            LoadingOverlay
        },
        data (){
            return {
                isWx: isWx(),
                uploadUrl: getUploadUrl('/uploadFile.do?resultFlag=2', true),
                content: '',
                files:[],
                uploading: false,
                autoCompress: 1024 * 1024,
                loadStyle: {
                    // loading图标模式 spinner/dots/bars
                    loader: 'dots',
                    width: 35,
                    height: 35,
                    color: '#007BFF'
                },
                loadVisible: false,
                errorTimer: null,
                canCompress: true, //支持压缩
            }
        },
        mounted () {
            if(this.isWx){
                this.initWxApi();
            }
            this.init();
        },
        methods: {
            inputFocus (e){
                if(getMobileSystem() != 'IOS'){//安卓机中键盘会遮住输入框
                    setTimeout(()=>{
                        document.getElementsByClassName('textarea_con')[0].scrollIntoView();
                    },200)
                }
            },
            init (){

            },
            initWxApi (){
                fetchData(getWxPrams, {

                },{}, function(res){
                    console.log(JSON.stringify(res))
                    if(res){
                        wxConfig(res, {"debug":false, "jsApiList": ['chooseImage','uploadImage','previewImage']})
                    }
                })

            },
            onUpload (event){
                if(this.files.length>=3){
                    showToast("最多只能上传3张图片");
                    // 阻止时间冒泡
                    event.preventDefault();
                    return false;
                }
            },
            inputFilter(newFile, oldFile, prevent) {
                if(newFile && this.files.length>=3){
                    showToast("最多只能上传3张图片");
                    return prevent();
                }

                // Automatic compression
                // 自动压缩
                let that = this;
                if (that.canCompress && newFile && newFile.file && newFile.type.substr(0, 6) === 'image/' && !newFile.isCompressed && this.autoCompress > 0 && this.autoCompress < newFile.size) {
                    // 防止异步上传，压缩过程中增加异常信息，后面捕获异常形成阻塞
                    newFile.error = 'compressing'
                    that.loadVisible=true;
                    that.errorTimer = setTimeout(() => {
                        this.loadVisible = false;
                    }, 60000);
                    console.log("压缩前:"+newFile.file.size)
                    new Compressor(newFile.file, {
                        quality: 0.4,
                        success(file) {
                            console.log("压缩后:"+file.size)
                            if(file.size == 71725){//手机性能差导致实际压缩失败，变成一张黑色背景图片，后续上传图片则不再压缩
                                that.canCompress = false;
                                that.$refs.upload.update(newFile, { error: '压缩图片失败，请重新上传' });
                                return false;
                            }
                            that.$refs.upload.update(newFile, { error: '', file, size: file.size, type: file.type, isCompressed: true })
                        },
                        error(err) {
                            console.log(err.message);
                            that.$refs.upload.update(newFile, { error: err.message || 'compress' })
                        },
                    })
                }
            },
            inputFile (newFile, oldFile){ //文件发生变更事件
                //直接上传
                if(newFile){
                    // console.log("file变更："+this.$refs.upload.active + "," + newFile.active)
                    if(newFile.error){
                        // 在压缩过程中，阻止上传但不报错
                        if(newFile.error!='compressing'){
                            console.log("上传图片报错："+newFile.error);
                            showToast("上传失败，请重新上传")
                            this.completeUpload(newFile);
                        }
                        return false;
                    }

                    if(!this.uploading){
                        console.log("开始上传");
                        if(!this.loadVisible){
                            this.loadVisible=true;
                        }
                        this.$refs.upload.active = true;
                        this.uploading=true;
                    }else{
                        if(newFile && !newFile.active){
                            console.log("上传结束：newFile.active-"+newFile.active+",newFile.success-"+newFile.success)
                            if(newFile.success){
                                const response = JSON.parse(newFile.response);
                                if(response && response.code == '200'){
                                    console.log("上传成功:"+JSON.stringify(response.data.fileIdList));
                                    response.data.fileIdList.forEach(url=>{
                                        this.files.push(getDownloadUrl(url));
                                    })
                                }
                            }else{
                                console.log("上传失败："+JSON.stringify(newFile));
                                showToast("上传失败，请重新上传")
                            }
                            this.completeUpload(newFile)
                        }
                    }
                }
            },
            completeUpload (newFile){
                this.loadVisible=false;
                this.errorTimer && clearTimeout(this.errorTimer);
                this.uploading=false;
                //上传完成后删除缓存的文件
                this.$refs.upload.remove(newFile)
            },
            chooseImage (){
                console.log("选择图片")
                if(this.files.length>=3){
                    showToast("最多只能上传3张图片");
                    return false;
                }
                let that=this;
                wxChooseImage((res)=>{
                    that.files.push(getDownloadUrl(res));
                }, {
                    count: 3-that.files.length
                })
            },
            previewImages (url){
                wxPreviewImages(url, this.files);
            },
            deleteImage(index){
                this.files.splice(index, 1);
            }
        }
    }
</script>

<style scoped>
    .img_list{
        margin-top: 30px;
    }
    .img_div{
        position: relative;
        display: inline-block;
        margin-right: 10px;
    }
    .img{width:80px;height:80px;}
    .img_close{
        position:absolute;
        top:-8px;
        right:-8px;
        width:16px;
        height:16px;
        z-index:1;
    }
    .textarea{margin:10px;padding:10px;border:1px solid #b3b3b3;border-radius:5px;}
    .textarea_con{width:100%;font-size:13px;line-height:20px;}
    .upload{
        border:1px solid #b3b3b3;
        line-height:26px;
        color:#b3b3b3;
        font-size:15px;
        text-align:center;
        padding:10px 0;
        display:block;
        margin: 20px auto;
        border-radius: 10px;
        width: 200px;
    }
    .upload .icon{width:26px;height:26px;margin-right:15px;}

</style>