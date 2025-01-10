import { request } from "@/utils/request";

export function getRouters() {
    return request<{ rows: any }>({
        method: 'get',
        url: '/api/1.0/routers'
    })
}
