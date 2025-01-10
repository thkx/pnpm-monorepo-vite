<template>

    <IntroduceRow :loading="loading" :visitData="data?.visitData || []" />

    <SalesCard :rangePickerValue="rangePickerValue" :salesData="data?.salesData || []"
        :handleRangePickerChange="handleRangePickerChange" :loading="loading" />


    <a-row :gutter="24" style="margin-top: 24px;">
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
            <TopSearch :loading="loading" :visitData2="data?.visitData2 || []" :searchData="data?.searchData || []">
                <template #dropdownGroup>
                    <span class="iconGroup">
                        <a-dropdown placement="bottomRight">
                            <EllipsisOutlined />
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item key="1">操作一</a-menu-item>
                                    <a-menu-item key="2">操作二</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </span>
                </template>
            </TopSearch>

        </a-col>
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">

            <ProportionSales v-model:salesType="salesType" :loading="loading" :salesPieData="salesPieData || []"
                :handleChangeSalesType="handleChangeSalesType">
                <template #dropdownGroup>
                    <span class="iconGroup">
                        <a-dropdown placement="bottomRight">
                            <EllipsisOutlined />
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item key="1">操作一</a-menu-item>
                                    <a-menu-item key="2">操作二</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </span>
                </template>
            </ProportionSales>

        </a-col>
    </a-row>
    <OfflineData :activeKey="activeKey" :loading="loading" :offlineData="data?.offlineData || []"
        :offlineChartData="data?.offlineChartData || []" :handleTabChange="handleTabChange" />

</template>
<script lang="ts" setup>
import { reactive, toRefs, defineAsyncComponent } from "vue";
import { EllipsisOutlined } from "@ant-design/icons-vue";

// import IntroduceRow from "./components/IntroduceRow/index.vue";
// import SalesCard from "./components/SalesCard/index.vue";
// import ProportionSales from "./components/ProportionSales/index.vue";
// import TopSearch from "./components/TopSearch/index.vue";
// import OfflineData from "./components/OfflineData/index.vue";

import { AnalysisData } from "./data.d";
import { fakeChartData } from "./service";
import dayjs from "dayjs";

const IntroduceRow = defineAsyncComponent({
    loader: () => import('./components/IntroduceRow/index.vue'),
    // delay: 3000,
    // timeout: 3000,
})
const SalesCard = defineAsyncComponent({
    loader: () => import('./components/SalesCard/index.vue'),
    // delay: 3000,
    // timeout: 3000,
})
const ProportionSales = defineAsyncComponent(() => import('./components/ProportionSales/index.vue'))
const TopSearch = defineAsyncComponent({
    loader: () => import('./components/TopSearch/index.vue'),
    // delay: 3000,
    // timeout: 3000,
})
const OfflineData = defineAsyncComponent(() => import('./components/OfflineData/index.vue'))

type FormState = {
    loading: boolean;
    data?: AnalysisData;
    rangePickerValue: dayjs.Dayjs[];

    salesType: string;
    salesPieData: any;

    activeKey: string;
}

const state = reactive<FormState>({
    loading: true,
    data: undefined,
    rangePickerValue: [dayjs(new Date()), dayjs(new Date())],

    salesType: 'all',
    salesPieData: [],

    activeKey: '',
})

const { loading, data, rangePickerValue, salesType, salesPieData, activeKey } = toRefs(state)

function handleRangePickerChange(date: dayjs.Dayjs | string, dateString: string) {
    console.log(date, dateString)
}

function handleChangeSalesType() {
    // console.log(e)
    const map: { [key: string]: any[] } = {
        all: data?.value?.salesTypeData,
        online: data?.value?.salesTypeDataOnline,
        stores: data?.value?.salesTypeDataOffline
    }
    salesPieData.value = map[salesType.value]
    // data?.salesTypeData
}

function handleTabChange(key: string) {
    console.log(key)
}

async function getData() {
    loading.value = true
    const [err, resp] = await fakeChartData()
    if (!err) {
        data!.value = resp

        // const offlineChartData = Array.from(data?.value?.offlineChartData).reduce((pre: any, curr: any) => {
        //     pre[curr.date] = !pre[curr.date] ? [curr] : [...pre[curr.date], curr]
        //     return pre
        // }, {} as any)

        // console.log(offlineChartData)

        handleChangeSalesType()

        activeKey.value = (data?.value?.offlineData[0] && data?.value?.offlineData[0].name) || ''
    }

    loading.value = false
}

getData()

</script>
<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}

.iconGroup span.anticon {
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.65);
    cursor: pointer;
    transition: color 0.32s;
}

.iconGroup span.anticon:hover {
    color: rgba(0, 0, 0, 0.88);
}
</style>