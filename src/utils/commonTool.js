/**
 * 公共工具包
 * @author kevin
 */

import { Toast, Dialog, ImagePreview } from 'vant';

const MOCK_PATH = '/api';

function getMobileSystem() {
  const u = navigator.userAgent.toLowerCase()
  if (u.indexOf('windows phone') > -1) {
    return 'WP'
  } else if (u.indexOf('android') > -1 || u.indexOf('Linux') > -1) {
    return 'Android'
  } else if (u.indexOf('iphone') > -1 || u.indexOf('ipad') > -1) {
    return 'IOS'
  }
  return 'Android'
}

/**
 * 显示加载窗口
 * @param message
 */
function showLoading(message){
  return Toast.loading({
    message: message || '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
}

/**
 * 隐藏加载窗口
 * @param loadingToast
 */
function hideLoading(loadingToast){
  loadingToast && loadingToast.clear();
}

/**
 * 提示信息
 * @param message
 */
function showToast(message){
  return Toast({
    message: message,
    position: 'middle',
    duration: 2000
  });
}

/**
 * 提示
 * @param message
 * @param title
 * @param callback
 * @returns {Promise<DialogAction>}
 */
function showAlert(message, title, callback){
  return Dialog.alert({
    title: title ? title : '',
    message: message,
    confirmButtonText: '确认',
    confirmButtonColor: '#3d36ee',
  }).then(() => {
    callback && callback.call();
  });
}

/**
 * 确认
 * @param message
 * @param title
 * @param confirm_callback
 * @returns {Promise<DialogAction>}
 */
function showConfirm(message, title, confirm_callback, cancel_callback){
  return Dialog.confirm({
    title: title ? title : '',
    message: message,
    confirmButtonText: '确认',
    confirmButtonColor: '#3d36ee',
  }).then(() => {
    confirm_callback && confirm_callback.call();
  }).catch(() => {
    cancel_callback && cancel_callback.call();
  });
}

/**
 * 预览图片
 * @param current 当前图片
 * @param urls  图片集
 */
function previewImages(current, urls, options){
  ImagePreview({images: urls, startPosition:urls.indexOf(current), ...options});
}

/**
 *对象增加key-value键值对
 */
function assignObj(options, key, addValue){
  options = options || {};
  if (!options[key]) {
    options[key] = addValue;
  } else {
    options[key] = Object.assign(addValue, options[key]);
  }
  return options;
}

//生成uuid
function uuid() {
  let s = [];
  let hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  // eslint-disable-next-line no-useless-escape
  return s.join("").replace(/\-/g, "");
}

function getLocalUrlKey(name){
  return getUrlKey(window.location.href, name);
}

function getUrlKey(url, name){
  // eslint-disable-next-line no-sparse-arrays
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null
}

function isDebug(){
  return process.env.VUE_APP_NODE_ENV == 'dev' || getUrlKey(window.location.href, 'debug')=='true' || window.sessionStorage.getItem('debug') == 'true';
}

/**
 * 获取接口完整地址，支持mock
 */
function getApiUrl(url, isMock){
  if (!url.startsWith('http')) {
    return isMock ? MOCK_PATH + url : process.env.VUE_APP_API_BASE_URL + url;
  }
  return url;
}

/**
 * 获取上传接口完整地址，支持mock
 */
function getUploadUrl(url, isMock){
  if (!url.startsWith('http')) {
    return isMock ? MOCK_PATH + url : process.env.VUE_APP_UPLOAD_BASE_URL + url;
  }
  return url;
}

/**
 * 获取图片下载地址
 * @param imgUrl
 * @returns {*}
 */
function getDownloadUrl(imgUrl){
  return imgUrl ? (imgUrl.startsWith('http') ? imgUrl : process.env.VUE_APP_IMG_BASE_URL + imgUrl) : '';
}

function setUserInfo(userInfo){
  window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

function getUserInfo(){
  return JSON.parse(window.localStorage.getItem('userInfo'));
}

function clearUserInfo(userInfo){
  window.localStorage.removeItem('userInfo');
}

function getToken(){
  const userInfo=getUserInfo();
  return userInfo ? userInfo.token : '';
}

function getUserAccount(){
  const userInfo=getUserInfo();
  return userInfo ? userInfo.userAccount : '';
}

export {
  getMobileSystem,
  showLoading,
  hideLoading,
  previewImages,
  assignObj,
  uuid,
  getLocalUrlKey,
  getUrlKey,
  isDebug,
  getApiUrl,
  getUploadUrl,
  getDownloadUrl,
  showToast,
  showAlert,
  showConfirm,
  setUserInfo,
  getUserInfo,
  clearUserInfo,
  getToken,
  getUserAccount,
}
