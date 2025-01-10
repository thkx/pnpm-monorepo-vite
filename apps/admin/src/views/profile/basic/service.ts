import { request } from "@/utils/request";
import type { BasicGood, BasicProgress } from "./data.d";

export function basic() {
    return request<{ basicGoods: BasicGood[], basicProgress: BasicProgress[] }>({
        method: 'get',
        url: '/api/1.0/profile/basic',
    })
}
