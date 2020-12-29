
import {getRandomImgUrl} from './image'

const Mock = require('mockjs')
// 模拟ajax请求延迟响应
Mock.setup({
  timeout: '100-300'
})
const Random = Mock.Random;

function getQueryParams (url) {
  const query = url.split('?')[1]
  const vars = query.split('&');
  let params = {};
  vars.forEach((v) => {
    const pair = v.split('=');
    params[pair[0]] = pair[1];
  })
  return params;
}

function renderErrorResult (code, text) {
  return {code: (code == undefined ? 400 : code), text: text || '系统异常'}
}
function renderResult (data, pageLimit) {
  return {code: 200, data: data, pageLimit: pageLimit || null}
}
function renderPageLimit (pageNum, pageSize, total) {
  return {pageNum: pageNum, pageSize: pageSize, total: total || pageSize * 5}
}

Mock.mock('/api/author', 'get', renderResult({'id': '1', 'name': 'kevin'}))

Mock.mock('/api/category', 'post', function (options) {
  let data = [];
  for (let i = 1; i <= 6; i++) {
    data.push(Mock.mock({
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id': Random.integer(),
      // 随机4个中文字符串
      'name': Random.cword(4),
      // 随机图片地址
      'coverImgUrl': Random.image('350x300', Random.color(),'#FFF', Random.word(4))
    }))
  }
  return renderResult(data);
})

Mock.mock(/\/api\/banner?/, 'get', function (options) {
  console.log("模拟请求："+JSON.stringify(options));
  const params = getQueryParams(options.url);
  const pageNum = parseInt(params.pageNum);
  const pageSize = parseInt(params.pageSize);
  let min = (pageNum - 1) * pageSize + 1;
  const max = pageNum * pageSize;
  let data = [];
  for (let i = 1; i <= pageSize; i++) {
    data.push(Mock.mock({
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id': min++,
      // 随机5个中文字符串
      'info': Mock.Random.cword(5),
      // 随机图片地址
      'imgId': getRandomImgUrl()
    }))
  }
  if(params && params.withError && Random.boolean(8, 2, false)){
    return renderErrorResult(400, "系统繁忙");
  }else{
    return renderResult(data, renderPageLimit(pageNum, pageSize))
  }
})

Mock.mock(/\/api\/uploadFile.do?/, 'post', function(options){
  let data = [];
  data.push(Random.image('350x300', Random.color(),'#FFF', Random.word(4)))
  return renderResult({"fileIdList" : data});
})
