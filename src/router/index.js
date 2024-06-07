// 创建路由并导出

import { createRouter, createWebHistory } from 'vue-router'

import login from '@/views/Login.vue'
import layout from '@/views/Layout.vue'

import articleCategory from '@/views/article/ArticleCategory.vue'
import articleManage from '@/views/article/ArticleManage.vue'
import userAvatar from '@/views/user/UserAvatar.vue'
import userInfo from '@/views/user/UserInfo.vue'
import userResetPassword from '@/views/user/UserResetPassword.vue'
import articleDetail from "@/views/article/ArticleDetail.vue";

const routes = [
    {path: '/login', component: login},
    {
        path: '/', 
        component: layout,

        redirect: '/article/manage',
        // 子路由
        children: [
            {path: '/article/category', component: articleCategory},
            {path: '/article/manage', component: articleManage},
            {path: '/user/info', component: userInfo},
            {path: '/user/avatar', component: userAvatar},
            {path: '/user/resetpassword', component: userResetPassword},
            {path: '/article/detail', component: articleDetail,
                props: (route) => ({
                    id: route.query.id
                })
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router