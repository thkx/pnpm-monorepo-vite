import { request } from "@/utils/request";


export function error() {
    return request({
        method: 'GET',
        url: '/api/1.0/error'
    })
}
