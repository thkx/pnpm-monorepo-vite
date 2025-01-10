import { request } from "@/utils/request";

import type { UserInfoState } from "@/types/user";
import type { LoginFormState, LoginResponse } from "@/types/login";

export function getUserInfo() {
    return request<UserInfoState>({
        method: 'get',
        url: '/api/1.0/info'
    })
}

export function Login(data: LoginFormState) {
    return request<LoginResponse>({
        method: 'post',
        url: '/api/1.0/login',
        data: data
    })
}

export function Logout() {
    return request({
        method: 'post',
        url: '/api/1.0/logout',
    })
}

