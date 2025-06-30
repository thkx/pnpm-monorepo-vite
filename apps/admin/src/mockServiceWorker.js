let token = null

// 公共前缀
const BASE_PATH = '/api/1.0/';
// 需要缓存的公共路径
const CACHE_PATH = 'login'

globalThis.addEventListener('fetch', event => {
    // if (!mockConfig.enabled) {
    //     return;
    // }

    const request = new Request(event.request);
    const url = new URL(request.url);

    if (url.pathname.includes(BASE_PATH)) {
        // console.log(request)
        console.log(url.pathname)
        // console.log(event)

        // console.log("body: ", request.body ? request.body.values() : request.body)

        // const headers = new Headers({...request.headers})
        // headers.set('th-kx', "1234567890")

        request.headers.set('th-kx', "1234567890")

        if (token) {
            request.headers.set('th-kx-token', token)
        }
        
        // request.headers['th-kx'] = "123456789"

        // 创建新的请求并转发
        // const mockRequest = new Request(url.href, {
        //     method: request.method,
        //     headers: headers,
        //     body: request.body,
        //     mode: 'cors',
        //     credentials: 'include'
        // });
        const mockRequest = request.clone()
        // mockRequest.headers = headers
        // mockRequest.headers().set("th-kx", "1234567890")
        // console.log("request.headers: ", request.headers)
        // console.log(mockRequest.headers)
        // mockRequest.headers = headers

        event.respondWith(
            fetch(mockRequest)
                .then(async response => {
                    if (url.pathname.includes(BASE_PATH + CACHE_PATH)) {
                        const responseClone = await response.clone().json()
                        if (responseClone.code === 0) {
                            token = responseClone.data.token
                        }
                    }

                    return response.clone()
                })
                .catch(error => {
                    return new Response(
                        JSON.stringify({
                            error: 'Mock server error',
                            message: error.message
                        }),
                        {
                            status: 500,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                })
        );
    }


    // // 检查是否需要 mock
    // const matchedPrefix = mockConfig.apiPrefixes.find(prefix => url.pathname.includes(prefix));
    // const hasExcludePrefix = mockConfig.excludePrefixes.some(prefix => url.pathname.includes(prefix));
    // const shouldMock = matchedPrefix && !hasExcludePrefix;

    // if (!shouldMock) {
    //     return;
    // }

    // // 从原始 URL 中提取出以 prefix 开始的部分作为路径
    // const prefixIndex = url.href.indexOf(matchedPrefix);
    // const mockPath = url.href.slice(prefixIndex);

    // // 构建转发到 mock 服务器的 URL
    // const mockUrl = mockConfig.mockServerUrl + mockPath;

    // // 创建新的请求并转发
    // const mockRequest = new Request(mockUrl, {
    //     method: request.method,
    //     headers: request.headers,
    //     body: request.body,
    //     mode: 'cors',
    //     credentials: 'include'
    // });

    // event.respondWith(
    //     fetch(mockRequest)
    //         .then(response => response.clone())
    //         .catch(error => {
    //             return new Response(
    //                 JSON.stringify({
    //                     error: 'Mock server error',
    //                     message: error.message
    //                 }),
    //                 {
    //                     status: 500,
    //                     headers: {
    //                         'Content-Type': 'application/json'
    //                     }
    //                 }
    //             );
    //         })
    // );
});

const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v2");
    await cache.addAll(resources);
};

globalThis.addEventListener("install", (event) => {
    console.log("install: ", event)
    event.waitUntil(
        addResourcesToCache([]),
    );
});

