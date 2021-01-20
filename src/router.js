import {createRouter, createWebHistory } from 'vue-router'
import HelloWorld from './components/HelloWorld'
import Index from './page/Index'
import List from './page/List'
import Detail from './page/Detail'
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
        name: 'List',
        component: List,
        meta: {
            title: '列表',
            keepAlive: true
        },
        props: true
    },
    {
        path: '/detail',
        name: 'Detail',
        component: Detail,
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

const routerHistory = createWebHistory()
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
