import { request } from "@/utils/request";
import type { ListItemDataType, CurrentUser } from "./data.d";

export function fakeListDetail() {
    return request<ListItemDataType[]>({
        method: 'get',
        url: '/api/1.0/user/fake_list_detail?count=30'
    })
}

export function currentUserDetail() {
    return request<CurrentUser>({
        method: 'get',
        url: '/api/1.0/user/current_user_detail'
    })
}