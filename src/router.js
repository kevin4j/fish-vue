import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './components/HelloWorld'
import Test from './components/Test'
import Index from './page/Index'
import Second from './page/Second'
import Third from './page/Third'
import UploadImage from './page/UploadImage'

Vue.use(Router)

const routers = [
    {
        path: '/hello',
        name: 'HelloWorld',
        component: HelloWorld,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/test',
        name: 'Test',
        component: Test,
        meta: {
            title: '测试'
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
            title: '第三层'
        }
    },
    {
        path: '/',
        name: 'Index',
        component: Index,
        meta: {
            title: '主页'
        }
    }
]
export default new Router({
    routes: routers,
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
