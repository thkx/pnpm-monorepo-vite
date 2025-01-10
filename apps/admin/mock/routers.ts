const mock_routes = [

    {
        path: "/dashboard",
        name: "dashboard",

        meta: {
            title: "Dashboard",
            icon: "DashboardOutlined",
            // affix: true
        },
        children: [
            {
                path: "analysis",
                component: 'dashboard/analysis/index',
                name: "analysis",
                meta: {
                    title: "分析页",
                    // icon: "home",
                    // affix: true
                },
            },
            {
                path: "monitor",
                component: 'dashboard/monitor/index',
                name: "monitor",
                meta: {
                    title: "监控页",
                    // icon: "home",
                    // affix: true
                },
            },
            {
                path: "workplace",
                component: 'dashboard/workplace/index',
                name: "workplace",
                meta: {
                    title: "工作台",
                    // icon: "home",
                    // affix: true
                },
            }
        ]
    },

    {
        path: "/form",
        name: "form",

        meta: {
            title: "表单页",
            icon: "FormOutlined",
            // affix: true
        },
        children: [
            {
                path: "basic-form",
                component: 'form/basic-form/index',
                name: "basic-form",
                meta: {
                    title: "基础表单",
                    // icon: "home",
                    // affix: true
                },
            },
            {
                path: "step-form",
                component: 'form/step-form/index',
                name: "step-form",
                meta: {
                    title: "分布表单",
                    // icon: "home",
                    // affix: true
                },
            },
            {
                path: "advanced-form",
                component: 'form/advanced-form/index',
                name: "advanced-form",
                meta: {
                    title: "高级表单",
                    // icon: "home",
                    // affix: true
                },
            }
        ]
    },

    {
        path: "/list",
        name: "list",

        meta: {
            title: "列表页",
            icon: "TableOutlined",
            // affix: true
        },
        children: [
            {
                path: "search",
                name: "search",
                meta: {
                    title: "搜索列表",
                    // icon: "home",
                    // affix: true
                },
                children: [
                    {
                        path: "articles",
                        component: 'list/search/articles/index',
                        name: "articles",
                        meta: {
                            title: "搜索列表（文章）",
                            // icon: "home",
                            // affix: true
                        },
                    },
                    {
                        path: "projects",
                        component: 'list/search/projects/index',
                        name: "projects",
                        meta: {
                            title: "搜索列表（项目）",
                            // icon: "home",
                            // affix: true
                        },
                    },
                    {
                        path: "applications",
                        component: 'list/search/applications/index',
                        name: "applications",
                        meta: {
                            title: "搜索列表（应用）",
                            // icon: "home",
                            // affix: true
                        },
                    }
                ]
            },
            {
                path: "table-list",
                component: 'list/table-list/index',
                name: "table-list",
                meta: {
                    title: "查询表格",
                    // icon: "home",
                    // affix: true
                },
            },
            {
                path: "basic-list",
                component: 'list/basic-list/index',
                name: "basic-list",
                meta: {
                    title: "标准列表",
                    // icon: "home",
                    // affix: true
                },
            },
            {
                path: "card-list",
                component: 'list/card-list/index',
                name: "card-list",
                meta: {
                    title: "卡片列表",
                    // icon: "home",
                    // affix: true
                },
            }
        ]
    },

    {
        path: "/profile",
        name: "profile",

        meta: {
            title: "详情页",
            icon: "ProfileOutlined",
            // affix: true
        },
        children: [
            {
                path: "basic",
                component: 'profile/basic/index',
                name: "basic",
                meta: {
                    title: "基础详情页",
                    // icon: "home",
                    // affix: true
                },
            },
            {
                path: "advanced",
                component: 'profile/advanced/index',
                name: "advanced",
                meta: {
                    title: "高级详情页",
                    // icon: "home",
                    // affix: true
                },
            },
        ]
    },

    {
        path: "/result",
        name: "result",

        meta: {
            title: "结果页",
            icon: "CheckCircleOutlined",
            // affix: true
        },
        children: [
            {
                path: "success",
                component: 'result/success/index',
                name: "success",
                meta: {
                    title: "成功页",
                    // icon: "home",
                    // affix: true
                },
            },
            {
                path: "fail",
                component: 'result/fail/index',
                name: "fail",
                meta: {
                    title: "失败页",
                    // icon: "home",
                    // affix: true
                },
            },
        ]
    },

    {
        path: "/exception",
        name: "exception",

        meta: {
            title: "异常页",
            icon: "WarningOutlined",
            // affix: true
        },
        children: [
            {
                path: "403",
                component: 'exception/403/index',
                name: "403",
                meta: {
                    title: "403",
                    // icon: "home",
                    // affix: true
                },
            },
            {
                path: "404",
                component: 'exception/404/index',
                name: "404",
                meta: {
                    title: "404",
                    // icon: "home",
                    // affix: true
                },
            },
            {
                path: "500",
                component: 'exception/500/index',
                name: "500",
                meta: {
                    title: "500",
                    // icon: "home",
                    // affix: true
                },
            },
        ]
    },

    {
        path: "/account",
        name: "account",

        meta: {
            title: "个人页",
            icon: "UserOutlined",
            // affix: true
        },
        children: [
            {
                path: "center",
                component: 'account/center/index',
                name: "center",
                meta: {
                    title: "个人中心",
                    // icon: "home",
                    // affix: true
                },
            },
            {
                path: "settings",
                component: 'account/settings/index',
                name: "settings",
                meta: {
                    title: "个人设置",
                    // icon: "home",
                    // affix: true
                },
            },
        ]
    },
]


export default [
    {
        url: "/api/1.0/routers",
        method: "get",
        response: () => {
            return {
                code: 0,
                message: "ok",
                data: {
                    'rows': mock_routes
                },
            }
        }
    }
]

