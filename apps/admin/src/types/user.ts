type BaseState = {
    key: string,
    label: string
}

export type TagState = BaseState

export type UserInfoState = {
    name?: string,
    avatar?: string,
    userid?: string,
    email?: string,
    signature?: string,
    title?: string,
    group?: string,
    tags?: TagState[],
    notifyCount?: number,
    unreadCount?: number,
    country?: string,
    geographic?: {
        province: BaseState,
        city: BaseState,
    },
    address?: string,
    phone?: string,
}