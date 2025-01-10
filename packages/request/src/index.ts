import { AxiosResponse } from 'axios'

import Request from './request'

import type { RequestConfig, CreateRequestConfig } from './request'

import { handleRequestHeader, handleAuth, handleAuthError, handleGeneralError, useMessage } from './tools'

type Response<T> = {
    code: number,
    data: T,
    message: string,
} & AxiosResponse<T>

type ResponseReturn = {
    request: <T>(config: RequestConfig<Response<T>>) => Promise<[unknown, T | undefined]>;
    cancelAllRequest: () => void;
    cancelRequest: (url: string | string[]) => void;
}

export { useMessage }

export default (config: CreateRequestConfig): ResponseReturn => {
    const request = new Request({
        // baseURL: import.meta.env.BASE_URL,
        timeout: 1000 * 60 * 5,
        interceptors: {
            // 请求拦截器
            requestInterceptors: config => {
                // console.log("requestInterceptors", config.url)
                config = handleRequestHeader(config)
                config = handleAuth(config)
                return config
            },
            // 响应拦截器
            responseInterceptors: (response: AxiosResponse) => {
                // console.log("responseInterceptors", response.config.url)
                handleAuthError(response.data.code)
                handleGeneralError(response.data.code, response.data.message)
                return response
            },
        },
        ...config
    })

    const server = <T>(config: RequestConfig<Response<T>>): Promise<[unknown, T | undefined]> => {
        return new Promise((resolve, reject) => {
            request.request(config).then(response => {
                // console.log(response.code)
                if (response.code !== 0) {
                    resolve([response.message, undefined])
                } else {
                    resolve([null, response.data])
                }
            }).catch(error => {
                reject([error, undefined])
            })
        })
    }

    return { request: server, cancelAllRequest: request.cancelAllRequest, cancelRequest: request.cancelRequest }
}
