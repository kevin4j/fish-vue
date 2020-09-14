import Axios from 'axios'
import qs from 'qs';
import {assignObj, getApiUrl} from '../utils/commonTool';

const TIMEOUT = 14e3;

Axios.defaults.withCredentials = true;

const getMock = (url, isMock) => {
  return (params, options) => requestMock(url, 'get', params, options, isMock);
};

const postMock = (url, isMock) => {
  return (params, options) => {
    let newParams = qs.stringify(params);
    options = assignObj(options, 'headers', {
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return requestMock(url, 'post', newParams, options, isMock);
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
    'Authorization': window.sessionStorage.getItem('token')
  });

  return Axios.request({
    url,
    method,
    params,
    timeout: TIMEOUT,
    ...options
  })
}

export {
  getMock,
  postMock,
  putMock,
  patchMock,
  deleteMock,
  requestMock
}
