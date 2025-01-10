<template>

    <a-card :loading="loading" :bordered="false" :bodyStyle="{ padding: 0, }">
        <div class="salesCard">
            <a-tabs v-model:activeKey="activeKey" size="large" :tabBarStyle="{ marginBottom: '24px' }"
                @change="handleChange">
                <template #rightExtra>
                    <div class="salesExtraWrap">
                        <div class="salesExtra">
                            <a class="today" @click="selectDate('today')">今日</a>
                            <a class="week" @click="selectDate('week')">本周</a>
                            <a class="month" @click="selectDate('month')">本月</a>
                            <a class="year" @click="selectDate('year')">本年</a>
                        </div>
                        <a-range-picker v-model:value="rangePickerValue" :locale="locale" @change="handleRangePickerChange"
                            style="width: 256px;" />
                    </div>
                </template>

                <a-tab-pane tab="销售额" key="sales">
                    <a-row>
                        <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                            <div class="salesBar">
                                <div id="salesColumn" ref="salesColumnContainer"></div>
                                <!-- <Column height={300} data={salesData} xField="x" yField="y" paddingBottom={12} axis={{ x: {
                                title: false, }, y: { title: false, gridLineDash: null, gridStroke: '#ccc' , }, }}
                                scale={{ x: { paddingInner: 0.4 }, }} tooltip={{ name: '销售量' , channel: 'y' , }} /> -->
                            </div>
                        </a-col>
                        <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                            <div class="salesRank">
                                <h4 class="rankingTitle">门店销售额排名</h4>
                                <ul class="rankingList">

                                    <li v-for="(item, i) in rankingListData" :key="item.title">
                                        <span :class="`rankingItemNumber ${i < 3 ? 'active' : ''}`">
                                            {{ i + 1 }}
                                        </span>
                                        <span class="rankingItemTitle" :title="item.title">
                                            {{ item.title }}
                                        </span>
                                        <span>{{ numeral(item.total).format('0,0') }}</span>
                                    </li>
                                </ul>
                            </div>
                        </a-col>
                    </a-row>
                </a-tab-pane>

                <a-tab-pane tab="访问量" key="views">
                    <a-row>
                        <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                            <div class="salesBar">
                                <div id="viewsColumn" ref="viewsColumnContainer"></div>
                                <!-- <Column height={300} data={salesData} xField="x" yField="y" paddingBottom={12} axis={{ x: {
                                title: false, }, y: { title: false, }, }} scale={{ x: { paddingInner: 0.4 }, }}
                                tooltip={{ name: '访问量' , channel: 'y' , }} /> -->
                            </div>
                        </a-col>
                        <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                            <div class="salesRank">
                                <h4 class="rankingTitle">门店访问量排名</h4>
                                <ul class="rankingList">
                                    <li v-for="(item, i) in rankingListData" :key="item.title">
                                        <span :class="`rankingItemNumber ${i < 3 ? 'active' : ''}`">
                                            {{ i + 1 }}
                                        </span>
                                        <span class="rankingItemTitle" :title="item.title">
                                            {{ item.title }}
                                        </span>
                                        <span>{{ numeral(item.total).format('0,0') }}</span>
                                    </li>
                                </ul>
                            </div>
                        </a-col>
                    </a-row>
                </a-tab-pane>
            </a-tabs>

        </div>
    </a-card>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted, onUnmounted } from "vue";
import numeral from "numeral";
import dayjs, { Dayjs } from "dayjs";

import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';

import { Column } from "@antv/g2plot";

import { DataItem } from '../../data.d'

type SalesCardProps = {
    loading: boolean;
    salesData: Array<DataItem>;
    // rangePickerValue: Array<Dayjs>;
    handleRangePickerChange: (date: Dayjs | string, dateString: string) => void;
}

const props = withDefaults(defineProps<SalesCardProps>(), { loading: false })

const rangePickerValue = ref<[Dayjs, Dayjs]>()
const activeKey = ref<string>('sales')

const salesColumnContainer = ref()
const salesPlotRef = ref<Column>()

const viewsColumnContainer = ref()
const viewsPlotRef = ref<Column>()

const rankingListData: {
    title: string;
    total: number;
}[] = [];

for (let i = 0; i < 7; i += 1) {
    rankingListData.push({
        title: `工专路 ${i} 号店`,
        total: 323234,
    });
}

function selectDate(type: string) {
    // console.log(type)
    const dateMap: { [key: string]: [Dayjs, Dayjs] } = {
        'today': [dayjs(), dayjs()],
        'week': [dayjs().startOf('week'), dayjs().endOf('week')],
        'month': [dayjs().startOf('month'), dayjs().endOf('month')],
        'year': [dayjs().startOf('year'), dayjs().endOf('year')]
    }
    rangePickerValue.value = dateMap[type]
}

function setSalesColumn() {
    const columnPlot = new Column(
        // 'salesColumn',
        salesColumnContainer.value,
        {
            xField: 'x',
            yField: 'y',
            height: 300,
            data: props.salesData,
            // padding: [0, 0, 12, 0],
            tooltip: {
                // title
                // title: '销售量',
                // channel: 'y',
            },
            xAxis: {
                title: null
            },
            yAxis: {
                // 隐藏 y 轴的辅助线
                grid: {
                    line: {
                        style: {
                            stroke: '#ddd',
                            lineDash: [0],
                            opacity: 0, // 设置为 0 表示不显示
                        },
                    },
                },
            },
            meta: {
                x: {
                    alias: '类别',
                },
                y: {
                    alias: '销售量',
                },
            },
            //  paddingBottom={12} axis={{ x: {
            //                         title: false, }, y: { title: false, gridLineDash: null, gridStroke: '#ccc' , }, }}
            //                         scale={{ x: { paddingInner: 0.4 }, }} tooltip={{ name: '销售量' , channel: 'y' , }}
        }
    )

    salesPlotRef.value = columnPlot

    columnPlot.render()
    // columnPlot2.render()
}

function setViewsColumn() {

    const columnPlot = new Column(
        // 'viewsColumn',
        viewsColumnContainer.value,
        {
            xField: 'x',
            yField: 'y',
            height: 300,
            data: props.salesData,
            // padding: [0, 0, 12, 0],
            tooltip: {
                title: '访问量',
                // channel: 'y',
            },
            xAxis: {
                title: null
            },
            yAxis: {
                title: null
            }
            // <Column height={300} data={salesData} xField="x" yField="y" paddingBottom={12} axis={{ x: {
            //                         title: false, }, y: { title: false, }, }} scale={{ x: { paddingInner: 0.4 }, }}
            //                         tooltip={{ name: '访问量' , channel: 'y' , }} /> 
        }
    )

    viewsPlotRef.value = columnPlot

    columnPlot.render()
    // columnPlot2.render()
}

function handleChange(key: string) {
    // console.log(key)
    if (key === 'sales') {
        salesPlotRef.value?.changeData(props.salesData)
    }

    if (key === 'views') {
        if (viewsPlotRef.value) {
            viewsPlotRef.value?.changeData(props.salesData)
            return
        }

        nextTick(() => setViewsColumn())
    }
}

// watch(() => activeKey.value, val => {
//     console.log(val)
//     // const title = val === 'sales' ? '销售量' : '访问量'
//     // setColumn(title)
//     // salesPlotRef.value?.changeData(props.salesData)
//     if (val === 'sales') {
//         salesPlotRef.value?.changeData(props.salesData)
//     } else {
//         if (viewsPlotRef.value) {
//             viewsPlotRef.value?.changeData(props.salesData)
//         } else {
//             nextTick(() => {
//                 setViewsColumn()
//             })
//         }
//     }
// })

// watch(() => props.salesData, val => {
//     // console.log("salesData: ", val)
//     if (val.length > 0) {
//         nextTick(() => {
//             setSalesColumn()
//         })

//     }
// })

onMounted(() => {
    salesColumnContainer.value && setSalesColumn()
})

onUnmounted(() => {
    salesPlotRef.value?.destroy()
    viewsPlotRef.value?.destroy()
})


</script>

<style>
.salesCard .ant-tabs-bar,
.salesCard .ant-tabs-nav-wrap {
    padding-left: 16px !important;

}

.salesCard .ant-tabs-bar .ant-tabs-nav .ant-tabs-tab,
.salesCard .ant-tabs-nav-wrap .ant-tabs-nav .ant-tabs-tab {
    padding-top: 16px !important;
    padding-bottom: 14px !important;
    line-height: 24px !important;
}

.salesCard .ant-tabs-extra-content {
    padding-right: 24px !important;
    line-height: 55px !important;
}

.salesCard .ant-card-head {
    position: relative !important;
}

.salesCard .ant-card-head-title {
    align-items: normal !important;
}
</style>

<style scoped>
.salesCard .salesBar {
    padding: 0 0 32px 32px;
}

.salesCard .salesRank {
    padding: 0 32px 32px 72px;
}


.salesCardExtra {
    height: inherit;
}

.salesTypeRadio {
    position: absolute;
    right: 54px;
    bottom: 12px;
}

.salesCard .salesExtra {
    display: inline-block;
    margin-right: 24px;

}

.salesCard .salesExtra a {
    margin-left: 24px;
    color: rgba(0, 0, 0, 0.88);

}

.salesCard .salesExtra a:hover {
    color: #1890ff;
}

/* .salesCard .salesExtra a.currentDate {
    color: @primary-color;
} */

.rankingList {
    margin: 25px 0 0;
    padding: 0;
    list-style: none;
}

.rankingList li {
    display: flex;
    align-items: center;
    margin-top: 16px;
    zoom: 1;

}

.rankingList li::before,
.rankingList li::after {
    display: table;
    content: ' ';
}

.rankingList li::after {
    clear: both;
    height: 0;
    font-size: 0;
    visibility: hidden;
}

.rankingList li span {
    /* color: @text-color; */
    font-size: 14px;
    line-height: 22px;
}

.rankingList li span:first-child {
    margin-right: 8px;
}

.rankingList li .rankingItemNumber {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-top: 1.5px;
    margin-right: 16px;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 20px;

}

.rankingList li .rankingItemNumber.active {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.85);
}

.rankingList li .rankingItemTitle {
    flex: 1;
    margin-right: 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>