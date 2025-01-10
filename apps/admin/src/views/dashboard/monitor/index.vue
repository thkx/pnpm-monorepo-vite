<template>
    <a-row :gutter="24">
        <a-col :xl="18" :lg="24" :md="24" :sm="24" :xs="24" style="margin-bottom: 24px;">
            <a-card title="活动实时交易情况" :bordered="false">
                <a-row>
                    <a-col :md="6" :sm="12" :xs="24">
                        <a-statistic title="今日交易总额" suffix="元" :value="numeral(124543233).format('0,0')" />
                    </a-col>
                    <a-col :md="6" :sm="12" :xs="24">
                        <a-statistic title="销售目标完成率" value="92%" />
                    </a-col>
                    <a-col :md="6" :sm="12" :xs="24">
                        <a-statistic-countdown title="活动剩余时间" :value="deadline" format="HH:mm:ss:SSS" />
                    </a-col>
                    <a-col :md="6" :sm="12" :xs="24">
                        <a-statistic title="每秒交易总额" suffix="元" :value="numeral(234).format('0,0')" />
                    </a-col>
                </a-row>
                <div class="mapChart">
                    <!-- <Map /> -->
                    <div id="map" style="position: relative;width: 100%;height: 452px;"></div>
                </div>
            </a-card>
        </a-col>
        <a-col :xl="6" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card title="活动情况预测" style="margin-bottom: 24px;" :bordered="false">
                <div class="activeChart">
                    <a-statistic title="目标评估" value="有望达到预期" />
                    <div style="margin-top: 32px;">
                        <!-- <Area padding={[0, 0, 0, 0]} xField="x" axis={false} yField="y" height={84} style={{
                            fill: 'linear-gradient(-90deg, white 0%, #6294FA 100%)' , fillOpacity: 0.6 }}
                            data={activeData} /> -->
                        <div id="Area" ref="areaContainer" style="height: 84px;"></div>
                    </div>
                    <div v-if="activeData.length > 0">
                        <div class="activeChartGrid">
                            <p>{{ [...activeData].sort()[activeData.length - 1]?.y + 200 }} 亿元</p>
                            <p>{{ [...activeData].sort()[Math.floor(activeData.length / 2)]?.y }} 亿元</p>
                        </div>
                        <div class="dashedLine">
                            <div class="line"></div>
                        </div>
                        <div class="dashedLine">
                            <div class="line"></div>
                        </div>
                    </div>

                    <div v-if="activeData.length > 0" class="activeChartLegend">
                        <span>00:00</span>
                        <span>{{ activeData[Math.floor(activeData.length / 2)]?.x }}</span>
                        <span>{{ activeData[activeData.length - 1]?.x }}</span>
                    </div>
                </div>
            </a-card>
            <a-card title="券核效率" style="margin-bottom: 24px;" :bodyStyle="{ textAlign: 'center', }" :bordered="false">
                <!-- <Gauge height={180} data={ { target: 80, total: 100, name: 'score' , thresholds: [20, 40, 60, 80, 100],
                    } as any } padding={-16} style={{ textContent: ()=> '优',
                    }}
                    meta={{
                        color: {
                            range: ['#6395FA', '#62DAAB', '#657798', '#F7C128', '#1F8718'],
                        },
                    }}
                    /> -->
                <div id="Gauge" ref="gaugeContainer" style="height: 180px;"></div>
            </a-card>
        </a-col>
    </a-row>
    <a-row :gutter="24">
        <a-col :xl="12" :lg="24" :sm="24" :xs="24" style="margin-bottom: 24px;">
            <a-card title="各品类占比" :bordered="false">
                <a-row style="padding: 22px 0;">
                    <a-col :span="8">
                        <a-progress type="dashboard" :percent="75" />
                    </a-col>
                    <a-col :span="8">
                        <a-progress type="dashboard" :percent="48" />
                    </a-col>
                    <a-col :span="8">
                        <a-progress type="dashboard" :percent="33" />
                    </a-col>
                </a-row>
            </a-card>
        </a-col>
        <a-col :xl="6" :lg="12" :sm="24" :xs="24" style="margin-bottom: 24px;">
            <a-card title="热门搜索" :bordered="false" :bodyStyle="{ overflow: 'hidden', }">
                <div id="WordCloud" ref="wordCloudContainer" style="height: 162px;"></div>
            </a-card>
        </a-col>
        <a-col :xl="6" :lg="12" :sm="24" :xs="24" style="margin-bottom: 24px;">
            <a-card title="资源剩余" :bodyStyle="{ textAlign: 'center', fontSize: 0, }" :bordered="false">
                <div id="Liquid" ref="liquidContainer"></div>
            </a-card>
        </a-col>
    </a-row>
</template>
<script lang="ts" setup>
import { ref, nextTick, reactive, toRefs, onMounted, onUnmounted } from "vue";

import { HeatmapLayer, PointLayer, Scene, RasterLayer } from "@antv/l7";
import { Mapbox } from "@antv/l7-maps";
// import { Liquid, WordCloud, Gauge, Area } from "@antv/g2plot";

import { Chart } from '@antv/g2';

// import type { TagType } from "./data.d";
import { queryTags } from "./service";

import numeral from "numeral";

function fixedZero(val: number) {
    return val * 1 < 10 ? `0${val}` : val;
}
function getActiveData() {
    const activeData = [];
    for (let i = 0; i < 24; i += 1) {
        activeData.push({
            x: `${fixedZero(i)}:00`,
            y: Math.floor(Math.random() * 200) + i * 50,
        });
    }
    return activeData;
}

type FormState = {
    deadline: number,
    loading: boolean,
    timerRef: number | null,
    requestRef: number | null,
    activeData: { x: string, y: number }[],
    areaPlot?: Chart,
    wordCloudPlot?: Chart,
    gaugePlot?: Chart,
    liquidPlot?: Chart,
}

const state = reactive<FormState>({
    loading: false,
    deadline: Date.now() + 1000 * 60 * 60 * 20 * 2,

    timerRef: null,
    requestRef: null,
    activeData: getActiveData(),
    areaPlot: undefined,
    wordCloudPlot: undefined,
    gaugePlot: undefined,
    liquidPlot: undefined,
})

const { loading, deadline, timerRef, requestRef, activeData, areaPlot, wordCloudPlot, gaugePlot, liquidPlot } = toRefs(state)

const areaContainer = ref()
const gaugeContainer = ref()
const wordCloudContainer = ref()
const liquidContainer = ref()

const loopData = () => {
    requestRef.value = requestAnimationFrame(() => {
        timerRef.value = window.setTimeout(() => {
            activeData.value = getActiveData();
            // console.log(areaPlot?.value)
            // areaPlot?.value?.data(activeData.value)
            areaPlot?.value?.changeData(activeData.value).then(resp => {
                console.log(resp)
            }).catch(err => {
                console.log(err)
            })
            loopData();
        }, 2000);
    });
};

async function getTags() {
    loading.value = true
    const [err, resp] = await queryTags()
    loading.value = false
    if (!err) {
        // console.log(resp?.list)
        const data = resp!.list.map(r => ({ ...r, color: getRandomColor() }))

        function getRandomColor() {
            const arr = [
                '#5B8FF9',
                '#5AD8A6',
                '#5D7092',
                '#F6BD16',
                '#E8684A',
                '#6DC8EC',
                '#9270CA',
                '#FF9D4D',
                '#269A99',
                '#FF99C3',
            ];
            return arr[Math.floor(Math.random() * (arr.length - 1))];
        }

        // console.log(wordCloudContainer.value)

        wordCloudContainer.value && setWordCloud(data)

    }
}

function setWordCloud(data) {
    // nextTick(() => {

    const chart = new Chart({
        // container: 'WordCloud',
        container: wordCloudContainer.value,
        height: 162,
        autoFit: true,
        tooltip: undefined,
    })

    chart.data(data);

    chart
        .wordCloud()
        .layout({ spiral: 'rectangular', fontSize: [10, 20] })
        .encode('color', 'color')
        .encode('text', 'name')
        .encode('fontWeight', 'value')
        .legend(false)
        .tooltip(false);

    chart.render()

    wordCloudPlot.value = chart
    // })

    // <WordCloud
    //             data={wordCloudData}
    //             height={162}
    //             textField="word"
    //             colorField="word"
    //             layout={{ spiral: 'rectangular', fontSize: [10, 20] }}
    //         />

    // nextTick(() => {
    //     const wordCloudPlot = new WordCloud('WordCloud', {
    //         height: 162,
    //         data: data,
    //         wordField: 'name',
    //         weightField: 'value',
    //         colorField: 'color',
    //         wordStyle: {
    //             fontSize: [10, 20],
    //             // fontWeight: 12,
    //         },
    //         spiral: 'rectangular',
    //         tooltip: {
    //             shared: true,
    //             showContent: false,
    //         }
    //     });
    //     wordCloudPlot.render();
    // })
}

function setLiquid() {
    const chart = new Chart({
        // container: 'Liquid',
        container: liquidContainer.value,
        height: 160,
        autoFit: true,
    })

    chart.liquid().data(0.35);
    chart.render();

    liquidPlot.value = chart
}

function setGauge() {
    const chart = new Chart({
        // container: 'Gauge',
        container: gaugeContainer.value,
        height: 180,
        autoFit: true,
        padding: -16,
    })

    chart
        .gauge()
        .data({
            value: {
                target: 80, total: 100, name: 'score', thresholds: [20, 40, 60, 80, 100],
            },
        })
        .scale('color', {
            range: ['#6395FA', '#62DAAB', '#657798', '#F7C128', '#1F8718'],
        })
        .style(
            'textContent',
            () => '优',
        )
        .legend(false);

    chart.render();

    gaugePlot.value = chart
}

function setArea() {
    const chart = new Chart({
        // container: 'Area',
        container: areaContainer.value,
        height: 84,
        padding: 0,
        autoFit: true,
    })

    chart.data(activeData.value);

    chart
        .area()
        .encode('x', 'x')
        .encode('y', 'y')
        .style('fill', 'linear-gradient(-90deg, white 0%, #6294FA 100%)')
        .style('fillOpacity', 0.6);

    chart.axis(false);

    chart.render();

    areaPlot!.value = chart
    // padding={[0, 0, 0, 0]} xField="x" axis={false} yField="y" height={84} style={{
    //                         fill: 'linear-gradient(-90deg, white 0%, #6294FA 100%)' , fillOpacity: 0.6 }}
    //                         data={activeData}
    // const areaPlot1 = new Area('Area', {
    //     padding: [0, 0, -1, 0],
    //     xField: "x",
    //     yField: "y",
    //     height: 84,
    //     data: activeData.value,
    //     smooth: true,
    //     areaStyle: {
    //         fill: 'l(270) 0:#ffffff 1:#6294FA',
    //         // fill: 'linear-gradient(-90deg, white 0%, #6294FA 100%)',
    //         fillOpacity: 0.6
    //     },
    //     xAxis: {
    //         // label: undefined,
    //         // line: null,
    //         line: undefined,
    //         label: null,
    //     },
    //     yAxis: {
    //         // 隐藏 y 轴的辅助线
    //         grid: {
    //             line: {
    //                 style: {
    //                     stroke: '#ddd',
    //                     lineDash: [0],
    //                     opacity: 0, // 设置为 0 表示不显示
    //                 },
    //             },
    //         },
    //     },
    // })
    // // areaPlot.chart.axis(false)

    // areaPlot1.render()

    // areaPlot!.value = areaPlot1
}

function setMap() {
    const scene = new Scene({
        id: 'map',
        // map: new GaodeMap({
        //     style: 'light',
        //     // center: [121.435159, 31.256971],
        //     token: 'fcb5a847892fadf257bc01ac6a692d19',
        //     zoom: 1,
        //     minZoom: 0,
        //     maxZoom: 18,
        // }),
        // map: new Map({
        //     center: [110.19382669582967, 50.258134],
        //     zoom: 2,
        //     minZoom: 0,
        //     maxZoom: 18,
        // }),
        // map: new GaodeMap({
        //     style: 'light',
        //     center: [121.435159, 31.256971],
        //     zoom: 14.89,
        //     minZoom: 10,
        //     token: 'fcb5a847892fadf257bc01ac6a692d19',
        // })
        map: new Mapbox({
            center: [110.19382669582967, 50.258134],
            pitch: 0,
            style: 'blank',
            zoom: 1,
        })

    });


    scene.on('loaded', () => {
        // 添加地图底图
        const layer = new RasterLayer();
        layer.source(
            'https://webrd0{1-3}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
            {
                parser: {
                    type: 'rasterTile',
                    tileSize: 256,
                    minZoom: 2,
                    maxZoom: 18,
                },
            },
        );
        scene.addLayer(layer);

        Promise.all([
            fetch(
                'https://gw.alipayobjects.com/os/bmw-prod/c5dba875-b6ea-4e88-b778-66a862906c93.json',
            ).then((d) => d.json()),
            fetch(
                'https://gw.alipayobjects.com/os/bmw-prod/8990e8b4-c58e-419b-afb9-8ea3daff2dd1.json',
            ).then((d) => d.json()),
        ]).then(resp => {
            const [data, grid] = resp
            // console.log(data, grid)

            const heatmapLayer = new HeatmapLayer({})
                .source(grid, { transforms: [{ type: 'hexagon', size: 800000, field: 'capacity', method: 'sum', }] })
                .color('#ddd')
                .shape('hexagon')
                .style({ coverage: 0.7, opacity: 0.8, })

            //     source={{
            //   data: grid,
            //   transforms: [
            //     {
            //       type: 'hexagon',
            //       size: 800000,
            //       field: 'capacity',
            //       method: 'sum',
            //     },
            //   ],
            // }}
            // color={{
            //   values: '#ddd',
            // }}
            // shape={{
            //   values: 'hexagon',
            // }}
            // style={{
            //   coverage: 0.7,
            //   opacity: 0.8,
            // }}


            const colors = ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594']

            const pointLayer1 = new PointLayer({ autoFit: true })
                .source(data)
                .scale({
                    color: {
                        field: 'cum_conf',
                        type: 'quantile',
                    },
                    size: {
                        field: 'cum_conf',
                        type: 'log',
                    },
                })
                .color('cum_conf', colors)
                .shape('circle')
                .size('cum_conf', [0, 30])
                .active({
                    color: '#0c2c84'
                })
                .style({
                    opacity: 0.8,
                })

            //     options={{
            //   autoFit: true,
            // }}
            // source={{
            //   data,
            // }}
            // scale={{
            //   values: {
            //     color: {
            //       field: 'cum_conf',
            //       type: 'quantile',
            //     },
            //     size: {
            //       field: 'cum_conf',
            //       type: 'log',
            //     },
            //   },
            // }}
            // color={{
            //   field: 'cum_conf',
            //   values: colors,
            // }}
            // shape={{
            //   values: 'circle',
            // }}
            // active={{
            //   option: {
            //     color: '#0c2c84',
            //   },
            // }}
            // size={{
            //   field: 'cum_conf',
            //   values: [0, 30],
            // }}
            // style={{
            //   opacity: 0.8,
            // }}

            const pointLayer2 = new PointLayer({})
                .source(data)
                .color('#fff')
                .shape('Short_Name_ZH', 'text')
                .filter('cum_conf', v => v > 2000)
                .size(12)
                .style({
                    opacity: 1,
                    strokeOpacity: 1,
                    strokeWidth: 0,
                })

            // key="5"
            // source={{
            //   data,
            // }}
            // color={{
            //   values: '#fff',
            // }}
            // shape={{
            //   field: 'Short_Name_ZH',
            //   values: 'text',
            // }}
            // filter={{
            //   field: 'cum_conf',
            //   values: (v) => {
            //     return v > 2000;
            //   },
            // }}
            // size={{
            //   values: 12,
            // }}
            // style={{
            //   opacity: 1,
            //   strokeOpacity: 1,
            //   strokeWidth: 0,
            // }}


            scene.addLayer(heatmapLayer);
            scene.addLayer(pointLayer1);
            scene.addLayer(pointLayer2);
        })
    });

}

// nextTick(() => {
//     loopData()
//     setLiquid()
//     setGauge()
//     setArea()
//     getTags()

//     setMap()
// })

onMounted(() => {
    loopData()
    liquidContainer.value && setLiquid()
    gaugeContainer.value && setGauge()
    areaContainer.value && setArea()
    getTags()

    setMap()
})

onUnmounted(() => {
    clearTimeout(timerRef.value!);
    if (requestRef.value) {
        cancelAnimationFrame(requestRef.value);
    }

    liquidPlot.value?.destroy()
    gaugePlot.value?.destroy()
    areaPlot.value?.destroy()
    wordCloudPlot.value?.destroy()

    liquidContainer.value = null
    gaugeContainer.value = null
    areaContainer.value = null
    wordCloudContainer.value = null
})

</script>
<style scoped>
.mapChart {
    height: 452px;
    padding-top: 24px;
}

.activeChart {
    position: relative;
}

.activeChartGrid p {
    position: absolute;
    top: 80px;
}

.activeChartGrid p:last-child {
    top: 115px;
}

.activeChartLegend {
    position: relative;
    height: 20px;
    margin-top: 8px;
    font-size: 0;
    line-height: 20px;
}

.activeChartLegend span {
    display: inline-block;
    width: 33.33%;
    font-size: 12px;
    text-align: center;
}

.activeChartLegend span:first-child {
    text-align: left;
}

.activeChartLegend span:last-child {
    text-align: right;
}

.dashedLine {
    position: relative;
    top: -70px;
    left: -3px;
    height: 1px;
}

.dashedLine .line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, transparent 50%, #e9e9e9 50%);
    background-size: 6px;
}

/* .dashedLine:last-child {
    top: -36px;
} */
</style>