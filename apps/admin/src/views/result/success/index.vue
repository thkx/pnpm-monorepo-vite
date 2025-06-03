<template>
    <a-card :bordered="false">
        <a-result status="success" :title="title" :sub-title="sub_title">
            <template #extra>
                <a-button key="console" type="primary">返回列表</a-button>
                <a-button key="buy">出口项目</a-button>
                <a-button key="buy">打 印</a-button>
            </template>

            <a-descriptions title="项目名称">
                <a-descriptions-item label="项目 ID">23421</a-descriptions-item>
                <a-descriptions-item label="负责人">曲丽丽</a-descriptions-item>
                <a-descriptions-item label="生效时间">2016-12-12 ~ 2017-12-12</a-descriptions-item>
            </a-descriptions>

            <br />

            <a-steps :current="current" size="small" label-placement="vertical" :items="items">
                <template #progressDot="{ index, status, prefixCls }">
                    <a-popover>
                        <template #content>
                            <span>step {{ index }} status: {{ status }}</span>
                        </template>
                        <span :class="`${prefixCls}-icon-dot`" />
                    </a-popover>
                </template>
            </a-steps>
        </a-result>
    </a-card>
</template>
<script lang="ts" setup>
import { reactive, toRefs, h } from 'vue'

import { DingdingOutlined } from '@ant-design/icons-vue'

import { usePermission } from '@/store/permission';

const permission = usePermission()

const state = reactive({
    title: '提交成功',
    sub_title: "提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。",
    current: 1,
    items: [
        {
            title: '创建项目',
            description: h('div', [
                h('div', { style: { margin: '8px 0 4px' } }, [
                    h('span', '曲丽丽'),
                    // h(DingdingOutlined, { style: { marginLeft: '8px', color: '#00A0E9' } })
                    h(DingdingOutlined, { style: { marginLeft: '8px', color: permission.themeColor.value } })
                ]),
                h('div', '2016-12-12 12:32')
            ]),
        },
        {
            title: '部门初审',
            description: h('div', { style: { fontSize: 12 } }, [
                h('div', { style: { margin: '8px 0 4px' } }, [
                    h('div', { style: { margin: '8px 0 4px' } }, [
                        h('span', '周毛毛'),
                        h('a', [
                            // h(DingdingOutlined, { style: { marginLeft: '8px', color: '#00A0E9' } }),
                            h(DingdingOutlined, { style: { marginLeft: '8px', color: permission.themeColor.value } }),
                            h('span', '催一下')
                        ])
                    ]),
                ])
            ]),
        },
        {
            title: '财务复核',
        },
        {
            title: '完成',
        },
    ],

})

const { title, sub_title, current, items } = toRefs(state)
</script>
<style scoped></style>