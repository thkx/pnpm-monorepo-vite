import { request } from "@/utils/request";

import type { CardListItemDataType } from "./data.d";

export function queryCardFakeList(count: number) {
    return request<{ list: CardListItemDataType[] }>({
        method: 'get',
        url: '/api/1.0/list/card_fake_list',
        params: { count }
    })
}

