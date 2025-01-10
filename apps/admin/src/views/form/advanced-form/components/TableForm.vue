<template>
    <a-table :columns="columns" :data-source="dataSource" :pagination="false">
        <template #bodyCell="{ column, text, record }">
            <template v-if="['name', 'workId', 'department'].includes(column.dataIndex)">
                <div>
                    <a-input v-if="editableData[record.key]"
                        v-model:value="editableData[`${record.key}`][column.dataIndex as (keyof TableFormDateType)]"
                        style="margin: -5px 0" placeholder="请输入" />
                    <template v-else>
                        {{ text || '-' }}
                    </template>
                </div>
            </template>
            <template v-else-if="column.dataIndex === 'operation'">
                <div class="editable-row-operations">
                    <span v-if="record.editable">
                        <a-space>
                            <a-typography-link @click="save(record.key)">保存</a-typography-link>
                            <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
                                <a>删除</a>
                            </a-popconfirm>

                            <a @click="cancel(record.key)">取消</a>
                        </a-space>
                    </span>
                    <span v-else>
                        <a @click="edit(record.key)">编辑</a>
                    </span>
                </div>
            </template>
        </template>
    </a-table>

    <a-button type="dashed" block style="display: block;margin: 10px 0px;width: 100%;" @click="newMember">
        <template #icon>
            <PlusOutlined />
        </template>
        添加一行数据
    </a-button>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { UnwrapRef } from 'vue';

import { PlusOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

import { TableFormDateType } from '../data.d';

const data = defineModel('data', { required: true, type: Array<TableFormDateType> })

const columns = [
    {
        title: '成员姓名',
        dataIndex: 'name',
        width: '20%',
    },
    {
        title: '工号',
        dataIndex: 'workId',
        width: '20%',
    },
    {
        title: '所属部门',
        dataIndex: 'department',
        width: '40%',
    },
    {
        title: '操作',
        dataIndex: 'operation',
    },
];

// const data: TableFormDateType[] = [
//     {
//         key: '1',
//         workId: '00001',
//         name: 'John Brown',
//         department: 'New York No. 1 Lake Park',
//         editable: false,
//         isNew: false,
//     },
//     {
//         key: '2',
//         workId: '00002',
//         name: 'Jim Green',
//         department: 'London No. 1 Lake Park',
//         editable: false,
//         isNew: false,
//     },
//     {
//         key: '3',
//         workId: '00003',
//         name: 'Joe Black',
//         department: 'Sidney No. 1 Lake Park',
//         editable: false,
//         isNew: false,
//     },
// ];

const dataSource = ref(data);
const editableData: UnwrapRef<Record<string, TableFormDateType>> = reactive({});

const edit = (key: string) => {
    editableData[key] = dataSource.value.find(item => key === item.key) as TableFormDateType;
    editableData[key].editable = true
    editableData[key].isNew = true
};

const save = (key: string) => {
    editableData[key].editable = false
    editableData[key].isNew = false
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    delete editableData[key];
};

const remove = (key: string) => {
    dataSource.value = dataSource.value.filter(item => key !== item.key)
}

const cancel = (key: string) => {
    editableData[key].editable = false
    delete editableData[key];
};

const newMember = () => {
    const newData = dataSource.value.map((item) => ({ ...item })) || [];

    const isNew = newData.find(r => r.isNew)
    if (isNew) {
        message.warn('只能同时编辑一行')
        return
    }

    const item: TableFormDateType = {
        key: `NEW_TEMP_ID_${Date.now()}`,
        workId: '',
        name: '',
        department: '',
        editable: true,
        isNew: true,
    }
    newData.push(item)

    editableData[item.key] = item

    dataSource.value = newData
};


</script>

<style scoped></style>
