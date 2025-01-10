<template>
    <a-card :loading="loading" :bordered="false" title="销售额类别占比" style="height: 100%;" class="salesCard">
        <template #extra>
            <div class="salesCardExtra">
                <slot name="dropdownGroup"></slot>
                <div class="salesTypeRadio">
                    <a-radio-group v-model:value="salesType" @change="handleChangeSalesType">
                        <a-radio-button value="all">全部渠道</a-radio-button>
                        <a-radio-button value="online">线上</a-radio-button>
                        <a-radio-button value="stores">门店</a-radio-button>
                    </a-radio-group>
                </div>
            </div>
        </template>

        <div>
            <a-typography-text>销售额</a-typography-text>
            <!-- <Pie height={340} radius={0.8} innerRadius={0.5} angleField="y" colorField="x" data={salesPieData as any}
                legend={false} label={{ position: 'spider' , text: (item: { x: number; y: number })=> {
                return `${item.x}: ${numeral(item.y).format('0,0')}`;
                },
                }}
                /> -->
            <div id="proportionSalesPie" ref="proportionSalesPieContainer"></div>
        </div>
    </a-card>

</template>

<script lang="ts" setup>

import { Pie } from "@antv/g2plot";
import { onMounted, onUnmounted, ref, watch } from "vue";
import numeral from "numeral";

import { DataItem } from '../../data.d'

const props = withDefaults(defineProps<{ loading: boolean, handleChangeSalesType: Function, salesPieData: DataItem[] }>(), { loading: false })

const salesType = defineModel('salesType', { required: true })

const proportionSalesPie = ref<Pie>()
const proportionSalesPieContainer = ref()

function setPie() {
    const piePlot = new Pie(
        // 'proportionSalesPie',
        proportionSalesPieContainer.value,
        {
            height: 340,
            data: props.salesPieData,
            radius: 0.8,
            innerRadius: 0.6,
            angleField: 'y',
            colorField: 'x',
            legend: false,
            // label: {
            //     // position: 'middle',
            // }

            // label: {
            //     // content: (d: { type: any; value: any; }) => `${d.type}\n ${d.value}`,
            //     position: 'top',
            // },

            label: {
                type: 'spider',
                labelHeight: 28,
                content: (d) => `${d.x}: ${numeral(d.y).format('0,0')}`,
            },
            statistic: {
                title: false,
                content: false
            },
        }
    )

    proportionSalesPie.value = piePlot
    piePlot.render()
}

watch(() => props.salesPieData, val => {
    // console.log(val)
    if (val.length > 0) {

        if (proportionSalesPie.value) {
            proportionSalesPie.value.changeData(props.salesPieData)
            return
        }
        // nextTick(() => {
        //     setPie()
        // })
    }
})

onMounted(() => {
    proportionSalesPieContainer.value && setPie()
})

onUnmounted(() => {
    proportionSalesPie.value?.destroy()
    proportionSalesPieContainer.value = null
})

</script>

<style scoped>
.salesTypeRadio {
    position: absolute;
    right: 54px;
    bottom: 12px;
}
</style>
