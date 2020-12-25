# fish-vue

## 项目简介
> VUE 3 前后端分离入门学习，当前项目适用于移动端H5  
> 当前项目使用[@vue/cli（vue-cli 5）](https://cli.vuejs.org/zh/guide/)创建

## DEMO效果图
> ![DEMO效果](https://github.com/kevin4j/fish-vue/blob/master/fish-vue-demo.gif)

## 主要功能
> * 使用Axios进行ajax请求发送，拦截器设置loading
> * 自定义滑动滚动条加载分页数据 scrollLoad
> * ~~使用vue-loading-overlay支持页面加载loading动画~~ 替换为Vant组件
> * 使用keep-alive+include+vuex支持页面跳转缓存前一页（列表页跳详情页）
> * 支持meta页面主题变更
> * 使用MockJs支持模拟api和数据
> * ~~使用cross-env，支持多环境配置打包~~ 替换为vue-cli-service的mode模式
> * ~~引入mint-ui, 使用Toast(提示框), MessageBox（确认框）, Popup（弹窗）, Pull Down（下拉）, Pull Up（上拉）~~ 替换为Vant组件
> * ~~非微信浏览器支持vue-upload-component上传图片~~ 替换为Vant组件
> * 微信浏览器支持微信图片上传接口
> * 移除VUE 2的第三方组件，使用Vant(Vue 3版本)替换UI组件


## 安装、启动或编译

> ### 安装
> ```
> npm install
> ```
> 
> ### 启动开发环境
> ```
> npm run serve
> ```
> 
> ### 编译测试包
> ```
> npm run test
> ```
> 
> ### 编译生产包
> ```
> npm run build
> ```

## 目录结构
```
│  .env.dev             #开发环境参数配置
│  .env.prod            #生产环境参数配置
│  .env.test            #测试环境参数配置
│  package.json
│  vue.config.js        #[自定义配置](https://cli.vuejs.org/config/)
│  
├─dist                  #编译目标目录
├─public
│      favicon.ico
│      index.html
│      
└─src
    │  App.vue
    │  main.js
    │  router.js
    │  
    ├─assets            # 静态资源（CSS、图片、js）
    │          
    ├─components        # 各种组件
    │  └─loading
    │          LoadingOverlay.vue
    │          
    ├─mock              # 请求处理包
    │  │  api.js        # 定义各种API
    │  │  fetch.js      # 统一请求格式处理
    │  │  request.js    # 对Axios的封装
    │  │  
    │  └─data           # MockJs模拟数据
    │          image.js     #自定义的图片数据
    │          index.js     #模拟的api定义
    │          
    ├─page              #页面组件
    │      Index.vue
    │      Second.vue
    │      Third.vue
    │      
    └─utils             #工具包
            commonTool.js   #通用工具包
            scrollLoad.js   #滚动加载数据
            window.js       #获取窗口信息
```

## 扩展
### 使用http-server
> 安装http-server 用于启动打包后的目录进行测试，
> 切换到dist目录terminal，输入http-server即可启动项目
> ```
> npm i -g http-server
> ```