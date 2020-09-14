/**
 * 滑动滚动条分页加载数据
 * @author kevin
 */

import {fetchData} from '../mock/fetch'
import {getWindowHeight, getScrollTop, getDocumentHeight} from "./window";

/**
 * 定义滑动滚动条加载实例， 初始化第一页数据和滚动条监听事件
 * @param fetchName 接口名
 * @param params 参数
 * @param callback 加载数据后回调
 * @param options 可选项，如扩展url（expandUrl）、配置Axios请求可选项等
 */
const scrollLoad = (fetchName, params, callback, options) => {
  // 优先自定义分页
  let pageParams = {
    isScrollLoading: false,
    pageNum: params.pageNum || 1,
    pageSize: params.pageSize || 10,
    hasNextPage: true
  }
  // 默认初始化加载第一页
  loadPageData(fetchName, params, callback, pageParams, options);
  // 监听滚动条事件加载分页诗句
  window.addEventListener('scroll', function () {
    scrollLoadData(loadPageData, fetchName, params, callback, pageParams, options);
  });
}

/**
 * 根据滚动条高度加载数据
 * @param loadFun
 * @param fetchName
 * @param params
 * @param callback
 * @param pageParams
 * @param options
 */
const scrollLoadData = (loadFun, fetchName, params, callback, pageParams, options) => {
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
        loadFun(fetchName, params, callback, pageParams, options);
        // 限制300ms内滚动界面只加载一次数据
        setTimeout(function () {
          pageParams.isScrollLoading = false;
        }, 300);
      }
    }
  }
}

/**
 * 加载分页数据
 */
const loadPageData = (fetchName, params, callback, pageParams, options) => {
  params = params || {};
  params.pageNum = pageParams.pageNum;
  params.pageSize = pageParams.pageSize;
  fetchData(fetchName, params, options).then((res) => {
    if (res && res.data && res.pageLimit) {
      pageParams.hasNextPage = (res.pageLimit.pageNum < res.pageLimit.total);
      pageParams.pageNum = res.pageLimit.pageNum + 1;
      pageParams.pageSize = res.pageLimit.pageSize;

      callback && callback.call(this, res.data);
    }
  })
}

export {
  scrollLoad
}
