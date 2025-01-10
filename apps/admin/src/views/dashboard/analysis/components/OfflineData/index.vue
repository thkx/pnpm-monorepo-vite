<template>
    <a-card :loading="loading" class="offlineCard" :bordered="false" style="margin-top: 32px;">
        <a-tabs v-model:activeKey="activeKey" @change="handleTabChange">
            <a-tab-pane v-for="shop in offlineData" :key="shop.name">
                <template #tab>
                    <a-row :gutter="8" style="width: 138px; margin: 8px 0;">
                        <a-col :span="12">
                            <NumberInfo :title="shop.name" subTitle="转化率" gap='2px' :total="`${shop.cvr * 100}%`"
                                :theme="activeKey !== shop.name ? 'light' : undefined" />
                        </a-col>
                        <a-col :span="12" style="padding-top: 36px;">
                            <!-- <Tiny.Ring height={60} width={60} percent={data.cvr} color={['#E8EEF4', '#5FABF4' ]} /> -->
                            <Ring :height="60" :width="60" :percent="shop.cvr || 0"></Ring>
                            <!-- <a-progress type="circle" :percent="shop.cvr * 100" :size="60" /> -->
                        </a-col>
                    </a-row>
                </template>
            </a-tab-pane>
        </a-tabs>

        <div style="padding: 0 24px;">
            <!-- <Line height={400} data={offlineChartData} xField="date" yField="value" colorField="type" slider={{ x:
                    true }} axis={{ x: { title: false }, y: { title: false, gridLineDash: null, gridStroke: '#ccc' ,
                    gridStrokeOpacity: 1 }, }} legend={{ color: { layout: { justifyContent: 'center' }, }, }} /> -->

            <div id="containerLine" ref="lineContainer"></div>
        </div>
    </a-card>

</template>

<script lang="ts" setup>
import { Line } from "@antv/g2plot";
import NumberInfo from "../NumberInfo/index.vue";
import Ring from "./ring.vue";
import { ref, onMounted, onUnmounted } from "vue";

type OfflineDataProps = {
    loading: boolean;
    offlineData: any[];
    offlineChartData: any[];
    handleTabChange: (activeKey: string) => void;
}

const activeKey = defineModel('activeKey', { required: true, type: String })

const props = withDefaults(defineProps<OfflineDataProps>(), { loading: false })

const containerLine = ref<Line>()
const lineContainer = ref()

function setLine() {
    const line = new Line(
        // 'containerLine', 
        lineContainer.value,
        {
            height: 400,
            // smooth: true,
            data: props.offlineChartData,
            padding: 'auto',
            xField: 'date',
            yField: 'value',
            seriesField: 'type',
            // colorField: "type",
            xAxis: {
                tickCount: 5,
            },
            slider: {
                start: 0,
                end: 1,
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
        }
    );

    containerLine.value = line

    line.render();
}

// watch(() => props.offlineChartData, val => {
//     if (val.length > 0) {
//         nextTick(() => {
//             if (containerLine.value) {
//                 containerLine.value.changeData(props.offlineChartData)
//                 return
//             }
//             setLine()
//         })
//     }
// })

onMounted(() => {
    lineContainer.value && setLine()
})

onUnmounted(() => {
    containerLine.value?.destroy()
    lineContainer.value = null
})

</script>

<style scoped></style>