import { request } from "@/utils/request";

import type { ListItemDataType, Params } from './data.d';

export function fakeListDetail(params: Params) {
    return request<ListItemDataType[]>({
        method: 'get',
        url: '/api/1.0/user/fake_list_detail',
        params,
    })
}
