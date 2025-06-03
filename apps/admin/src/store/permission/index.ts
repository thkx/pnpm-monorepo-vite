import { reactive, toRefs } from 'vue';
import type { RouteRecordRaw } from 'vue-router'

import { IPermission } from './type';

import settings from '@/config/settings'

import { getRouters } from '@/api/routers';

// import Layout from '@/layouts/index.vue';

// import router, { constantRoutes, dynamicRoutes } from '@/router';
import router, { dashboardRouter, dynamicRoutes } from '@/router'

import auth from '@/plugins/auth';


// 匹配pages里面所有的.vue文件
const modules = import.meta.glob('../../views/**/*.vue')
// console.log(modules)

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap: any[], _lastRouter = false, type = false) {
    return asyncRouterMap.filter(route => {
        if (type && route.children) {
            // console.log(lastRouter)
            route.children = filterChildren(route.children, route)
        }

        // svgIcon
        if (route.meta.icon && route.meta.icon != '#') {
            route.meta.svgIcon = route.meta.icon
        }

        if (route.component) {
            // Layout ParentView 组件特殊处理
            if (route.component === 'Layout') {
                route.component = 'Layout'
            } else if (route.component === 'ParentView') {
                route.component = 'ParentView'
            } else if (route.component === 'InnerLink') {
                route.component = 'InnerLink'
            } else {
                route.component = loadView(route.component)
            }
        }
        if (route.children != null && route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children, route, type)
        } else {
            delete route['children']
            delete route['redirect']
        }
        return true
    })
}

function filterChildren(childrenMap: any[], lastRouter = false) {
    var children: any[] = []
    childrenMap.forEach((el) => {
        if (el.children && el.children.length) {
            // console.log(el)
            if (el.component === 'ParentView' && !lastRouter) {
                el.children.forEach((c: any) => {
                    c.path = el.path + '/' + c.path
                    if (c.children && c.children.length) {
                        children = children.concat(filterChildren(c.children, c))
                        return
                    }
                    children.push(c)
                })
                return
            }
        }
        if (lastRouter) {
            el.path = (lastRouter as any).path + '/' + el.path
        }
        children = children.concat(el)
    })
    return children
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes: any[]) {
    const res: any = []
    routes.forEach(route => {
        if (route.permissions) {
            if (auth.hasPermissionOr(route.permissions)) {
                res.push(route)
            }
        } else if (route.roles) {
            if (auth.hasRoleOr(route.roles)) {
                res.push(route)
            }
        }
    })
    return res
}

export const loadView = (view: string) => {
    let res;
    for (const path in modules) {
        const dir = path.split('views/')[1].split('.vue')[0];
        if (dir === view) {
            res = () => modules[path]();
        }
    }
    return res;
}


const state = reactive<IPermission>({
    collapsed: settings.collapsed,
    collapsedWidth: settings.collapsedWidth,
    width: settings.width,
    title: settings.title,
    logo: settings.logo,

    themeColor: settings.themeColor,

    rootSubmenuKeys: [],
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topBarRouters: [],
    sideBarRouters: [],
})

const { collapsed, collapsedWidth, width, title, logo, themeColor, rootSubmenuKeys, routes, addRoutes, defaultRoutes, topBarRouters, sideBarRouters } = toRefs(state)

function setCollapsed(value: boolean) {
    collapsed.value = value
}

function setRootSubmenuKeys(keys: string[]) {
    rootSubmenuKeys.value = keys
}

function setRoutes(routers: any[] | ConcatArray<RouteRecordRaw>, constant_routes: RouteRecordRaw[]) {
    addRoutes.value = routers
    // routes.value = constantRoutes.concat(routers)
    routes.value = constant_routes.concat(routers)
}

function setDefaultRoutes(routers: any[] | ConcatArray<RouteRecordRaw>, constant_routes: RouteRecordRaw[]) {
    // defaultRoutes.value = constantRoutes.concat(routers)
    defaultRoutes.value = constant_routes.concat(routers)
}

function setTopBarRoutes(routers: any[]) {
    topBarRouters.value = routers
}

function setSideBarRouters(routers: RouteRecordRaw[]) {
    sideBarRouters.value = routers
}

function getThemeColor() {
    const theme = sessionStorage.getItem('theme')
    if (theme) {
        themeColor.value = theme;
    }
    return themeColor.value
}

function setThemeColor(value: string) {
    themeColor.value = value;
    document.getElementById('app')?.style.setProperty('--color-customization', value);
    sessionStorage.setItem('theme', value)
}

function generateRoutes() {
    return new Promise(async (resolve) => {

        // 向后端请求路由数据
        const [err, response] = await getRouters()
        if (!err) {
            const rows = response?.rows
            const rewriteRoutes = filterAsyncRouter(rows, false, true)

            const asyncRoutes = filterDynamicRoutes(dynamicRoutes)
            asyncRoutes.forEach((route: any) => { router.addRoute(route) })

            setRootSubmenuKeys(getRootSubmenuKeys(rows))
            setRoutes(rewriteRoutes, [])

            dashboardRouter.children = rewriteRoutes
            resolve([dashboardRouter])
        }

        // 向后端请求路由数据
        // getRouters().then((res: any) => {
        //     const s_data = JSON.parse(JSON.stringify(res.data))
        //     const r_data = JSON.parse(JSON.stringify(res.data))
        //     const defaultData = JSON.parse(JSON.stringify(res.data))
        //     const sidebarRoutes = filterAsyncRouter(s_data)
        //     const rewriteRoutes = filterAsyncRouter(r_data, false, true)
        //     const defaultRoutes = filterAsyncRouter(defaultData)
        //     const asyncRoutes = filterDynamicRoutes(dynamicRoutes)
        //     asyncRoutes.forEach((route: any) => { router.addRoute(route) })
        //     setRoutes(rewriteRoutes, [...constantRoutes])
        //     setSidebarRouters([...constantRoutes].concat(sidebarRoutes))
        //     setDefaultRoutes(sidebarRoutes, [...constantRoutes])
        //     setTopBarRoutes(defaultRoutes)
        //     resolve(rewriteRoutes)
        // })
    })
}

function getRootSubmenuKeys(mock_routes: RouteRecordRaw[] | any[]) {

    function getKeys(data: RouteRecordRaw[] | any[]) {
        return data.reduce((pre, curr) => {
            if (curr.children) {
                pre = [...pre, curr.path]
            }
            return pre
        }, [] as string[])
    }

    return getKeys(mock_routes)
}

export function usePermission() {
    return { collapsed, collapsedWidth, width, title, logo, themeColor, rootSubmenuKeys, routes, addRoutes, defaultRoutes, topBarRouters, sideBarRouters, setCollapsed, setRootSubmenuKeys, setRoutes, setDefaultRoutes, setTopBarRoutes, setSideBarRouters, setThemeColor, getThemeColor, generateRoutes }
}

