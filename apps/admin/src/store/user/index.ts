import { reactive, toRefs } from "vue";

import { LoginFormState } from '@/types/login'
import { UserInfoState } from "@/types/user"

import { getUserInfo, Login } from "@/api/user";

type UserState = {
    token: string,
    roles: string[],
    info: UserInfoState,
    permissions: string[],
}

const state = reactive<UserState>({
    token: sessionStorage.getItem('token') || '',
    roles: [],
    info: {},
    permissions: [],
})

const { token, roles, info, permissions } = toRefs(state)

function setToken(value: string) {
    sessionStorage.setItem('token', value)
    token.value = value
}

function setRoles(value: string[]) {
    roles.value = value
}

function setInfo(value: UserInfoState) {
    info.value = value
}

function setPermissions(value: string[]) {
    permissions.value = value
}

async function login(data: LoginFormState) {
    const [err, response] = await Login(data)
    if (!err && response) {
        setToken(response?.token!)
    }

    return err
}

function logout() {
    setToken('')
    sessionStorage.removeItem('token')
}

async function getInfo() {
    const [err, response] = await getUserInfo()
    if (!err) {
        setInfo(response || {})

        setRoles(['*:*:*'])
        setPermissions([])
    }
}

export function useUserStore() {
    return { token, roles, info, permissions, setToken, setRoles, setInfo, setPermissions, getInfo, login, logout }
}

