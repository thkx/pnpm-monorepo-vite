import { request } from "@/utils/request";
import type { AdvancedProfileData } from "./data.d";

export function advanced() {
    return request<AdvancedProfileData>({
        method: 'get',
        url: '/api/1.0/profile/advanced',
    })
}
