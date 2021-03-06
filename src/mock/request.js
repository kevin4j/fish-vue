import axios from 'axios'
import {assignObj, getApiUrl, getToken, getUploadUrl} from '../utils/commonTool';
import qs from 'qs';

axios.defaults.timeout=10000;
axios.defaults.withCredentials = true;

const getMock = (url, isMock) => {
  return (params, options) => requestMock(url, 'get', params, options, isMock);
};

const postMock = (url, isMock) => {
  return (params, options) => {
    if((!options.headers || !options.headers['Content-Type']) && !(params instanceof FormData)){
      options = assignObj(options, 'headers', {
        'Content-Type': 'application/x-www-form-urlencoded'
      });
    }
    return requestMock(url, 'post', params, options, isMock);
  }
};

const postMultipartMock = (url, isMock) => {
  return (params, options) => {
    let urlPath = getUploadUrl(url, isMock);
    return axios.post(urlPath, params, options)
  }
};

const deleteMock = (url, isMock) => {
  return (id, params, options) => requestMock(url + '/' + id, 'delete', params, options, isMock);
};

const putMock = (url, isMock) => {
  return (params, options) => requestMock(url, 'put', params, options, isMock);
};

const patchMock = (url, isMock) => {
  return (id, params, options) => requestMock(url + '/' + id, 'patch', params, options, isMock);
};

const requestMock = (url, method, params, options, isMock) => {
  url = getApiUrl(url, isMock);

  // 兼容url扩展   如果api/user -> api/user/1
  if (options && options.expandUrl) {
    url = url + options.expandUrl;
  }

  options = assignObj(options, 'headers', {
    'Authorization': getToken()
  });

  let requestConfig = {
    url,
    method,
    ...options,
  }

  if((method == 'post' || method == 'put' || method == 'patch')){
    if(options.headers && options.headers['Content-Type'] == 'application/x-www-form-urlencoded'){
      requestConfig.data = qs.stringify(params);
    }else{
      requestConfig.data = params;
    }
  }else{
    requestConfig.params = params;
  }
  console.debug(JSON.stringify(requestConfig))
  return axios.request(requestConfig)
}

export {
  getMock,
  postMock,
  postMultipartMock,
  putMock,
  patchMock,
  deleteMock,
  requestMock
}
