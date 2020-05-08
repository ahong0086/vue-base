import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '@/service/user'

import Home from '../views/Home.vue'

Vue.use(VueRouter)
import {getUrlKey} from '@/common/util';

const code = (getUrlKey('code') || '').toLowerCase()
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        // redirect: code ? `/${code}` : '/tthb'
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

//路由跳转加载动画
router.beforeEach((to, from, next) => {
    User.isLoading = true
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
})

router.afterEach(function (to) {
    User.isLoading = false
})

export default router
