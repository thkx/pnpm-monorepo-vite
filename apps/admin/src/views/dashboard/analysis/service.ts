import { request } from "@/utils/request";

import type { AnalysisData } from './data.d';

export async function fakeChartData() {
    return request<AnalysisData>({
        url: '/api/1.0/fake_analysis_chart_data',
    });
}

