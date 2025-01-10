<template>
    <a-card :loading="loading" :bordered="false" title="线上热门搜索" style="height: 100%;">
        <template #extra>
            <slot name="dropdownGroup"></slot>
        </template>
        <a-row :gutter="68">
            <a-col :sm="12" :xs="24" style="margin-bottom: 24px;">
                <!-- gap="8px" :total="numeral(12321).format('0,0')" status="up" :sub-total="17.1" -->
                <NumberInfo>
                    <template #subTitle>
                        <span>
                            搜索用户数
                            <a-tooltip title="指标说明">
                                <InfoCircleOutlined style="margin-left: 8px;" />
                            </a-tooltip>
                        </span>
                    </template>
                </NumberInfo>

                <div id="area1" ref="areaContainer1"></div>

                <!-- 
                <Area xField="x" yField="y" shapeField="smooth" height={45} axis={false} padding={-12} style={{
                    fill: 'linear-gradient(-90deg, white 0%, #6294FA 100%)' , fillOpacity: 0.4 }} data={visitData2} /> -->
            </a-col>
            <a-col :sm="12" :xs="24" style="margin-bottom: 24px;">
                <!-- gap="8px" total="2.7" status="down" :sub-total="26.2" -->
                <NumberInfo>
                    <template #subTitle>
                        <span>
                            人均搜索次数
                            <a-tooltip title="指标说明">
                                <InfoCircleOutlined style="margin-left: 8px;" />
                            </a-tooltip>
                        </span>
                    </template>
                </NumberInfo>
                <div id="area2" ref="areaContainer2"></div>
                <!-- 
                    <Area xField="x" yField="y" shapeField="smooth" height={45} padding={-12} style={{
                        fill: 'linear-gradient(-90deg, white 0%, #6294FA 100%)' , fillOpacity: 0.4 }} data={visitData2}
                        axis={false} /> -->

            </a-col>
        </a-row>

        <a-table :columns="columns" row-key="index" :data-source="searchData" size="small"
            :pagination="{ pageSize: 5, }">
            <template #bodyCell="{ record, column, text }">
                <template v-if="column.dataIndex === 'keyword'"><a href="/"> {{ text }} </a></template>

                <template v-if="column.dataIndex === 'range'">
                    <Trend :flag="`${record.status === 1 ? 'down' : 'up'}`">
                        <span style="margin-right: 4px;">
                            {{ text }} %
                        </span>
                    </Trend>
                </template>


            </template>
        </a-table>
        <!-- <Table<any>
            rowKey={(record) => record.index}
            size="small"
            columns={columns}
            dataSource={searchData}
            pagination={{
                style: {
                    marginBottom: 0,
                },
                pageSize: 5,
            }}
            /> -->
    </a-card>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
// import numeral from "numeral";

import { Area } from "@antv/g2plot";

import { InfoCircleOutlined } from "@ant-design/icons-vue";

import NumberInfo from "../NumberInfo/index.vue";
import Trend from "../Trend/index.vue";

import { DataItem } from "../../data.d";

const props = withDefaults(defineProps<{ loading: boolean, visitData2: DataItem[], searchData: DataItem[] }>(), { loading: false })

const columns = [
    {
        title: '排名',
        dataIndex: 'index',
        key: 'index',
    },
    {
        title: '搜索关键词',
        dataIndex: 'keyword',
        key: 'keyword',
    },
    {
        title: '用户数',
        dataIndex: 'count',
        key: 'count',
        sorter: (
            a: {
                count: number;
            },
            b: {
                count: number;
            },
        ) => a.count - b.count,
    },
    {
        title: '周涨幅',
        dataIndex: 'range',
        key: 'range',
        sorter: (
            a: {
                range: number;
            },
            b: {
                range: number;
            },
        ) => a.range - b.range,
    },
];

const areaRef1 = ref<Area>()
const areaRef2 = ref<Area>()

const areaContainer1 = ref()
const areaContainer2 = ref()

function setArea1() {
    const areaPlot = new Area(
        // 'area1',
        areaContainer1.value,
        {
            xField: 'x',
            yField: 'y',
            data: props.visitData2,
            // padding: -12,
            appendPadding: [1, 0, 0, 0],
            padding: [0, -12, -1, -12],
            height: 45,
            smooth: true,
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
            areaStyle: () => {
                return {
                    // stroke: 'l(270) 0:#ffffff 1:#975FE4',
                    // strokeOpacity: 0,
                    fillOpacity: 0.4,
                    // width: '100%',
                    fill: 'l(270) 0:#ffffff 1:#6294FA',
                };
            },
            // xField="x" yField="y" shapeField="smooth" height={45} axis={false} padding={-12} style={{
            // fill: 'linear-gradient(-90deg, white 0%, #6294FA 100%)' , fillOpacity: 0.4 }} data={visitData2}
        }
    )

    areaRef1.value = areaPlot

    areaPlot.render()
}

function setArea2() {
    const areaPlot = new Area(
        // 'area2',
        areaContainer2.value,
        {
            xField: 'x',
            yField: 'y',
            data: props.visitData2,
            // padding: -12,
            appendPadding: [1, 0, 0, 0],
            padding: [0, -12, -1, -12],
            height: 45,
            smooth: true,
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
            areaStyle: () => {
                return {
                    // stroke: 'l(270) 0:#ffffff 1:#975FE4',
                    // strokeOpacity: 0,
                    fillOpacity: 0.4,
                    // width: '100%',
                    fill: 'l(270) 0:#ffffff 1:#6294FA',
                };
            },
            // areaStyle: {
            //     // fill:
            //     fillOpacity: 0.4,
            // }
            // xField="x" yField="y" shapeField="smooth" height={45} padding={-12} style={{
            //                 fill: 'linear-gradient(-90deg, white 0%, #6294FA 100%)' , fillOpacity: 0.4 }} data={visitData2}
            //                 axis={false}
        }
    )

    areaRef2.value = areaPlot

    areaPlot.render()
}

// watch(() => props.visitData2, val => {
//     // console.log("visitData2: ", val)
//     if (val.length > 0) {
//         nextTick(() => {
//             setArea1()
//             setArea2()
//         })
//     }
// })

onMounted(() => {
    areaContainer1.value && setArea1()
    areaContainer2.value && setArea2()
})

onUnmounted(() => {
    areaRef1.value?.destroy()
    areaContainer1.value = null
    areaRef2.value?.destroy()
    areaContainer2.value = null
})

</script>

<style scoped></style>