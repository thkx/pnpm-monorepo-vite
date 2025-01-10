<template>
	<a-row :gutter="24">
		<a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6" style="margin-bottom: 24px;">
			<ChartCard :bordered="false" title="总销售额" :loading="loading" contentHeight="46px">
				<template #total>
					<Yuan :val="126560" />
				</template>
				<template #action>
					<a-tooltip title="指标说明">
						<InfoCircleOutlined />
					</a-tooltip>
				</template>
				<template #footer>
					<Field label="日销售额" :value="`￥${numeral(12423).format('0,0')}`" />
				</template>
				<template #content>
					<Trend flag="up" style="margin-right: 16px;">
						周同比
						<span class="trendText">12%</span>
					</Trend>
					<Trend flag="down">
						日同比
						<span class="trendText">11%</span>
					</Trend>
				</template>
			</ChartCard>
		</a-col>
		<a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6" style="margin-bottom: 24px;">

			<ChartCard :bordered="false" title="访问量" :loading="loading" :total="`${numeral(8846).format('0,0')}`"
				contentHeight="46px">
				<template #action>
					<a-tooltip title="指标说明">
						<InfoCircleOutlined />
					</a-tooltip>
				</template>
				<template #footer>
					<Field label="日访问量" :value="`${numeral(1234).format('0,0')}`" />
				</template>
				<template #content>
					<div id="Area" ref="areaContainer" style="height: 46px;"></div>
					<!-- <Area
            xField="x"
            yField="y"
            shapeField="smooth"
            height={46}
            axis={false}
            style={{
              fill: 'linear-gradient(-90deg, white 0%, #975FE4 100%)',
              fillOpacity: 0.6,
              width: '100%',
            }}
            padding={-20}
            data={visitData} -->
				</template>
			</ChartCard>
		</a-col>
		<a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6" style="margin-bottom: 24px;">
			<ChartCard :bordered="false" title="支付笔数" :loading="loading" :total="`${numeral(6560).format('0,0')}`"
				contentHeight="46px">
				<template #action>
					<a-tooltip title="指标说明">
						<InfoCircleOutlined />
					</a-tooltip>
				</template>
				<template #footer>
					<Field label="转化率" value="60%" />
				</template>
				<template #content>
					<div id="Column" ref="columnContainer" style="height: 46px;"></div>
					<!-- <Column
            xField="x"
            yField="y"
            padding={-20}
            axis={false}
            height={46}
            data={visitData}
            scale={{ x: { paddingInner: 0.4 } }}
          /> -->
				</template>
			</ChartCard>
		</a-col>
		<a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6" style="margin-bottom: 24px;">
			<ChartCard :loading="loading" :bordered="false" title="运营活动效果" total="78%" contentHeight="46px">
				<template #action>
					<a-tooltip title="指标说明">
						<InfoCircleOutlined />
					</a-tooltip>
				</template>
				<template #footer>
					<div :style="{ whiteSpace: 'nowrap', overflow: 'hidden', }">
						<Trend flag="up" :style="{ marginRight: '16px', }">
							周同比
							<span class="trendText">12%</span>
						</Trend>
						<Trend flag="down">
							日同比
							<span class="trendText">11%</span>
						</Trend>
					</div>
				</template>
				<template #content>
					<a-progress :percent='78' :strokeColor="{ from: '#108ee9', to: '#87d068' }" status="active" />
				</template>

			</ChartCard>
		</a-col>
	</a-row>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import numeral from "numeral";

import { InfoCircleOutlined } from "@ant-design/icons-vue";

// import { Area, Column } from "@antv/g2plot";

import { Chart } from "@antv/g2";

import { DataItem } from "../../data.d";

import ChartCard from "../ChartCard/index.vue";
import Yuan from "../Yuan/index.vue";
import Field from "../Field/index.vue";
import Trend from "../Trend/index.vue";

const props = withDefaults(defineProps<{ visitData: Array<DataItem>, loading: boolean }>(), { loading: false })

const areaContainer = ref()
const columnContainer = ref()

const areaChart = ref<Chart>()
const columnChart = ref<Chart>()

function setArea() {
	const chart = new Chart({
		// container: 'Area',
		container: areaContainer.value,
		height: 46,
		autoFit: true,
		paddingLeft: -20,
		paddingTop: -16,
		paddingRight: -20,
		paddingBottom: -20,
	})

	chart.data(props.visitData);

	chart
		.area()
		.encode('x', 'x')
		.encode('y', 'y')
		.encode('shape', 'smooth')
		.style('fill', 'linear-gradient(-90deg, white 0%, #975FE4 100%)')
		.style('fillOpacity', 0.6)
		.style('width', '100%');
	chart.axis(false);

	chart.render();

	areaChart.value = chart

	// xField="x"
	//         yField="y"
	//         shapeField="smooth"
	//         height={46}
	//         axis={false}
	//         style={{
	//           fill: 'linear-gradient(-90deg, white 0%, #975FE4 100%)',
	//           fillOpacity: 0.6,
	//           width: '100%',
	//         }}
	//         padding={-20}
	//         data={visitData}
	// const areaPlot = new Area('Area', {
	// 	xField: 'x',
	// 	yField: 'y',
	// 	height: 46,
	// 	data: props.visitData,
	// 	padding: [0, -20, -1, -20],
	// 	// appendPadding: -20,
	// 	smooth: true,
	// 	yAxis: {
	// 		// 隐藏 y 轴的辅助线
	// 		grid: {
	// 			line: {
	// 				style: {
	// 					stroke: '#ddd',
	// 					lineDash: [0],
	// 					opacity: 0, // 设置为 0 表示不显示
	// 				},
	// 			},
	// 		},
	// 	},
	// 	areaStyle: () => {
	// 		return {
	// 			stroke: 'l(270) 0:#ffffff 1:#975FE4',
	// 			strokeOpacity: 0,
	// 			fillOpacity: 0.6,
	// 			width: '100%',
	// 			fill: 'l(270) 0:#ffffff 1:#975FE4',
	// 		};
	// 	},
	// 	// l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff
	// })

	// areaPlot.render()
}

function setColumn() {
	const chart = new Chart({
		// container: 'Column',
		container: columnContainer.value,
		height: 46,
		autoFit: true,
		paddingLeft: -20,
		paddingTop: -16,
		paddingRight: -20,
		paddingBottom: -20,
	})

	chart.data(props.visitData);

	chart
		.interval()
		.encode('x', 'x')
		.encode('y', 'y')
		.scale({ x: { paddingInner: 0.4 } })
		.axis(false);
	chart.render();

	columnChart.value = chart
	// xField="x"
	//         yField="y"
	//         padding={-20}
	//         axis={false}
	//         height={46}
	//         data={visitData}
	//         scale={{ x: { paddingInner: 0.4 } }}
	// const columnPlot = new Column('Column', {
	// 	xField: 'x',
	// 	yField: 'y',
	// 	height: 46,
	// 	data: props.visitData,
	// 	// padding: -20,
	// 	padding: [0, -20, -1, -20],
	// 	// appendPadding: -20,
	// 	yAxis: {
	// 		// 隐藏 y 轴的辅助线
	// 		grid: {
	// 			line: {
	// 				style: {
	// 					stroke: '#ddd',
	// 					lineDash: [0],
	// 					opacity: 0, // 设置为 0 表示不显示
	// 				},
	// 			},
	// 		},
	// 	},
	// })

	// columnPlot.render()
}

// watch(() => props.visitData, (data) => {
// 	console.log("IntroduceRow watch")
// 	// console.log(data)
// 	if (data.length > 0) {
// 		nextTick(() => {
// 			// console.log(document.getElementById('Area'))
// 			setArea()
// 			setColumn()
// 		})
// 	}
// })

onMounted(() => {
	// console.log(document.getElementById('Column'), areaContainer.value)
	// console.log("IntroduceRow onMounted")

	areaContainer.value && setArea()
	columnContainer.value && setColumn()
})

onUnmounted(() => {
	console.log('onUnmounted')
	areaChart.value?.destroy()
	columnChart.value?.destroy()

	areaContainer.value = null
	columnContainer.value = null
})

</script>
<style scoped>
.trendText {
	margin-left: 8px;
	color: rgba(0, 0, 0, 0.88);
}
</style>