
import { request } from "@/utils/request";

import type { Params } from './data.d';

export function fakeSubmitForm(params: Params) {
    return request<{ message: string }>({
        method: 'post',
        url: '/api/1.0/basicForm',
        data: params
    })
}