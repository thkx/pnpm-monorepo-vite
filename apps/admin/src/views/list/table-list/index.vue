<template>
    <ProPageHeader></ProPageHeader>

    <SearchForm :columns="defaultColumns" :loading="loading" @submit="handleSubmit">
        <template #updatedAt="{ form, key }">
            <template v-if="form['status'] == 'default'"></template>
            <template v-else-if="form['status'] == 'error'">
                <a-input v-model:value="form[key]" placeholder="请输入" allowClear></a-input>
            </template>
            <template v-else>
                <a-date-picker v-model:value="form[key]" format="YYYY-MM-DD HH:mm:ss"
                    :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }" style="width: 100%;" />
            </template>
        </template>
    </SearchForm>

    <ProTable headerTitle="查询表格" v-model:columns="columns" :data-source="list" :pagination="pagination"
        :row-selection="rowSelection" v-model:selected-rows="selectedRowsState" :loading="loading"
        @change="handleTableChange" :reload="() => handleSubmit({})">
        <template #headerCell="{ column, title }">
            <template v-if="column.key === 'name'">
                <span>
                    {{ title }}
                    <a-tooltip>
                        <template #title>{{ column.tip }}</template>
                        <QuestionCircleOutlined />
                    </a-tooltip>
                </span>
            </template>
            <template v-else>{{ column.title }}</template>
        </template>

        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
                <a>
                    {{ record.name }}
                </a>
            </template>
            <template v-else-if="column.key === 'status'">
                <template v-for="(col, key) in column.valueEnum" :key="col.status">
                    <a-badge :status="col.status" :text="col.text" v-if="record.status == key" />
                </template>
            </template>
            <template v-else-if="column.key === 'callNo'">
                {{ record.callNo && `${record.callNo}万` }}
            </template>
            <template v-else-if="column.key === 'updatedAt'">
                {{ dayjs(column.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
            </template>
            <template v-else-if="column.key === 'action'">
                <div style="display: flex; align-items: center; justify-content: flex-start; gap: 8px;">
                    <a key="config" @click="handleUpdate(record)">
                        配置
                    </a>
                    <div></div>
                    <a key="subscribeAlert" href="https://procomponents.ant.design/">
                        订阅警报
                    </a>
                </div>

            </template>
        </template>

        <template #toolbar>
            <a-button type="primary" @click="handleAdd">
                <PlusOutlined />新建
            </a-button>
        </template>
    </ProTable>

    <ProFooterBar v-if="selectedRowsState.length > 0">
        <template #left>
            <div>
                已选择
                <a style="font-weight: 600">
                    {{ selectedRowsState.length }}
                </a>
                项 &nbsp;&nbsp;
                <span>
                    服务调用次数总计 {{ selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0) }} 万
                </span>
            </div>
        </template>

        <template #right>
            <a-button @click="handleRemove">批量删除</a-button>
            <a-button type="primary">批量审批</a-button>
        </template>
    </ProFooterBar>


    <CreateModal v-model:open="createModal.open" :ok="handleOk" />
    <UpdateModal v-model:open="updateModal.open" v-model:form="updateModal.form" :ok="handleDone" />
    

</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue';
import dayjs from 'dayjs';

import { message } from 'ant-design-vue';

import ProPageHeader from '@/components/ProPageHeader';
import ProFooterBar from '@/components/ProFooterBar';
import { SearchForm, ProTable, type ProColumnType } from '@/components/ProTable';

import { QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';

import CreateModal from './components/createModal.vue'
import UpdateModal from './components/updateModal.vue'

import type { TableListData, TableListItem, TableListParams } from './data.d'
import { queryRuleList, removeRuleList, addRuleList, updateRuleList } from './service';

const defaultColumns: ProColumnType[] = [
    {
        title: '规则名称',
        dataIndex: 'name',
        key: 'name',
        tip: '规则名称是唯一的 key',
    },
    {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
        valueType: 'textarea',
    },
    {
        title: '服务调用次数',
        dataIndex: 'callNo',
        key: 'callNo',
        sorter: true,
        hideInForm: true,
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        hideInForm: true,
        valueEnum: {
            0: {
                text: '关闭',
                status: 'default',
            },
            1: {
                text: '运行中',
                status: 'processing',
            },
            2: {
                text: '已上线',
                status: 'success',
            },
            3: {
                text: '异常',
                status: 'error',
            },
        },
    },
    {
        title: '上次调度时间',
        sorter: true,
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        valueType: 'dateTime',

    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        valueType: 'option',
    },
];

type StateType = TableListData & {
    loading: boolean,
    params: TableListParams,
    rowSelection: any,
    selectedRowsState: TableListItem[],
    columns: ProColumnType[],
    createModal: {
        open: boolean,
        loading: boolean,
    },
    updateModal: {
        open: boolean,
        form?: {
            name: string,
            desc: string,
            target: string,
            template: string,
            type: string,
            time: string;
            frequency: string;
        },
        loading: boolean,
    },
}

const state = reactive<StateType>({
    loading: false,
    list: [],
    pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
        showTotal: (total: number, range: number[]) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`,
    },
    params: {},
    rowSelection: {
        checkStrictly: false,
        selectedRowKeys: [],
        onChange: handleRowSelectionChange,
        // onSelect: handleRowSelectionSelect,
        // onSelectAll: handleRowSelectionSelectAll
    },
    selectedRowsState: [],
    columns: defaultColumns,
    createModal: {
        open: false,
        loading: false,
    },
    updateModal: {
        open: false,
        form: undefined,
        loading: false,
    },
})

const { loading, list, pagination, params, rowSelection, selectedRowsState, columns, createModal, updateModal } = toRefs(state)


function getParams() {
    const value = { ...params.value, ...pagination.value }
    delete value.showTotal

    return value
}
async function queryList() {
    loading.value = true
    const [err, resp] = await queryRuleList(getParams())
    if (!err) {
        list.value = resp?.data!
        pagination.value.total = resp?.total
    }

    loading.value = false
}


function handleSubmit(values: TableListParams) {
    params.value = values
    queryList()
}

function handleTableChange(page: { pageSize: number; current: number }, filters: any, sorter: any) {
    // console.log(page, filters, sorter)
    pagination.value.current = page.current
    pagination.value.pageSize = page.pageSize

    params.value.currentPage = page.current
    params.value.filter = filters
    params.value.sorter = sorter
    // pagination.value.total = page.pageSize

    queryList()
}

function handleRowSelectionChange(selectedRowKeys: (string | number)[], selectedRows: TableListItem[]) {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    selectedRowsState.value = selectedRows
    rowSelection.value.selectedRowKeys = selectedRowKeys
}

// function handleRowSelectionSelect(record: TableListItem, selected: boolean, selectedRows: TableListItem[]) {
//     console.log("Select：", record, selected, selectedRows);
// }

// function handleRowSelectionSelectAll(selected: boolean, selectedRows: TableListItem[], changeRows: TableListItem[]) {
//     console.log("SelectAll: ", selected, selectedRows, changeRows);
// }

async function handleRemove() {
    const [err, resp] = await removeRuleList(rowSelection.value.selectedRowKeys)
    if (!err && resp) {
        // list.value = resp?.list!
        // pagination.value.total = resp?.total
        queryList()

        rowSelection.value.selectedRowKeys = []
        selectedRowsState.value = []
    }

}

function handleAdd() {
    createModal.value.open = true
}

async function handleOk(valid: { name: string; desc: string; }) {

    const [err, resp] = await addRuleList({ ...valid })
    if (!err) {
        message.success(resp?.message);
        queryList()

        return false
    }
    return true

}

function handleUpdate(data: TableListItem) {
    updateModal.value.form = {
        name: data.name,
        desc: data.desc,
        target: '0',
        template: '0',
        type: '',
        time: '',
        frequency: 'month',
    }
    updateModal.value.open = true
}

async function handleDone(valid: { name: string; desc: string; }) {
    const [err, resp] = await updateRuleList(valid)
    if (!err) {
        message.success(resp?.message)
        queryList()

        return false
    }

    return true
}

queryList()

</script>
<style scoped></style>