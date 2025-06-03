<template>
    <ProPageHeader title="单号：234231029431">
        <template #extra>
            <a-button-group>
                <a-button key="3">操作一</a-button>
                <a-button key="2">操作二</a-button>
                <a-dropdown placement="bottomRight">
                    <a-button>
                        <EllipsisOutlined />
                    </a-button>

                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="1">
                                <a href="javascript:;">选项一</a>
                            </a-menu-item>
                            <a-menu-item key="2">
                                <a href="javascript:;">选项二</a>
                            </a-menu-item>
                            <a-menu-item key="3">
                                <a href="javascript:;">选项三</a>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </a-button-group>

            <a-button key="1" type="primary">主操作</a-button>
        </template>
        <template #footer>
            <a-tabs class="tabs">
                <a-tab-pane key="1" tab="详情" />
                <a-tab-pane key="2" tab="规则" />
            </a-tabs>
        </template>
        <div class="content">
            <div class="main">
                <a-descriptions size="small" :column="2">
                    <a-descriptions-item label="创建人">曲丽丽</a-descriptions-item>
                    <a-descriptions-item label="订购产品">XX 服务</a-descriptions-item>
                    <a-descriptions-item label="创建时间">2017-07-07</a-descriptions-item>
                    <a-descriptions-item label="关联单据">
                        <a href="">12421</a>
                    </a-descriptions-item>
                    <a-descriptions-item label="生效日期">2017-07-07 ~ 2017-08-08</a-descriptions-item>
                    <a-descriptions-item label="备注">请于两个工作日内确认</a-descriptions-item>
                </a-descriptions>
            </div>
            <div class="extra">
                <div :style="{ display: 'flex', width: 'max-content', justifyContent: 'flex-end' }">
                    <a-statistic title="状态" value="待审批" :style="{ marginRight: '32px' }" />
                    <a-statistic title="订单金额" prefix="¥" :value="568.08" />
                </div>
            </div>
        </div>
    </ProPageHeader>

    <a-card title="流程进度" style="margin-bottom: 24px;">
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
    </a-card>

    <a-card title="用户信息" style="margin-bottom: 24px;" :bordered="false">
        <a-descriptions style="margin-bottom: 24px;">
            <a-descriptions-item label="用户姓名">付小小</a-descriptions-item>
            <a-descriptions-item label="会员卡号">32943898021309809423</a-descriptions-item>
            <a-descriptions-item label="身份证">3321944288191034921</a-descriptions-item>
            <a-descriptions-item label="联系方式">18112345678</a-descriptions-item>
            <a-descriptions-item label="联系地址">
                曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口
            </a-descriptions-item>
        </a-descriptions>
        <a-descriptions style="margin-bottom: 24px;" title="信息组">
            <a-descriptions-item label="某某数据">725</a-descriptions-item>
            <a-descriptions-item label="该数据更新时间">2017-08-08</a-descriptions-item>
            <a-descriptions-item>
                <template #label>
                    <span>
                        某某数据
                        <a-tooltip title="数据说明">
                            <InfoCircleOutlined style="color: rgba(0, 0, 0, 0.43); margin-left: 4px;" />
                        </a-tooltip>
                    </span>
                </template>
                725
            </a-descriptions-item>
            <a-descriptions-item label="该数据更新时间">2017-08-08</a-descriptions-item>
        </a-descriptions>
        <h4 style="margin-bottom: 16px;">
            信息组
        </h4>
        <a-card type="inner" title="多层级信息组">
            <a-descriptions style="margin-bottom: 16px;" title="组名称">
                <a-descriptions-item label="负责人">林东东</a-descriptions-item>
                <a-descriptions-item label="角色码">1234567</a-descriptions-item>
                <a-descriptions-item label="所属部门">XX公司 - YY部</a-descriptions-item>
                <a-descriptions-item label="过期时间">2017-08-08</a-descriptions-item>
                <a-descriptions-item label="描述">
                    这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...
                </a-descriptions-item>
            </a-descriptions>
            <a-divider style="margin: 16px 0;" />
            <a-descriptions style="margin-bottom: 16px;" title="组名称" :column="1">
                <a-descriptions-item label="学名">
                    Citrullus lanatus (Thunb.) Matsum. et
                    Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..
                </a-descriptions-item>
            </a-descriptions>
            <a-divider style="margin: 16px 0;" />
            <a-descriptions title="组名称">
                <a-descriptions-item label="负责人">付小小</a-descriptions-item>
                <a-descriptions-item label="角色码">1234568</a-descriptions-item>
            </a-descriptions>
        </a-card>
    </a-card>
    <a-card title="用户近半年来电记录" style="margin-bottom: 24px;" :bordered="false">
        <a-empty />
    </a-card>
    <a-card :bordered="false" :tabList="operationTabList" @tabChange="onOperationTabChange">
        <a-table style="margin-bottom: 16px;" :dataSource="dataSource" :columns="columns" :toolBarRender="false"
            :pagination="false" :loading="loading" :options="false" :search="false" rowKey="operator">
            <template #bodyCell="{ column, text }">
                <template v-if="column.key === 'status'">
                    <a-badge v-if="text === 'agree'" status="success" text="成功" />
                    <a-badge v-else status="processing" text="驳回" />
                </template>
            </template>
        </a-table>
    </a-card>
</template>
<script lang="ts" setup>
import { reactive, toRefs, h } from 'vue'
import { EllipsisOutlined, DingdingOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';

import ProPageHeader from '@/components/ProPageHeader';

import { usePermission } from '@/store/permission';

import { advanced } from './service';
import type { AdvancedProfileData, AdvancedOperation } from './data.d';

const permission = usePermission()

const columns = [
    {
        title: '操作类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '操作人',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '执行结果',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '操作时间',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
    },
    {
        title: '备注',
        dataIndex: 'memo',
        key: 'memo',
    },
];

const operationTabList = [
    {
        key: 'advancedOperation1',
        tab: '操作日志一',
    },
    {
        key: 'advancedOperation2',
        tab: '操作日志二',
    },
    {
        key: 'advancedOperation3',
        tab: '操作日志三',
    },
];

const state = reactive({
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
    loading: false,
    dataSource: [] as AdvancedOperation[],
    contentList: {} as AdvancedProfileData,
})

const { current, items, loading, dataSource, contentList } = toRefs(state)

async function getList() {
    loading.value = true
    const [err, resp] = await advanced()
    if (!err && resp) {
        contentList.value = {
            advancedOperation1: resp.advancedOperation1 || [],
            advancedOperation2: resp.advancedOperation2 || [],
            advancedOperation3: resp.advancedOperation3 || [],
        }
        dataSource.value = contentList.value['advancedOperation1']!
    }
    loading.value = false
}

const onOperationTabChange = (key: 'advancedOperation1' | 'advancedOperation2' | 'advancedOperation3') => {
    dataSource.value = contentList.value[key]!
};

getList()
</script>
<style scoped>
.tabs {
    margin-block-start: -12px;
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    margin-block-end: 16px;
}

.content {
    display: flex;
    width: 100%;
}

.content .main {
    flex: auto;
    width: 100%;
}

.content .extra {
    flex: 0 1 auto;
    min-width: 242px;
    margin-inline-start: 88px;
    text-align: end;
}
</style>