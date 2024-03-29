import {createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from './components/HelloWorld'
import Index from './page/Index'
import BannerList from './page/BannerList'
import BannerDetail from './page/BannerDetail'
import UploadImage from './page/UploadImage'
import PageLoadTest from "./page/PageLoadTest";
import ScrollLoadTest from "./page/ScrollLoadTest";

const routes = [
    {
        path: '/hello',
        name: 'HelloWorld',
        component: HelloWorld,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/',
        name: 'Index',
        component: Index,
        meta: {
            title: '主页'
        }
    },
    {
        path: '/list/:title',
        name: 'BannerList',
        component: BannerList,
        meta: {
            title: '列表',
            keepAlive: true
        },
        props: true
    },
    {
        path: '/detail',
        name: 'BannerDetail',
        component: BannerDetail,
        meta: {
            title: '第三层'
        }
    },
    {
        path: '/uploadImage',
        name: 'UploadImage',
        component: UploadImage,
        meta: {
            title: '上传图片'
        }
    },
    {
        path: '/pageLoadTest',
        name: 'PageLoadTest',
        component: PageLoadTest,
        meta: {
            title: '分页加载'
        }
    },
    {
        path: '/scrollLoadTest',
        name: 'ScrollLoadTest',
        component: ScrollLoadTest,
        meta: {
            title: '滚动加载'
        }
    },
]

// history模式，createWebHashHistory模式对应#显示url，如果对SEO有要求，可以选择createWebHistory模式显示实际url（需要处理404的异常）
const routerHistory = createWebHashHistory()
let router =createRouter({
    history: routerHistory,
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})

export default router
