import {showToast} from '../utils/commonTool'
import router from "@/router";

const fetchData = async (fetchName, params, options, successCallback, failCallback) => {
  try {
    // 上传文件使用FormData，不能转化成Object
    if(!(params instanceof FormData)){
      const defaultPrams = {};
      params = Object.assign(defaultPrams, params || {});
    }
    const resultData = await fetchName(params, options);
    // console.log(resultData)
    if (resultData && resultData.data) {
      const result = resultData.data;

      if (result.code.toString() === '200' || result.code.toString() === '304') { // 获取到正常数据，回调成功方法
        try{
          successCallback.call(this, result.data, result.pageLimit);
          return {code: "200", text: "success"};
        }catch(e){
          console.error("处理成功回调函数失败："+e);
          showToast("处理失败");
        }
      } else if(result.code == '401'){ //登录失效，跳转到登录页
        // showToast(resultData.data.text);
        setTimeout(() => {
          router.push('/login')
        },2000)
      } else { // 返回异常，回调失败方法/提示异常
        if(failCallback){
          failCallback.call(this, result);
        }else{
          showToast(result.text);
        }
      }
    } else {
      showToast("no response");
    }
  } catch (e) {
    console.error(e);
    showToast("请求失败");
  }
  return {code: "400", text: "fail"};
};

export {
  fetchData
};
