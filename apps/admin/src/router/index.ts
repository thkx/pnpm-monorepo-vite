import { createWebHashHistory, createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'

import Layouts from '@/layouts/index.vue';

export const constantRoutes: RouteRecordRaw[] = [
    // {
    //     path: "/",
    //     // component: Layouts,
    //     redirect: '/dashboard/analysis',
    //     // meta: {
    //     //     title: "首页",
    //     //     icon: "home",
    //     //     // roles: ["admin", "editor"], // 可以在根路由中设置角色
    //     //     alwaysShow: false // 将始终显示根菜单
    //     // },
    //     // children: [
    //     //     {
    //     //         path: "dashboard",
    //     //         name: "dashboard",
    //     //         meta: {
    //     //             title: "Dashboard",
    //     //             icon: "home",
    //     //             // affix: true
    //     //         },
    //     //         children: [
    //     //             {
    //     //                 path: "analysis",
    //     //                 component: () => import("@/views/dashboard/analysis/index.vue"),
    //     //                 name: "analysis",
    //     //                 meta: {
    //     //                     title: "首页",
    //     //                     icon: "home",
    //     //                     // affix: true
    //     //                 },
    //     //             },
    //     //             {
    //     //                 path: "monitor",
    //     //                 component: () => import("@/views/dashboard/monitor/index.vue"),
    //     //                 name: "monitor",
    //     //                 meta: {
    //     //                     title: "首页",
    //     //                     icon: "home",
    //     //                     // affix: true
    //     //                 },
    //     //             },
    //     //             {
    //     //                 path: "workplace",
    //     //                 component: () => import("@/views/dashboard/workplace/index.vue"),
    //     //                 name: "workplace",
    //     //                 meta: {
    //     //                     title: "首页",
    //     //                     icon: "home",
    //     //                     // affix: true
    //     //                 },
    //     //             }
    //     //         ]
    //     //     },
    //     //     {
    //     //         path: "/menu",
    //     //         component: () => import("@/views/menu/index.vue"),
    //     //         name: "menu",
    //     //         meta: {
    //     //             title: "菜单",
    //     //             icon: "home",
    //     //             // affix: true
    //     //         }
    //     //     },
    //     // ]
    // },

    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: '登录',
        }
    },
]

export const dashboardRouter: RouteRecordRaw = {
    path: "/",
    component: Layouts,
    redirect: '/dashboard/analysis',
    // meta: {
    //     title: "首页",
    //     icon: "home",
    //     // roles: ["admin", "editor"], // 可以在根路由中设置角色
    //     alwaysShow: false // 将始终显示根菜单
    // },
    children: []
}

export const dynamicRoutes: RouteRecordRaw[] = [
    {
        path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
        redirect: "/404",
        name: "ErrorPage",
        component: Layouts,
        children: [
            {
                path: '',
                component: () => import('@/views/exception/404/index.vue'),
            }
        ]
    },
]

const router = createRouter({
    history:
        import.meta.env.VITE_ROUTER_HISTORY === 'hash'
            ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
            : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
    routes: constantRoutes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
})

export default router
