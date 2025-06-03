<template>
    <ProPageHeader>
        <div style="display: flex;">
            <div class='pageHeaderContent'>
                <div class='avatar'>
                    <a-avatar size="large" :src="currentUser.avatar" />
                </div>
                <div class='content'>
                    <div class='contentTitle'>
                        早安，
                        {{ currentUser.name }}
                        ，祝你开心每一天！
                    </div>
                    <div>
                        {{ currentUser.title }} |{{ currentUser.group }}
                    </div>
                </div>
            </div>

            <div class='extraContent'>
                <div class='statItem'>
                    <a-statistic title="项目数" value="56" :valueStyle="{ textAlign: 'end' }" />
                </div>
                <div class='statItem'>
                    <a-statistic title="团队内排名" value='8' suffix="/ 24" :valueStyle="{ textAlign: 'end' }" />
                </div>
                <div class='statItem'>
                    <a-statistic title="项目访问" value='2223' :valueStyle="{ textAlign: 'end' }" />
                </div>
            </div>
        </div>

    </ProPageHeader>

    <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card class="projectList" style="margin-bottom:  24px;" title="进行中的项目" :bordered="false"
                :loading="projectLoading" :bodyStyle="{ padding: 0, }">
                <template #extra>
                    <!-- <a-link to="/">全部项目</a-link> -->
                    <a href="/">全部项目</a>
                </template>
                <a-card-grid v-for="item in projectNotice" class="projectGrid" :key="item.id">
                    <a-card :bodyStyle="{ padding: 0 }" :bordered="false" style="box-shadow: none;">
                        <a-card-meta :description="item.description" style="width: 100%;">
                            <template #title>
                                <div class="cardTitle">
                                    <a-avatar size="small" :src="item.logo" />
                                    <!-- <a-link :to="item.href || '/'">{{ item.title }}</a-link> -->
                                    <a :href="item.href || '/'">{{ item.title }}</a>
                                </div>
                            </template>
                        </a-card-meta>
                        <div class="projectItemContent">
                            <a :href="item.memberLink || '/'">{{ item.member || '' }}</a>

                            <span v-if="item.updatedAt" class="datetime" :title="item.updatedAt">
                                {{ dayjs(item.updatedAt).locale("zh-cn").fromNow() }}
                                <!-- {{ item.updatedAt }} -->
                            </span>
                        </div>
                    </a-card>
                </a-card-grid>

            </a-card>
            <a-card :bodyStyle="{ padding: 0, }" :bordered="false" class="activea-card" title="动态"
                :loading="activitiesLoading">
                <a-list :data-source="activities" size="large" :loading="activitiesLoading" class="activitiesList">
                    <template #renderItem="{ item }">
                        <a-list-item>

                            <a-list-item-meta>
                                <template #title>
                                    <span>
                                        <a class="username">{{ item.user.name }}</a>
                                        &nbsp;
                                        <span class="event" v-html="item.template"></span>
                                    </span>
                                </template>
                                <template #avatar>
                                    <a-avatar :src="item.user.avatar" />
                                </template>
                                <template #description>
                                    <span class="datetime" :title="item.updatedAt">
                                        {{ dayjs(item.updatedAt).locale("zh-cn").fromNow() }}
                                    </span>
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </template>
                </a-list>
            </a-card>
        </a-col>
        <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card style="margin-bottom: 24px;" title="快速开始 / 便捷导航" :bordered="false" :bodyStyle="{ padding: 0 }">
                <div style="padding: 20px 0 8px 24px;font-size: 0;">
                    <a-button size="small" type="primary" ghost>
                        <PlusOutlined /> 添加
                    </a-button>
                </div>
            </a-card>
            <a-card style="margin-bottom: 24px;" :bordered="false" title="XX 指数"
                :loading="data?.radarData?.length === 0">
                <div id="radar" ref="radarContainer">
                    <!-- <Radar :height="343" :data="data?.radarData || []" xField="label" colorField="name" yField="value"
                        shapeField="smooth" :area="{ style: { fillOpacity: 0.4, }, }" :axis="{
                            y: {
                                gridStrokeOpacity:
                                    0.5,
                            },
                        }" :legend="{
                            color: { position: 'bottom', layout: { justifyContent: 'center' }, },
                        }" /> -->
                </div>
            </a-card>
            <a-card :bodyStyle="{ paddingTop: 12, paddingBottom: 12, }" :bordered="false" title="团队"
                :loading="projectLoading">
                <div class="members">
                    <a-row :gutter="48">

                        <a-col v-for="item in projectNotice" :span="12" :key="`members-item-${item.id}`">
                            <a>
                                <a-avatar :src="item.logo" size="small" />
                                <span class="member">{{ item.member.substring(0, 3) }}</span>
                            </a>
                        </a-col>
                    </a-row>
                </div>
            </a-card>
        </a-col>
    </a-row>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, onUnmounted } from 'vue'

import { PlusOutlined } from '@ant-design/icons-vue'

// import { Radar } from '@antv/g2plot'
import { Chart } from '@antv/g2';

// console.log(Radar)

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn.js'

dayjs.extend(relativeTime);

import ProPageHeader from '@/components/ProPageHeader'

import type { AnalysisData, ActivitiesType, NoticeType } from './data.d';
import { fakeChartData, queryActivities, queryProjectNotice } from './service';

type FormState = {
    currentUser: any;
    projectNotice: NoticeType[];
    projectLoading: boolean;

    activities: ActivitiesType[],
    activitiesLoading: boolean;

    data: AnalysisData;
}

const state = reactive<FormState>({
    currentUser: {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        name: '吴彦祖',
        userid: '00000001',
        email: 'antdesign@alipay.com',
        signature: '海纳百川，有容乃大',
        title: '交互专家',
        group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    },
    projectLoading: false,
    projectNotice: [],

    activities: [],
    activitiesLoading: false,

    data: {} as AnalysisData
})

const { currentUser, projectLoading, projectNotice, activitiesLoading, activities, data } = toRefs(state)

const radarContainer = ref()
const chartRef = ref<Chart>()

async function getProjectNotice() {
    projectLoading.value = true
    projectNotice.value = []
    const [err, resp] = await queryProjectNotice()
    if (!err) {
        projectNotice.value = resp!
    }
    projectLoading.value = false
}

async function getActivities() {
    activitiesLoading.value = true
    activities.value = []
    const [err, resp] = await queryActivities()
    if (!err) {
        activities.value = Array.from(resp!).map(item => {
            item.template = item.template.split(/@\{([^{}]*)\}/gi).map(key => {

                if (item[key as keyof ActivitiesType]) {
                    const value = item[key as 'user'];
                    return `<a href=${value?.link} key=${value?.name}>${value.name}</a>`;
                }
                return key
            }).join('')

            return item
        })
    }
    activitiesLoading.value = false
}

async function getChartData() {
    const [err, resp] = await fakeChartData()
    if (!err) {
        data.value = resp!

        // console.log(data.value?.radarData)

        // const radarPlot = new Radar('radar', {
        //     height: 343,
        //     data: data.value?.radarData || [],
        //     autoFit: true,
        //     xField: "label",
        //     // colorField: "name",
        //     yField: "value",
        //     seriesField: 'name',
        //     // shapeField: "smooth",
        //     appendPadding: 10,
        //     area: { style: { fillOpacity: 0.4, } },
        //     // meta: {
        //     //     score: {
        //     //         // alias: '分数',
        //     //         min: 0,
        //     //         max: 100,
        //     //     },
        //     // },
        //     // axis: {
        //     //     y: {
        //     //         gridStrokeOpacity:
        //     //             0.5,
        //     //     },
        //     // },

        //     smooth: true,
        //     yAxis: {

        //     },
        //     // point: {
        //     //     shape: 'circle',
        //     // },
        //     // 开启辅助点
        //     point: {
        //         size: 2,
        //     },
        //     legend: {
        //         position: 'bottom',
        //         // layout: { justifyContent: 'center' },
        //         color: { position: 'bottom', layout: { justifyContent: 'center' }, },
        //     },
        // })

        // radarPlot.render()


        const chart = new Chart({
            // container: 'radar',
            container: radarContainer.value,
            autoFit: true,
            height: 343,
            legend: {
                color: { position: 'bottom', layout: { justifyContent: 'center' }, },
            }
        });

        chart.coordinate({ type: 'polar' });

        chart
            .data(data.value.radarData)
            .scale('x', { padding: 0.5, align: 0 })
            .scale('y', { tickCount: 5 })
            .axis('x', { grid: true })
            .axis('y', { zIndex: 1, title: false });

        chart
            .area()
            .encode('x', 'label')
            .encode('y', 'value')
            .encode('color', 'name')
            .encode('shape', 'smooth')
            .style('fillOpacity', 0.4)
            .scale('y', { domainMax: 10 });

        chart
            .line()
            .encode('x', 'label')
            .encode('y', 'value')
            .encode('color', 'name')
            .encode('shape', 'smooth')
            .style('lineWidth', 2);

        chart.interaction('tooltip', { crosshairsLineDash: [4, 4] });

        chart.render();

        chartRef.value = chart

    }
}

onMounted(() => {
    getChartData()
    getProjectNotice()
    getActivities()
})

onUnmounted(() => {
    chartRef.value?.destroy()
    radarContainer.value = null
})

</script>

<style>
.projectList .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.65);
    line-height: 22px;
}
</style>

<style scoped>
.pageHeaderContent {
    display: flex;
    flex: 1;
}

.pageHeaderContent .avatar {
    flex: 0 1 72px;
}

.pageHeaderContent .avatar>span {
    display: block;
    width: 72px;
    height: 72px;
    border-radius: 72px;
}

.pageHeaderContent .content {
    position: relative;
    top: 4px;
    flex: 1 1 auto;
    margin-left: 24px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 22px;

}

.pageHeaderContent .contentTitle {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
}


.extraContent {
    float: right;
    white-space: nowrap;
    zoom: 1;
}

.extraContent::before,
.extraContent::after {
    display: table;
    content: ' ';
}

.extraContent::after {
    clear: both;
    height: 0;
    font-size: 0;
    visibility: hidden;
}

.extraContent .statItem {
    position: relative;
    display: inline-block;
    padding: 0 32px;
}

.extraContent .statItem>p:first-child {
    margin-bottom: 4px;
    /* color: rgba(0, 0, 0, 0.65); */
    /* font-size: @font-size-base; */
    line-height: 22px;
}

.extraContent .statItem>p {
    margin: 0;
    /* color: @heading-color; */
    font-size: 30px;
    line-height: 38px;
}

.extraContent .statItem>p>span {
    /* color: rgba(0, 0, 0, 0.65); */
    font-size: 20px;
}

.extraContent .statItem::after {
    position: absolute;
    top: 8px;
    right: 0;
    width: 1px;
    height: 40px;
    background-color: rgba(5, 5, 5, 0.06);
    content: '';
}

.extraContent .statItem:last-child {
    padding-right: 0;
}

.extraContent .statItem:last-child::after {
    display: none;
}

.projectList .cardTitle {
    font-size: 0;

}

.projectList .cardTitle a {
    display: inline-block;
    height: 24px;
    margin-left: 12px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 24px;
    vertical-align: top;

}

.projectList .cardTitle a:hover {
    color: var(--color-customization);
}

.projectList .projectGrid {
    width: 33.33%;
}

.projectList .projectItemContent {
    display: flex;
    height: 20px;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    gap: 8px;
    line-height: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;

}

.projectList .projectItemContent a {
    display: inline-block;
    flex: 1 1 0;
    color: rgba(0, 0, 0, 0.65);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;

}

.projectList .projectItemContent a:hover {
    color: var(--color-customization);
}

.datetime {
    flex: 0 0 auto;
    float: right;
    color: rgba(0, 0, 0, 0.25);
}

.member {
    margin-left: 12px;
    font-size: 14px;
    line-height: 24px;
    vertical-align: top;
}

.members a {
    display: block;
    height: 24px;
    margin: 12px 0;
    color: rgba(0, 0, 0, 0.88);
    transition: all 0.3s;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
}

.members .member {
    margin-left: 12px;
    font-size: 14px;
    line-height: 24px;
    vertical-align: top;
}

.members a:hover {
    color: var(--color-customization);
}
</style>