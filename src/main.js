import { createApp } from 'vue';
import Vuex from 'vuex'
import App from './App'
import router from './router'
import './mock/data'
import {clearUserInfo, getLocalUrlKey, isDebug} from './utils/commonTool'
import './utils/prototype'
import VConsole from 'vconsole'
import {gotoWxGrant, isWx} from "./utils/wxUtil";
import { Popup, Loading, List, PullRefresh, Uploader, Divider } from 'vant';
import OnlineService from "./components/onlineservice/OnlineService";
import LoadingOverlay from "./components/loading/LoadingOverlay";
import PageLoad from "./components/pageload/PageLoad";

/* 响应式状态存储，用来缓存页面 */
const store = new Vuex.Store({
    state: {
        cacheComponents: [] // 需要缓存的组件，在具体页面跳转前进行设置
    },
    getters: {
        getCacheComponents: state => {
            return state.cacheComponents;
        },
        getCacheComponentIndex: (state) => (name) => {
            for (let i = 0; i < state.cacheComponents.length; i++) {
                if (state.cacheComponents[i] == name){
                    return i;
                }
            }
            return -1;
        }
    },
    mutations: {
        setCacheComponents (state, data) {
            state.cacheComponents = data;
        },
        addCacheComponents (state, option) {
            if(store.getters.getCacheComponentIndex(option.name) < 0){
                state.cacheComponents.push(option.name);
                // 等待store响应，否则会出现第一次不缓存
                setTimeout(()=>{option.next();}, 100)
            }  else {
                option.next();
            }
        },
        removeCacheComponents (state, option){
            let index=store.getters.getCacheComponentIndex(option.name);
            if (index > -1) {
                state.cacheComponents.splice(index, 1);
            }
            option.next();
        }
    }
})


/* 页面跳转更新title */
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next();
});

// 开发环境或者线上debug模式，启用VConsole
if(isDebug()){
    new VConsole();
}else{
    // 非开发环境强制在微信中使用
    if(!isWx()){
        gotoWxGrant();
    }
}

// session缓存debug
const debug=getLocalUrlKey('debug');
if(debug){
    window.sessionStorage.setItem('debug', debug);
}

// 缓存code
const code=getLocalUrlKey('code');
if(code){
    window.localStorage.setItem('wxCode', code);
    // 微信授权code会直接加在域名后面，导致url与实际不符，后面会出现签名错误
    window.location.href=process.env.VUE_APP_H5;
}

let app=createApp(App);
app.use(router).use(store)

// 注册vant组件
app.use(Popup).use(Loading).use(List).use(PullRefresh).use(Uploader).use(Divider);

// 注册在线客服组件
app.component("LoadingOverlay", LoadingOverlay)
app.component("OnlineService", OnlineService);
app.component("PageLoad", PageLoad);

app.mount('#app');