<template>
    <ProPageHeader></ProPageHeader>

    <a-card :bordered='false'>
        <a-descriptions title="退款申请" style="margin-bottom: 32px;">
            <a-descriptions-item label="取货单号">1000000000</a-descriptions-item>
            <a-descriptions-item label="状态">已取货</a-descriptions-item>
            <a-descriptions-item label="销售单号">1234123421</a-descriptions-item>
            <a-descriptions-item label="子订单">3214321432</a-descriptions-item>
        </a-descriptions>
        <a-divider style="margin-bottom: 32px;" />
        <a-descriptions title="用户信息" style="margin-bottom: 32px;">
            <a-descriptions-item label="用户姓名">付小小</a-descriptions-item>
            <a-descriptions-item label="联系电话">18100000000</a-descriptions-item>
            <a-descriptions-item label="常用快递">菜鸟仓储</a-descriptions-item>
            <a-descriptions-item label="取货地址">浙江省杭州市西湖区万塘路18号</a-descriptions-item>
            <a-descriptions-item label="备注">无</a-descriptions-item>
        </a-descriptions>
        <a-divider style="margin-bottom: 32px;" />

        <div style="margin-bottom: 16px;color: rgba(0, 0, 0, 0.88);font-weight: 500;font-size: 16px;">退货商品</div>
        <a-table style="margin-bottom: 24px;" :dataSource="goodsData" :columns="goodsColumns" :toolBarRender="false"
            :pagination="false" :loading="loading" :options="false" :search="false" rowKey="id">
            <template #bodyCell="{ record, text }">
                <span :style="`${record.id == '总计' ? 'font-weight: 600;' : ''}`">{{ text }}</span>
            </template>
        </a-table>

        <div style="margin-bottom: 16px;color: rgba(0, 0, 0, 0.88);font-weight: 500;font-size: 16px;">退货进度</div>
        <a-table style="margin-bottom: 16px;" :dataSource="goodsProgress" :columns="progressColumns"
            :toolBarRender="false" :pagination="false" :loading="loading" :options="false" :search="false"
            rowKey="operator">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'status'">
                    <a-badge v-if="record.status === 'success'" status="success" text="成功" />
                    <a-badge v-else status="processing" text="进行中" />
                </template>
            </template>
        </a-table>
    </a-card>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue';

import ProPageHeader from '@/components/ProPageHeader';

import { basic } from './service';
import type { BasicGood, BasicProgress } from './data.d';

const sharedOnCell = (_: any, index: number) => {
    if (index === 4) {
        return { colSpan: 0 };
    }
};

const state = reactive({
    goodsData: [] as BasicGood[],
    goodsColumns: [
        {
            title: '商品编号',
            dataIndex: 'id',
            key: 'id',
            customCell: (_: any, index: number) => ({
                colSpan: index < 4 ? 1 : 4,
            }),
        },
        {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
            customCell: sharedOnCell
        },
        {
            title: '商品条码',
            dataIndex: 'barcode',
            key: 'barcode',
            customCell: sharedOnCell
        },
        {
            title: '单价',
            dataIndex: 'price',
            key: 'price',
            align: 'right' as 'left' | 'right' | 'center',
            customCell: sharedOnCell
        },
        {
            title: '数量（件）',
            dataIndex: 'num',
            key: 'num',
            align: 'right' as 'left' | 'right' | 'center',
        },
        {
            title: '金额',
            dataIndex: 'amount',
            key: 'amount',
            align: 'right' as 'left' | 'right' | 'center',
        },
    ],

    progressColumns: [
        {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '当前进度',
            dataIndex: 'rate',
            key: 'rate',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '操作员ID',
            dataIndex: 'operator',
            key: 'operator',
        },
        {
            title: '耗时',
            dataIndex: 'cost',
            key: 'cost',
        },
    ],
    goodsProgress: [] as BasicProgress[],
    loading: false,
})

const { goodsColumns, goodsData, progressColumns, goodsProgress, loading } = toRefs(state)


async function getGoods() {
    loading.value = true
    const [err, resp] = await basic()
    if (!err) {
        // console.log(resp)
        const { basicGoods, basicProgress } = resp!
        // goodsData.value = basicGoods
        goodsProgress.value = basicProgress

        if (basicGoods.length) {
            let num = 0;
            let amount = 0;
            basicGoods.forEach((item) => {
                num += Number(item.num);
                amount += Number(item.amount);
            });
            goodsData.value = basicGoods.concat({
                id: '总计',
                num,
                amount,
            });
        }
    }

    loading.value = false
}

getGoods()
</script>
<style scoped>

</style>