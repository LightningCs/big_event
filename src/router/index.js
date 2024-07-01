// 创建路由并导出

import { createRouter, createWebHistory } from 'vue-router'

import login from '@/views/Login.vue'
import layout from '@/views/Layout.vue'

import articleCategory from '@/views/article/ArticleCategory.vue'
import articleManage from '@/views/article/ArticleManage.vue'
import userAvatar from '@/views/user/UserAvatar.vue'
import userInfo from '@/views/user/UserInfo.vue'
import userResetPassword from '@/views/user/UserResetPassword.vue'
import articleDetail from "@/views/article/ArticleDetail.vue"
import history from '@/views/user/History.vue'

const routes = [
    {path: '/login', component: login},
    {
        path: '/', 
        component: layout,

        redirect: '/article/category',
        // 子路由
        children: [
            {path: '/article/category', component: articleCategory, meta: {render: false}},
            {path: '/article/manage', component: articleManage, meta: {render: false}},
            {path: '/user/info', component: userInfo, meta: {render: false}},
            {path: '/user/avatar', component: userAvatar, meta: {render: false}},
            {path: '/user/resetpassword', component: userResetPassword, meta: {render: false}},
            {path: '/user/history', component: history, meta: {render: false}},
            {path: '/article/detail', component: articleDetail,
                props: (route) => ({
                    id: route.query.id
                }),
                meta: {render: false}
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router