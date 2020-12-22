import wx from "weixin-js-sdk"
import {fetchData} from "@/mock/fetch";
import {uploadImg} from "@/mock/api";
import {getDownloadUrl} from "@/utils/commonTool";

/**
 * 片段当前浏览器是否是微信
 * @returns {boolean}
 */
function isWx(){
    const ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}

/**
 * 跳转到微信公众号授权页
 * @param redirectUri
 * @returns {boolean}
 */
function gotoWxGrant(redirectUri){
    const appId = process.env.VUE_APP_WEIXIN_APPID;
    if(!appId){
        alert("未配置公众号appid");
        return false;
    }

    redirectUri = redirectUri ? redirectUri : window.location;
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+encodeURIComponent(redirectUri)+"&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
}


function wxConfig(res, option, readyCallback){
    wx.config({
        debug: option && option.debug ? option.debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp:  res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature,// 必填，签名，见附录1
        jsApiList: option && option.jsApiList ? option.jsApiList : [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function(){
        console.log("微信配置完成");
        readyCallback && readyCallback.call();
    });
}

function wxChooseImage(callback, option){
    wx.chooseImage({
        count: option && option.count ? option.count : 9, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            console.log(JSON.stringify(res))
            const tempFilePaths = res.localIds;
            if (tempFilePaths && tempFilePaths.length > 0) {
                uploadToServer(tempFilePaths, callback);
            }
        },
    });
}

function uploadToServer(tempFilePaths, callback){
    if(tempFilePaths && tempFilePaths.length>0){
        const localId = tempFilePaths.shift();
        wx.uploadImage({
            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                const serverId = res.serverId; // 返回图片的服务器端ID
                console.log("serverId:"+serverId);
                return fetchData(uploadImg, {
                    mediaId: serverId
                },{}, function(res){
                    console.log("上传图片:"+res);
                    callback(res);

                    uploadToServer(tempFilePaths, callback);
                })
            }
        });
    }
}

function wxPreviewImages(current, urls){
    wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: urls // 需要预览的图片http链接列表
    });
}

export {
    wxConfig,
    wxChooseImage,
    wxPreviewImages,
    isWx,
    gotoWxGrant
}