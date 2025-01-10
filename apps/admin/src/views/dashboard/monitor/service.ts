import { request } from "@/utils/request";

import type { TagType } from './data.d';

export async function queryTags() {
    return request<{ list: TagType[] }>({
        url: '/api/1.0/tags'
    });
}