import { request } from "@/utils/request";

import type { ActivitiesType, AnalysisData, NoticeType } from './data.d';

export async function queryProjectNotice() {
    return request<NoticeType[]>({
        url: '/api/1.0/project/notice'
    });
}

export async function queryActivities() {
    return request<ActivitiesType[]>({
        url: '/api/1.0/activities'
    });
}

export async function fakeChartData() {
    return request<AnalysisData>({
        url: '/api/1.0/fake_workplace_chart_data'
    });
}