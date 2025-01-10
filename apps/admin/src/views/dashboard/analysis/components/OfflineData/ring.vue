<template>
    <div ref="radialBarRef" :style="`height: ${height}px; width: ${width}px;`"></div>
</template>
<script lang="ts" setup>
// import { RadialBar } from "@antv/g2plot";
import { ref, onMounted, onUnmounted } from "vue";

import { Chart } from "@antv/g2";

const props = defineProps<{ height: number; width: number; percent: number }>()

// console.log(props)

// height={60} width={60} percent={data.cvr} color={['#E8EEF4', '#5FABF4' ]}

const radialBarRef = ref()
const radialBar = ref<Chart>()

function setRadialBar() {

    // nextTick(() => {
    const chart = new Chart({
        container: radialBarRef.value,
        autoFit: true,
        height: props.height,

        paddingLeft: -20,
        paddingTop: -16,
        paddingRight: -20,
        paddingBottom: -20,
    })

    // chart
    //     .facetRect()
    //     .data([{
    //         // name: 'activity3',
    //         percent: props.percent,
    //     }])
    //     // .encode('x', 'name')
    //     .encode('y', 'percent')
    //     .axis(false)

    const data = [
        { type: '男性', percent: props.percent * 100, color: '#5FABF4' },
        // { type: '女性', percent: 43.6, color: '#f0657d' },
    ];

    const facetRect = chart
        .facetRect()
        .data(data)
        .encode('x', 'type')
        .axis(false)
        .legend(false)
        .view()
        .attr('frame', false)
        .coordinate({ type: 'theta', innerRadius: 0.7, outerRadius: 0.9 });

    facetRect
        .interval()
        .encode('y', 100)
        .scale('y', { zero: true })
        .style('fill', '#E8EEF4')
        .tooltip(false)
        .animate(false);

    // color={['#E8EEF4', '#5FABF4' ]}

    facetRect
        .interval()
        .encode('y', 'percent')
        .encode('color', 'color')
        .scale('color', { type: 'identity' })
        .tooltip(false)

    radialBar.value = chart

    chart.render()
    // })

    // const bar = new RadialBar(radialBarRef.value, {
    //     height: props.height,
    //     width: props.width,
    //     data: [
    //         {
    //             name: 'activity3',
    //             percent: props.percent,
    //             // color: '#e90b3a',
    //         },
    //     ],
    //     xField: 'name',
    //     yField: 'percent',
    //     radius: 0.8,
    //     innerRadius: 0.2,
    //     xAxis: false,
    //     theme: 'dark',
    //     barBackground: { style: { fill: 'rgba(0,0,0,0.45)' } },
    //     // barStyle: { lineCap: 'round' },
    //     minBarWidth: 6,
    //     maxBarWidth: 6,
    //     colorField: 'name',
    //     // statistic: {
    //     //     title: false,
    //     //     content: false
    //     // },
    // })

    // bar.render()
}

// watch(() => props.percent, val => {
//     // console.log("ring: ", val, radialBarRef.value)
//     if (val) {
//         nextTick(() => {
//             // console.log(val, radialBarRef.value)
//             setRadialBar()
//         })
//     }
// }, { deep: true, immediate: true })

onMounted(() => {
    radialBarRef.value && setRadialBar()
})

onUnmounted(() => {
    radialBar.value?.destroy()
    radialBarRef.value = null
})

</script>

<style scoped></style>
