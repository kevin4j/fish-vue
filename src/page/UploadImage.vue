import Compressor from "compressorjs";
<template>
    <div>
        <p class="type_title">1. 使用vant上传组件自定义按钮和图片列表，在微信公众号中可选择微信组件（自带压缩，需要配置微信接口和实现从微信服务器下载图片）</p>
        <div class="img_list">
            <div v-for="(fileUrl,index) in files" v-bind:key="index" class="img_div">
                <img class="img" :src="fileUrl" alt="" v-on:click="previewImages(fileUrl)"/>
                <img class="img_close" src="@/assets/images/guanbi.png" v-on:click="deleteImage(index)"/>
            </div>
        </div>

        <div v-on:click="onUpload" v-if="!isWx">
            <van-uploader :after-read="uploadFile" :before-read="beforeUpload" multiple :max-count="maxImgCount-files.length">
                <div class="upload"><img class="icon" src="@/assets/images/icon_img.png"/>上传图片</div>
            </van-uploader>
        </div>

        <a class="upload" v-on:click="chooseImage" v-if="isWx"><img class="icon" src="@/assets/images/icon_img.png" alt=""/>上传图片</a>

        <p class="type_title">2. 使用vant上传组件默认样式，部分安卓机型不支持多选，且性能差的机型无法压缩图片</p>
        <div class="upload_div" v-if="!isWx">
            <van-uploader  :before-read="beforeUpload" :after-read="uploadFile2" v-model="files2"  multiple :max-count="maxImgCount"/>
        </div>

        <p class="type_title">3. 使用vant上传组件预览图片</p>
        <div class="upload_div">
            <van-uploader v-model="files3" :deletable="false" :show-upload="false"/>
        </div>
    </div>
</template>

<script>
    import {fetchData} from "../mock/fetch";
    import {getDownloadUrl, showToast, getMobileSystem, previewImages} from "../utils/commonTool";
    import {isWx, wxChooseImage, wxConfig, wxPreviewImages} from "../utils/wxUtil"
    import Compressor from 'compressorjs';
    import {getBannerList, getWxPrams, uploadFile} from "../mock/api";

    export default {
        name: "UploadImage",
        components: {

        },
        data (){
            return {
                maxImgCount: 9,
                isWx: false,
                content: '',
                files:[],
                files2:[],
                files3:[],
                uploading: false,
                autoCompress: 1024 * 1024,
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
            init (){
                const that=this;
                fetchData(getBannerList, {
                    pageNum: 1,
                    pageSize: 3
                },{}, function(res){
                    console.log(JSON.stringify(res))
                    if(res){
                        res.forEach((banner)=>{
                            that.files3.push({url: banner.imgId});
                        })
                    }
                })
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
                if(this.files.length>=this.maxImgCount){
                    showToast("最多只能上传"+this.maxImgCount+"张图片");
                    // 阻止时间冒泡
                    event.preventDefault();
                    return false;
                }
            },
            uploadFile (files){
                if(!(files instanceof Array)){
                    files = [files];
                }
                files.forEach(file=> {
                    console.log(file.file.type);
                    let that = this;
                    let formData = new FormData();
                    formData.append("file", file.file);
                    fetchData(uploadFile, formData, {}, function (res) {
                        console.log(JSON.stringify(res))
                        if (res) {
                            res.fileIdList.forEach(url => {
                                that.files.push(getDownloadUrl(url));
                            })
                        }
                    })
                });
            },
            uploadFile2 (files){
                if(!(files instanceof Array)){
                    files = [files];
                }
                files.forEach(file=>{
                    console.log("开始上传："+file);
                    file.status = 'uploading';
                    file.message = '上传中...';

                    let that = this;
                    let formData = new FormData();
                    console.log(file.file.size)
                    formData.append("file", file.file);
                    fetchData(uploadFile, formData,{}, function(res){
                        console.log(JSON.stringify(res))
                        file.status = 'done';
                        file.message = '';
                    })
                })
            },
            beforeUpload(files) {
                if(!(files instanceof Array)){
                    files = [files];
                }
                let compressedFiles=[]
                let that = this;

                let check = true;
                files.forEach((newFile)=>{
                    // console.log("上传前"+newFile);
                    if (!newFile.type.startsWith('image')) {
                        showToast('请上传图片');
                        check=false;
                    }
                });

                if(!check){
                    return false;
                }

                return new Promise( (resolve, reject) => {
                    files.forEach((newFile)=>{
                        console.log("压缩前:"+newFile.size)
                        if (that.canCompress && newFile && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0 && this.autoCompress < newFile.size) {
                            new Compressor(newFile, {
                                quality: 0.4,
                                success(file) {
                                    console.log("压缩后:"+file.size)
                                    if(file.size == 71725){//手机性能差导致实际压缩失败，变成一张黑色背景图片，后续上传图片则不再压缩
                                        // showToast('压缩图片失败，请重新上传');
                                        // reject();

                                        console.log('手机性能差，压缩图片失败，使用原图');
                                        compressedFiles.push(newFile)
                                    }else{
                                        compressedFiles.push(new window.File([file], newFile.name, {type: newFile.type}));
                                    }
                                    if(compressedFiles.length == files.length){
                                        resolve(compressedFiles);
                                    }
                                },
                                error(err) {
                                    console.log('压缩图片失败:'+err.message+",使用原图");
                                    // showToast('压缩图片失败:'+err.message);
                                    // reject();
                                    compressedFiles.push(newFile)
                                },
                            })
                        }else{
                            compressedFiles.push(newFile)
                            if(compressedFiles.length == files.length){
                                resolve(compressedFiles);
                            }
                        }
                    });
                });
            },
            async compress(newFile){
                const result= await new Promise((resolve, reject) => {
                    new Compressor(newFile, {
                        quality: 0.4,
                        success(file) {
                            console.log("压缩后:"+file.size)
                            if(file.size == 71725){//手机性能差导致实际压缩失败，变成一张黑色背景图片，后续上传图片则不再压缩
                                showToast('压缩图片失败，请重新上传');
                                reject();
                                return false;
                            }
                            resolve(file);
                        },
                        error(err) {
                            console.log(err.message);
                            showToast('压缩图片失败:'+err.message);
                            reject();
                        },
                    })
                });
                console.log("压缩后结果："+result);
                return result;
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
                if(isWx()){
                    wxPreviewImages(url, this.files);
                }else{
                    previewImages(url, this.files);
                }
            },
            deleteImage(index){
                this.files.splice(index, 1);
            }
        }
    }
</script>

<style scoped>
    .type_title{
        line-height: 30px;
        background-color: #60b0e4;
        color: #ffffff;
        text-align: left;
        padding: 0px 10px;
    }
    .upload_div{
        margin-top: 20px;
    }
    .img_list{
        margin-top: 30px;
    }
    .img_div{
        position: relative;
        display: inline-block;
        margin-right: 10px;
        margin-top: 10px;
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