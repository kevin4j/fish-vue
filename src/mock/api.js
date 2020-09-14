import {getMock, postMock} from './request'

// 作者
export const getAuthor = getMock('/author', true);

// 首页分类
export const getCategoryList = getMock('/category', true);

// 获取广告
export const getBannerList = getMock('/banner', true);


