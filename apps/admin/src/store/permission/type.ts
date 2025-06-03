import type { RouteRecordRaw } from 'vue-router'

type Settings = {
    collapsed: boolean
    collapsedWidth: number
    width: number

    title: string
    logo: string

    themeColor: string
}

export type IPermission = {
    rootSubmenuKeys: string[]
    routes: any[] | ConcatArray<RouteRecordRaw>
    addRoutes: any[] | ConcatArray<RouteRecordRaw>
    defaultRoutes: any[] | ConcatArray<RouteRecordRaw>
    topBarRouters: any[] | ConcatArray<RouteRecordRaw>
    sideBarRouters: any[] | ConcatArray<RouteRecordRaw>
} & Settings
