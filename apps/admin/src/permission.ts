import { RouteRecordRaw } from 'vue-router'

import router from '@/router'
import isWhiteList from '@/config/white-list'

// import { isHttp } from '@/utils/validate'
import { isHttp } from '@pnpm-monorepo-vite/utils'
import { usePermission } from '@/store/permission'
import { useUserStore } from '@/store/user'


const permission = usePermission()
const user = useUserStore()

router.beforeEach((to, from, next) => {
    // console.log(to, from)
    const token = sessionStorage.getItem('token')
    if (token) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            if (user.roles.value.length === 0) {
                // isRelogin.show = true
                // 判断当前用户是否已拉取完user_info信息
                user.getInfo().then(() => {
                    // isRelogin.show = false
                    permission.generateRoutes().then((accessRoutes: any) => {
                        // 根据roles权限生成可访问的路由表
                        accessRoutes.forEach((route: RouteRecordRaw) => {
                            if (!isHttp(route.path)) {
                                // console.log(route.path.indexOf('/'))
                                if (route.path.indexOf('/') == -1) {
                                    route.path = '/' + route.path
                                }
                                // console.log(route)
                                router.addRoute(route) // 动态添加可访问路由表
                            }
                        })
                        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
                    })
                }).catch(err => {
                    console.log(err)
                    user.logout()
                    // useUserStore().logout().then(() => {
                    //   ElMessage.error(err)
                    //   next({ path: '/' })
                    // })
                })
            } else {
                next()
            }
        }
    } else {
        // 没有token
        if (isWhiteList(to)) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
        }
    }
})
