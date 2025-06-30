// import { AxiosResponse } from 'axios'

// import Request, { type RequestConfig } from './request'

// import { handleRequestHeader, handleAuth, handleAuthError, handleGeneralError } from './tools'


// const request = new Request({
//     baseURL: import.meta.env.BASE_URL,
//     timeout: 1000 * 60 * 5,
//     interceptors: {
//         // 请求拦截器
//         requestInterceptors: config => {
//             config = handleRequestHeader(config)
//             config = handleAuth(config)
//             return config
//         },
//         // 响应拦截器
//         responseInterceptors: (response: AxiosResponse) => {
//             handleAuthError(response.data.code)
//             handleGeneralError(response.data.code, response.data.message)
//             return response
//         },
//     },
// })

// type Response<T> = {
//     code: number,
//     data: T,
//     message: string,
// } & AxiosResponse<T>

// export default <T>(config: RequestConfig<Response<T>>): Promise<[any, T | undefined]> => {
//     return new Promise((resolve, reject) => {
//         request.request(config).then(response => {
//             // console.log(response.code)
//             if (response.code !== 0) {
//                 resolve([response.message, undefined])
//             } else {
//                 resolve([null, response.data])
//             }
//         }).catch(error => {
//             reject([error, undefined])
//         })
//     })
// }

import { message } from "ant-design-vue";
import server, { useMessage } from "@pnpm-monorepo-vite/request";

useMessage(message)

const { request, cancelAllRequest, cancelRequest } = server({ baseURL: import.meta.env.BASE_URL, })

export { request, cancelAllRequest, cancelRequest }

export function to<T>(promise: Promise<T>): Promise<[Error | null, T | undefined]> {
    return promise.then<[null, T]>((data: T) => [null, data]).catch<[Error, undefined]>((err: Error) => [err, undefined])
}

