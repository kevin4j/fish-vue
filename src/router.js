import {createRouter, createWebHistory } from 'vue-router'
import HelloWorld from './components/HelloWorld'
import Index from './page/Index'
import Second from './page/Second'
import Third from './page/Third'
import UploadImage from './page/UploadImage'
import PageLoadTest from "./page/PageLoadTest";

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
        path: '/second/:title',
        name: 'Second',
        component: Second,
        meta: {
            title: '第二层',
            keepAlive: true
        },
        props: true
    },
    {
        path: '/third',
        name: 'Third',
        component: Third,
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
        path: '/pageLoad',
        name: 'PageLoad',
        component: PageLoadTest,
        meta: {
            title: '第三层'
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
