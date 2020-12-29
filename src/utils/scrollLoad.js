/**
 * 滑动滚动条分页加载数据
 * @author kevin
 */

import {fetchData} from '../mock/fetch'
import {getWindowHeight, getScrollTop, getDocumentHeight} from "./window";

const pageNumName="pageNum";
const pageSizeName="pageSize";
const currentPageName="pageNum";
const pageLengthName="pageSize";
const totalName="total";

const getDefaultPagePrams = (params)=>{
  return {
    isScrollLoading: false,
    [pageNumName]: params[pageNumName] || 1,
    [pageSizeName]: params[pageSizeName] || 10,
    hasNextPage: true
  }
}

/**
 * 定义滑动滚动条加载实例， 初始化第一页数据和滚动条监听事件
 * @param fetchName 接口名
 * @param params 参数
 * @param successCallback 加载数据成功后回调
 * @param failCallback 加载数据失败后回调
 * @param options 可选项，如扩展url（expandUrl）、配置Axios请求可选项等
 */
const scrollLoad = (fetchName, params, options, successCallback, failCallback) => {
  // 优先自定义分页
  let pageParams = getDefaultPagePrams(params);

  // 监听滚动条事件加载分页事件
  window.addEventListener('scroll', function () {
    scrollLoadData(fetchName, params, options, successCallback, failCallback, pageParams);
  });

  // 默认初始化加载第一页
  return loadPageData(fetchName, params, options, successCallback, failCallback, pageParams);
}

/**
 * 根据滚动条高度加载数据
 * @param fetchName
 * @param params
 * @param callback
 * @param pageParams
 * @param options
 */
const scrollLoadData = (fetchName, params, options, successCallback, failCallback, pageParams) => {
  if (pageParams.hasNextPage && !pageParams.isScrollLoading) {
    if (!pageParams.isScrollLoading) {
      // 浏览器的高度加上滚动条的高度
      const windowHeight = getWindowHeight();
      const scrollTop = getScrollTop();
      const documentHeight = getDocumentHeight();
      const totalHeight = windowHeight + scrollTop + 10;
      // console.log('窗口高度：' + windowHeight + '，滚动条高度：' + scrollTop + '，totalHeight：' + totalHeight + '，文档高度：' + documentHeight);
      // 当文档的高度小于或者等于总的高度的时候，开始动态加载数据
      if (documentHeight <= totalHeight) {
        pageParams.isScrollLoading = true;
        options = Object.assign({ noLoading: true }, options || {});

        // 限制300ms内滚动界面只加载一次数据
        setTimeout(function () {
          pageParams.isScrollLoading = false;
        }, 300);

        console.log(JSON.stringify(pageParams))
        return loadPageData(fetchName, params, options, successCallback, failCallback, pageParams);
      }
    }
  }
}

/**
 * 加载分页数据
 */
const loadPageData = (fetchName, params, options, successCallback, failCallback, pageParams) => {
  if(!pageParams){
    pageParams = getDefaultPagePrams(params);
  }

  params = params || {};
  params[pageNumName] = pageParams[pageNumName];
  params[pageSizeName] = pageParams[pageSizeName];
  return fetchData(fetchName, params, options,function(data, pageLimit){
    if (pageLimit) {
      pageParams.hasNextPage = ((pageLimit[currentPageName]*pageLimit[pageLengthName]) < pageLimit[totalName]);
      pageParams[currentPageName] = pageLimit[currentPageName] + 1;
      pageParams[pageLengthName] = pageLimit[pageLengthName];
      pageParams[totalName] = pageLimit[totalName];

      successCallback && successCallback.call(this, data, pageParams);
    }
  }, failCallback);
}

export {
  getDefaultPagePrams,
  scrollLoad,
  loadPageData
}
