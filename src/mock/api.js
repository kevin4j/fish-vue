import {getMock, postMock, postMultipartMock} from './request'

// 作者
export const getAuthor = getMock('/author', true);

// 首页分类
export const getCategoryList = postMock('/category', true);

// 获取广告
export const getBannerList = getMock('/banner', true);

// 获取微信参数
export const getWxPrams = getMock('/getWxPrams');

// 上传微信图片
export const uploadImg = getMock('/uploadImg');

// 上传微信图片
export const uploadFile = postMultipartMock('/uploadFile.do?resultFlag=2', true);


