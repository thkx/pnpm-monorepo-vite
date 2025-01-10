import { request } from "@/utils/request";

import type { Params } from './data.d';

// /api/1.0/advancedForm
export function fakeAdvancedForm(params: Params) {
    return request<{ message: string }>({
        method: 'post',
        url: '/api/1.0/advancedForm',
        data: params
    })
}