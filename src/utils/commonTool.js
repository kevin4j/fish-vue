/**
 * 公共工具包
 * @author kevin
 */


/**
 *对象增加key-value键值对
 */
export const assignObj = (options, key, addValue) => {
  options = options || {};
  if (!options[key]) {
    options[key] = addValue;
  } else {
    options[key] = Object.assign(addValue, options[key]);
  }
  return options;
}

/**
 * 获取接口完整地址，支持mock
 */
const MOCK_PATH = '/api';
export const getApiUrl = (url, isMock) => {
  if (url.startsWith('http') !== 0) {
    return isMock ? MOCK_PATH + url : process.env.VUE_APP_API_BASE_URL + url;
  }
  return url;
}

/**
 * 获取图片下载地址
 * @param imgUrl
 * @returns {*}
 */
export const getDownloadUrl = (imgUrl) => {
  return imgUrl ? (imgUrl.startsWith('http') ? imgUrl : process.env.VUE_APP_IMG_BASE_URL + imgUrl) : '';
}
