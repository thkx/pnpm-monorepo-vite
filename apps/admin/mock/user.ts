

function setUserDetail(avatar: string, notice?: any) {
    const info = {
        "name": "Serati Ma",
        "avatar": avatar,
        "userid": "00000001",
        "email": "antdesign@alipay.com",
        "signature": "海纳百川，有容乃大",
        "title": "交互专家",
        "group": "蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED",
        "tags": [
            {
                "key": "0",
                "label": "很有想法的"
            },
            {
                "key": "1",
                "label": "专注设计"
            },
            {
                "key": "2",
                "label": "辣~"
            },
            {
                "key": "3",
                "label": "大长腿"
            },
            {
                "key": "4",
                "label": "川妹子"
            },
            {
                "key": "5",
                "label": "海纳百川"
            }
        ],
        "notifyCount": 12,
        "unreadCount": 11,
        "country": "China",
        "geographic": {
            "province": {
                "label": "浙江省",
                "key": "330000"
            },
            "city": {
                "label": "杭州市",
                "key": "330100"
            }
        },
        "address": "西湖区工专路 77 号",
        "phone": "0752-268888888"
    }

    if (notice) {
        info['notice'] = notice
    }

    return info
}

const user_info = setUserDetail("https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png")

const notice = [
    {
        "id": "xxx1",
        "title": "Alipay",
        "logo": "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
        "description": "那是一种内在的东西，他们到达不了，也无法触及的",
        "updatedAt": "2024-11-13T06:27:10.352Z",
        "member": "科学搬砖组",
        "href": "",
        "memberLink": ""
    },
    {
        "id": "xxx2",
        "title": "Angular",
        "logo": "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
        "description": "希望是一个好东西，也许是最好的，好东西是不会消亡的",
        "updatedAt": "2017-07-24T00:00:00.000Z",
        "member": "全组都是吴彦祖",
        "href": "",
        "memberLink": ""
    },
    {
        "id": "xxx3",
        "title": "Ant Design",
        "logo": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
        "description": "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
        "updatedAt": "2024-11-13T06:27:10.352Z",
        "member": "中二少女团",
        "href": "",
        "memberLink": ""
    },
    {
        "id": "xxx4",
        "title": "Ant Design Pro",
        "logo": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
        "description": "那时候我只会想自己想要什么，从不想自己拥有什么",
        "updatedAt": "2017-07-23T00:00:00.000Z",
        "member": "程序员日常",
        "href": "",
        "memberLink": ""
    },
    {
        "id": "xxx5",
        "title": "Bootstrap",
        "logo": "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
        "description": "凛冬将至",
        "updatedAt": "2017-07-23T00:00:00.000Z",
        "member": "高逼格设计天团",
        "href": "",
        "memberLink": ""
    },
    {
        "id": "xxx6",
        "title": "React",
        "logo": "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
        "description": "生命就像一盒巧克力，结果往往出人意料",
        "updatedAt": "2017-07-23T00:00:00.000Z",
        "member": "骗你来学计算机",
        "href": "",
        "memberLink": ""
    }
]

const current_user_detail = setUserDetail("https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png", notice)

const user_list = [
    {
        userId: 1,
        avatar: 'https://pic1.zhimg.com/80/v2-083faf550543c1e9f134b56b3322ee3c_720w.webp',
        username: 'admin',
        password: 'ant.design',
        desc: '下船不谈船里事',
        roles: ['平台管理员'],
        buttons: ['cuser.detail'],
        routes: ['home'],
        token: 'Admin Token'
    },
    {
        userId: 2,
        avatar: 'https://pic1.zhimg.com/80/v2-e1427f6a21122ac163ff98d24f55d372_720w.webp',
        username: 'user',
        password: 'ant.design',
        desc: '旧人不谈近况，新人不讲过往',
        roles: ['系统管理员'],
        buttons: ['cuser.detail', 'cuser.user'],
        routes: ['home'],
        token: 'Admin Token'
    }
]

// const fake_list_detail = [
//     {
//         "id": "fake-list-0",
//         "owner": "付小小",
//         "title": "Alipay",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
//         "status": "active",
//         "percent": 74,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731481016535,
//         "createdAt": 1731481016535,
//         "subDescription": "那是一种内在的东西， 他们到达不了，也无法触及的",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 146628,
//         "newUser": 1450,
//         "star": 132,
//         "like": 183,
//         "message": 19,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-1",
//         "owner": "曲丽丽",
//         "title": "Angular",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",
//         "status": "exception",
//         "percent": 94,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731473816535,
//         "createdAt": 1731473816535,
//         "subDescription": "希望是一个好东西，也许是最好的，好东西是不会消亡的",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 162148,
//         "newUser": 1625,
//         "star": 168,
//         "like": 145,
//         "message": 19,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-2",
//         "owner": "林东东",
//         "title": "Ant Design",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png",
//         "status": "normal",
//         "percent": 67,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731466616535,
//         "createdAt": 1731466616535,
//         "subDescription": "生命就像一盒巧克力，结果往往出人意料",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 125874,
//         "newUser": 1633,
//         "star": 129,
//         "like": 115,
//         "message": 11,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-3",
//         "owner": "周星星",
//         "title": "Ant Design Pro",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png",
//         "status": "active",
//         "percent": 99,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731459416535,
//         "createdAt": 1731459416535,
//         "subDescription": "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 105263,
//         "newUser": 1882,
//         "star": 161,
//         "like": 134,
//         "message": 13,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-4",
//         "owner": "吴加好",
//         "title": "Bootstrap",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png",
//         "status": "exception",
//         "percent": 78,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731452216535,
//         "createdAt": 1731452216535,
//         "subDescription": "那时候我只会想自己想要什么，从不想自己拥有什么",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 151595,
//         "newUser": 1621,
//         "star": 101,
//         "like": 188,
//         "message": 13,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-5",
//         "owner": "朱偏右",
//         "title": "React",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png",
//         "status": "normal",
//         "percent": 67,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731445016535,
//         "createdAt": 1731445016535,
//         "subDescription": "那是一种内在的东西， 他们到达不了，也无法触及的",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 182535,
//         "newUser": 1961,
//         "star": 155,
//         "like": 177,
//         "message": 19,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-6",
//         "owner": "鱼酱",
//         "title": "Vue",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",
//         "status": "active",
//         "percent": 70,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731437816535,
//         "createdAt": 1731437816535,
//         "subDescription": "希望是一个好东西，也许是最好的，好东西是不会消亡的",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 169820,
//         "newUser": 1373,
//         "star": 138,
//         "like": 190,
//         "message": 11,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-7",
//         "owner": "乐哥",
//         "title": "Webpack",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
//         "status": "exception",
//         "percent": 76,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731430616535,
//         "createdAt": 1731430616535,
//         "subDescription": "生命就像一盒巧克力，结果往往出人意料",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 199343,
//         "newUser": 1956,
//         "star": 177,
//         "like": 173,
//         "message": 14,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-8",
//         "owner": "谭小仪",
//         "title": "Alipay",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
//         "status": "normal",
//         "percent": 71,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731423416535,
//         "createdAt": 1731423416535,
//         "subDescription": "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 148122,
//         "newUser": 1173,
//         "star": 164,
//         "like": 109,
//         "message": 20,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-9",
//         "owner": "仲尼",
//         "title": "Angular",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",
//         "status": "active",
//         "percent": 72,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731416216535,
//         "createdAt": 1731416216535,
//         "subDescription": "那时候我只会想自己想要什么，从不想自己拥有什么",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 146093,
//         "newUser": 1467,
//         "star": 193,
//         "like": 177,
//         "message": 18,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-10",
//         "owner": "付小小",
//         "title": "Ant Design",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png",
//         "status": "exception",
//         "percent": 79,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731409016535,
//         "createdAt": 1731409016535,
//         "subDescription": "那是一种内在的东西， 他们到达不了，也无法触及的",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 198698,
//         "newUser": 1436,
//         "star": 199,
//         "like": 157,
//         "message": 15,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-11",
//         "owner": "曲丽丽",
//         "title": "Ant Design Pro",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png",
//         "status": "normal",
//         "percent": 64,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731401816535,
//         "createdAt": 1731401816535,
//         "subDescription": "希望是一个好东西，也许是最好的，好东西是不会消亡的",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 102014,
//         "newUser": 1304,
//         "star": 162,
//         "like": 147,
//         "message": 19,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-12",
//         "owner": "林东东",
//         "title": "Bootstrap",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png",
//         "status": "active",
//         "percent": 63,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731394616535,
//         "createdAt": 1731394616535,
//         "subDescription": "生命就像一盒巧克力，结果往往出人意料",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 173301,
//         "newUser": 1055,
//         "star": 179,
//         "like": 182,
//         "message": 18,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-13",
//         "owner": "周星星",
//         "title": "React",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png",
//         "status": "exception",
//         "percent": 98,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731387416535,
//         "createdAt": 1731387416535,
//         "subDescription": "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 157788,
//         "newUser": 1013,
//         "star": 158,
//         "like": 198,
//         "message": 16,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-14",
//         "owner": "吴加好",
//         "title": "Vue",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",
//         "status": "normal",
//         "percent": 86,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731380216535,
//         "createdAt": 1731380216535,
//         "subDescription": "那时候我只会想自己想要什么，从不想自己拥有什么",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 114946,
//         "newUser": 1969,
//         "star": 167,
//         "like": 115,
//         "message": 14,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-15",
//         "owner": "朱偏右",
//         "title": "Webpack",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
//         "status": "active",
//         "percent": 66,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731373016535,
//         "createdAt": 1731373016535,
//         "subDescription": "那是一种内在的东西， 他们到达不了，也无法触及的",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 155900,
//         "newUser": 1184,
//         "star": 146,
//         "like": 145,
//         "message": 14,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-16",
//         "owner": "鱼酱",
//         "title": "Alipay",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
//         "status": "exception",
//         "percent": 79,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731365816535,
//         "createdAt": 1731365816535,
//         "subDescription": "希望是一个好东西，也许是最好的，好东西是不会消亡的",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 191159,
//         "newUser": 1860,
//         "star": 151,
//         "like": 197,
//         "message": 12,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-17",
//         "owner": "乐哥",
//         "title": "Angular",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",
//         "status": "normal",
//         "percent": 85,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731358616535,
//         "createdAt": 1731358616535,
//         "subDescription": "生命就像一盒巧克力，结果往往出人意料",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 121731,
//         "newUser": 1997,
//         "star": 192,
//         "like": 172,
//         "message": 11,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-18",
//         "owner": "谭小仪",
//         "title": "Ant Design",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png",
//         "status": "active",
//         "percent": 60,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731351416535,
//         "createdAt": 1731351416535,
//         "subDescription": "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 124426,
//         "newUser": 1995,
//         "star": 103,
//         "like": 108,
//         "message": 11,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-19",
//         "owner": "仲尼",
//         "title": "Ant Design Pro",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png",
//         "status": "exception",
//         "percent": 96,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731344216535,
//         "createdAt": 1731344216535,
//         "subDescription": "那时候我只会想自己想要什么，从不想自己拥有什么",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 191380,
//         "newUser": 1731,
//         "star": 156,
//         "like": 183,
//         "message": 14,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-20",
//         "owner": "付小小",
//         "title": "Bootstrap",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png",
//         "status": "normal",
//         "percent": 73,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731337016535,
//         "createdAt": 1731337016535,
//         "subDescription": "那是一种内在的东西， 他们到达不了，也无法触及的",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 193427,
//         "newUser": 1526,
//         "star": 109,
//         "like": 144,
//         "message": 19,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-21",
//         "owner": "曲丽丽",
//         "title": "React",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png",
//         "status": "active",
//         "percent": 87,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731329816535,
//         "createdAt": 1731329816535,
//         "subDescription": "希望是一个好东西，也许是最好的，好东西是不会消亡的",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 133610,
//         "newUser": 1828,
//         "star": 154,
//         "like": 110,
//         "message": 13,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-22",
//         "owner": "林东东",
//         "title": "Vue",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",
//         "status": "exception",
//         "percent": 81,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731322616535,
//         "createdAt": 1731322616535,
//         "subDescription": "生命就像一盒巧克力，结果往往出人意料",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 196284,
//         "newUser": 1256,
//         "star": 168,
//         "like": 169,
//         "message": 12,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-23",
//         "owner": "周星星",
//         "title": "Webpack",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
//         "status": "normal",
//         "percent": 55,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731315416535,
//         "createdAt": 1731315416535,
//         "subDescription": "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 173694,
//         "newUser": 1673,
//         "star": 145,
//         "like": 118,
//         "message": 15,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-24",
//         "owner": "吴加好",
//         "title": "Alipay",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
//         "status": "active",
//         "percent": 65,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731308216535,
//         "createdAt": 1731308216535,
//         "subDescription": "那时候我只会想自己想要什么，从不想自己拥有什么",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 142738,
//         "newUser": 1723,
//         "star": 181,
//         "like": 128,
//         "message": 12,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-25",
//         "owner": "朱偏右",
//         "title": "Angular",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",
//         "status": "exception",
//         "percent": 72,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731301016535,
//         "createdAt": 1731301016535,
//         "subDescription": "那是一种内在的东西， 他们到达不了，也无法触及的",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 179311,
//         "newUser": 1967,
//         "star": 104,
//         "like": 136,
//         "message": 20,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-26",
//         "owner": "鱼酱",
//         "title": "Ant Design",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png",
//         "status": "normal",
//         "percent": 72,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731293816535,
//         "createdAt": 1731293816535,
//         "subDescription": "希望是一个好东西，也许是最好的，好东西是不会消亡的",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 167277,
//         "newUser": 1899,
//         "star": 172,
//         "like": 167,
//         "message": 12,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-27",
//         "owner": "乐哥",
//         "title": "Ant Design Pro",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png",
//         "status": "active",
//         "percent": 57,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731286616535,
//         "createdAt": 1731286616535,
//         "subDescription": "生命就像一盒巧克力，结果往往出人意料",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 132828,
//         "newUser": 1759,
//         "star": 109,
//         "like": 133,
//         "message": 20,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-28",
//         "owner": "谭小仪",
//         "title": "Bootstrap",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png",
//         "status": "exception",
//         "percent": 67,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731279416535,
//         "createdAt": 1731279416535,
//         "subDescription": "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 191147,
//         "newUser": 1104,
//         "star": 131,
//         "like": 130,
//         "message": 15,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     },
//     {
//         "id": "fake-list-29",
//         "owner": "仲尼",
//         "title": "React",
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
//         "cover": "https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png",
//         "status": "normal",
//         "percent": 66,
//         "logo": "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
//         "href": "https://ant.design",
//         "updatedAt": 1731272216535,
//         "createdAt": 1731272216535,
//         "subDescription": "那时候我只会想自己想要什么，从不想自己拥有什么",
//         "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//         "activeUser": 119307,
//         "newUser": 1614,
//         "star": 182,
//         "like": 190,
//         "message": 12,
//         "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//         "members": [
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//                 "name": "曲丽丽",
//                 "id": "member1"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//                 "name": "王昭君",
//                 "id": "member2"
//             },
//             {
//                 "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//                 "name": "董娜娜",
//                 "id": "member3"
//             }
//         ]
//     }
// ]


const titles = [
    'Alipay',
    'Angular',
    'Ant Design',
    'Ant Design Pro',
    'Bootstrap',
    'React',
    'Vue',
    'Webpack',
];
const avatars = [
    'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
    'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
    'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
    'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
    'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
    'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
    'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
    'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];

const covers = [
    'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
    'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
    'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
    'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
    '那是一种内在的东西， 他们到达不了，也无法触及的',
    '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    '生命就像一盒巧克力，结果往往出人意料',
    '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    '那时候我只会想自己想要什么，从不想自己拥有什么',
];

const user = [
    '付小小',
    '曲丽丽',
    '林东东',
    '周星星',
    '吴加好',
    '朱偏右',
    '鱼酱',
    '乐哥',
    '谭小仪',
    '仲尼',
];

// 当前用户信息
const currentUseDetail = {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
        {
            key: '0',
            label: '很有想法的',
        },
        {
            key: '1',
            label: '专注设计',
        },
        {
            key: '2',
            label: '辣~',
        },
        {
            key: '3',
            label: '大长腿',
        },
        {
            key: '4',
            label: '川妹子',
        },
        {
            key: '5',
            label: '海纳百川',
        },
    ],
    notice: [
        {
            id: 'xxx1',
            title: titles[0],
            logo: avatars[0],
            description: '那是一种内在的东西，他们到达不了，也无法触及的',
            updatedAt: new Date(),
            member: '科学搬砖组',
            href: '',
            memberLink: '',
        },
        {
            id: 'xxx2',
            title: titles[1],
            logo: avatars[1],
            description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
            updatedAt: new Date('2017-07-24'),
            member: '全组都是吴彦祖',
            href: '',
            memberLink: '',
        },
        {
            id: 'xxx3',
            title: titles[2],
            logo: avatars[2],
            description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
            updatedAt: new Date(),
            member: '中二少女团',
            href: '',
            memberLink: '',
        },
        {
            id: 'xxx4',
            title: titles[3],
            logo: avatars[3],
            description: '那时候我只会想自己想要什么，从不想自己拥有什么',
            updatedAt: new Date('2017-07-23'),
            member: '程序员日常',
            href: '',
            memberLink: '',
        },
        {
            id: 'xxx5',
            title: titles[4],
            logo: avatars[4],
            description: '凛冬将至',
            updatedAt: new Date('2017-07-23'),
            member: '高逼格设计天团',
            href: '',
            memberLink: '',
        },
        {
            id: 'xxx6',
            title: titles[5],
            logo: avatars[5],
            description: '生命就像一盒巧克力，结果往往出人意料',
            updatedAt: new Date('2017-07-23'),
            member: '骗你来学计算机',
            href: '',
            memberLink: '',
        },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    geographic: {
        province: {
            label: '浙江省',
            key: '330000',
        },
        city: {
            label: '杭州市',
            key: '330100',
        },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
};

function fakeList(count: number): any[] {
    const list: any[] = [];
    for (let i = 0; i < count; i += 1) {
        list.push({
            id: `fake-list-${i}`,
            owner: user[i % 10],
            title: titles[i % 8],
            avatar: avatars[i % 8],
            cover: parseInt(`${i / 4}`, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
            status: ['active', 'exception', 'normal'][i % 3] as
                | 'normal'
                | 'exception'
                | 'active'
                | 'success',
            percent: Math.ceil(Math.random() * 50) + 50,
            logo: avatars[i % 8],
            href: 'https://ant.design',
            updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
            createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
            subDescription: desc[i % 5],
            description:
                '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
            activeUser: Math.ceil(Math.random() * 100000) + 100000,
            newUser: Math.ceil(Math.random() * 1000) + 1000,
            star: Math.ceil(Math.random() * 100) + 100,
            like: Math.ceil(Math.random() * 100) + 100,
            message: Math.ceil(Math.random() * 10) + 10,
            content:
                '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
            members: [
                {
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
                    name: '曲丽丽',
                    id: 'member1',
                },
                {
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
                    name: '王昭君',
                    id: 'member2',
                },
                {
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
                    name: '董娜娜',
                    id: 'member3',
                },
            ],
        });
    }

    return list;
}

//   function getFakeList(req: Request, res: Response) {
//     const params = req.query as any;

//     const count = Number(params.count) * 1 || 5;

//     const result = fakeList(count);
//     return res.json({
//       data: {
//         list: result,
//       },
//     });
//   }

//   // 获取用户信息
//   function getCurrentUser(req: Request, res: Response) {
//     return res.json({
//       data: currentUseDetail,
//     });
//   }

export default [
    {
        url: "/api/1.0/account/setting/current_user",
        method: "get",
        response: (request) => {
            // console.log(request.headers.token)
            return {
                code: 0,
                message: "ok",
                // data: user_info,
                data: currentUseDetail
            }
        }
    },
    {
        url: "/api/1.0/info",
        method: "get",
        response: (request) => {
            console.log(request.headers.token)
            return {
                code: 0,
                message: "ok",
                data: user_info,
            }
        }
    },
    {
        url: "/api/1.0/login",
        method: "post",
        response: ({ body }) => {
            const { username, password } = body
            const isUser = user_list.find(r => r.username === username && r.password === password)
            if (!isUser) {
                return {
                    code: 201,
                    message: "账号或者密码不正确",
                    data: null,
                }
            }
            return {
                code: 0,
                message: "ok",
                data: {
                    token: JSON.stringify(body)
                },
            }
        }
    },
    {
        url: "/api/1.0/logout",
        method: "post",
        response: ({ body }) => {
            return {
                code: 0,
                message: "ok",
                data: null,
            }
        }
    },

    {
        url: "/api/1.0/user/fake_list_detail",
        method: "get",
        response: (request) => {
            console.log(request.query.count)
            const count = request.query.count
            let data = fakeList(count)
            // if (count > 0) {
            //     data = fake_list_detail.slice(0, count)
            // }
            return {
                code: 0,
                message: "ok",
                data: data,
            }
        }
    },
    {
        url: "/api/1.0/user/current_user_detail",
        method: "get",
        response: (request) => {
            console.log(request.headers.token)
            return {
                code: 0,
                message: "ok",
                data: current_user_detail,
            }
        }
    }
]
