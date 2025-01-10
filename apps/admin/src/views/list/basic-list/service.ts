import { request } from "@/utils/request";

import type { BasicListItemDataType } from "./data.d";

export function queryFakeList(count: number) {
    return request<{ list: BasicListItemDataType[] }>({
        method: 'get',
        url: '/api/1.0/list/get_list',
        params: { count }
    })
}

export function removeFakeList(id: string) {
    return request<{ list: BasicListItemDataType[] }>({
        method: 'post',
        url: '/api/1.0/list/post_fake_list',
        data: { id, method: 'delete', }
    })
}

export function addFakeList(data: BasicListItemDataType) {
    return request<{ list: BasicListItemDataType[] }>({
        method: 'post',
        url: '/api/1.0/list/post_fake_list',
        data: { ...data, method: 'post' },
    })
}

export function updateFakeList(data: BasicListItemDataType) {
    return request<{ list: BasicListItemDataType[] }>({
        method: 'post',
        url: '/api/1.0/list/post_fake_list',
        data: { ...data, method: 'update' },
    })
}
