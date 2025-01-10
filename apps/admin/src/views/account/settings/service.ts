import { request } from "@/utils/request";
import type { GeographicItemType, CurrentUser } from './data.d';

export function getProvince() {
    return request<{ province: GeographicItemType[] }>({
        method: 'get',
        url: '/api/1.0/geographic/province',
    })
}

export function getCity(code: string) {
    return request<{ city: GeographicItemType[] }>({
        method: 'get',
        url: '/api/1.0/geographic/city',
        params: { code }
    })
}

export function getCurrentUser() {
    return request<CurrentUser>({
        method: 'get',
        url: '/api/1.0/account/setting/current_user',
    })
}