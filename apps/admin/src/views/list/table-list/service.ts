import { request } from "@/utils/request";

import type { TableListParams, TableListItem, TableListPagination } from "./data.d";

export function queryRuleList(params: TableListParams & Partial<TableListPagination>) {
    const _params: any = { ...params }
    if (params.filter) {
        // delete params.filter.column
        _params.filter = JSON.stringify(params.filter)
    }
    if (params.sorter) {
        delete params.sorter.column
        _params.sorter = JSON.stringify(params.sorter)
    }
    return request<{ current: number, data: TableListItem[], pageSize: number, success: boolean, total: number }>({
        method: 'get',
        url: '/api/1.0/list/rule',
        params: _params
    })
}

export function removeRuleList(key: string | string[]) {
    return request<{ message: string }>({
        method: 'post',
        url: '/api/1.0/list/rule',
        data: { key, method: 'delete', }
    })
}

export function addRuleList(data: { name: string, desc: string }) {
    return request<{ message: string }>({
        method: 'post',
        url: '/api/1.0/list/rule',
        data: { ...data, method: 'post' },
    })
}

export function updateRuleList(data: { name: string, desc: string }) {
    return request<{ message: string }>({
        method: 'post',
        url: '/api/1.0/list/rule',
        data: { ...data, method: 'update' },
    })
}

