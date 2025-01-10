<template>
    <ProPageHeader></ProPageHeader>
    <div class="standardList">
        <a-card :bordered="false">
            <a-row>
                <a-col :sm="8" :xs="24">
                    <div class="headerInfo">
                        <span>我的待办</span>
                        <p>8个任务</p>
                        <em />
                    </div>
                </a-col>
                <a-col :sm="8" :xs="24">
                    <div class="headerInfo">
                        <span>本周任务平均处理时间</span>
                        <p>32分钟</p>
                        <em />
                    </div>
                </a-col>
                <a-col :sm="8" :xs="24">
                    <div class="headerInfo">
                        <span>本周完成任务数</span>
                        <p>24个任务</p>
                    </div>
                </a-col>
            </a-row>
        </a-card>

        <a-card class="listCard" :bordered="false" title="基本列表" style="margin-top: 24px;"
            :bodyStyle="{ padding: '0 32px 40px 32px' }">
            <template #extra>
                <div>
                    <a-radio-group v-model:value="value">
                        <a-radio-button value="all">全部</a-radio-button>
                        <a-radio-button value="progress">进行中</a-radio-button>
                        <a-radio-button value="waiting">等待中</a-radio-button>
                    </a-radio-group>

                    <a-input-search class="extraContentSearch" placeholder="请输入" @search="() => ({})" />
                </div>
            </template>

            <a-list size="large" rowKey="id" :loading="loading" :pagination="paginationProps" :data-source="list">
                <template #renderItem="{ item }">
                    <a-list-item>
                        <template #actions>
                            <a key="edit" @click="handleEdit(item)">编辑</a>

                            <a-dropdown @click.prevent>
                                <a>
                                    更多
                                    <DownOutlined />
                                </a>
                                <template #overlay>
                                    <a-menu @click="({ key }: any) => editAndDelete(key, item)">
                                        <a-menu-item key="edit">编辑</a-menu-item>
                                        <a-menu-item key="delete">删除</a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>
                        </template>

                        <a-list-item-meta :description="item.subDescription">
                            <template #title>
                                <a :href="item.href">{{ item.title }}</a>
                            </template>
                            <template #avatar><a-avatar shape="square" size="large" :src="item.avatar" /></template>
                        </a-list-item-meta>

                        <div>
                            <div class="listContentItem">
                                <span>Owner</span>
                                <p>{{ item.owner }}</p>
                            </div>
                            <div class="listContentItem">
                                <span>开始时间</span>
                                <p>{{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm') }}</p>
                            </div>
                            <div class="listContentItem">
                                <a-progress :percent="item.percent" :status="item.status" :stroke-width="6"
                                    style="width: 180px;" />
                            </div>
                        </div>
                    </a-list-item>
                </template>
            </a-list>
        </a-card>

    </div>

    <ProFooterBar>
        <template #right>
            <a-button :loading="loading" @click="handleAdd">
                <PlusOutlined />添加
            </a-button>
        </template>
    </ProFooterBar>

    <a-modal v-model:open="open" :title="title" :width="640">

        <template #footer>
            <template v-if="done">
                <a-button key="back" @click="open = false">取 消</a-button>
                <a-button key="submit" type="primary" :loading="confirmLoading" @click="handleOk">确 定</a-button>
            </template>
        </template>
        <a-form layout="vertical" :model="form" ref="formRef" v-if="done">
            <a-form-item label="任务名称" name="title" :rules="[{ required: true, message: '请输入任务名称' }]">
                <a-input v-model:value="form.title" placeholder="请输入" />
            </a-form-item>
            <a-form-item label="开始时间" name="createdAt" :rules="[{ required: true, message: '请选择开始时间' }]">
                <a-date-picker v-model:value="form.createdAt" format="YYYY-MM-DD HH:mm:ss" show-time placeholder="请选择"
                    style="width: 100%" />
            </a-form-item>
            <a-form-item label="任务负责人" name="owner" :rules="[{ required: true, message: '请选择任务负责人' }]">
                <a-select v-model:value="form.owner" style="width: 100%" placeholder="请选择"
                    :options="[{ label: '付晓晓', value: 'xiao', }, { label: '周毛毛', value: 'mao' }]"></a-select>
            </a-form-item>
            <a-form-item label="产品描述" name="subDescription" :rules="[{ min: 5, message: '请输入至少五个字符的产品描述！' }]">
                <a-textarea v-model:value="form.subDescription" placeholder="请输入至少五个字符" :rows="4" />
            </a-form-item>
        </a-form>

        <a-result v-else status="success" title="操作成功" subTitle="一系列的信息描述，很短同样也可以带标点。" class="formResult">
            <template #extra>
                <a-button type="primary" @click="onDone">
                    知道了
                </a-button>
            </template>
        </a-result>
    </a-modal>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue';
import { DownOutlined, PlusOutlined } from '@ant-design/icons-vue';

import dayjs, { Dayjs } from 'dayjs';

import { Modal, type PaginationProps } from 'ant-design-vue';

import ProFooterBar from '@/components/ProFooterBar';
import ProPageHeader from '@/components/ProPageHeader';

import type { BasicListItemDataType } from './data.d';
import { queryFakeList, addFakeList, updateFakeList, removeFakeList } from './service';

type FormState = {
    value: string,
    loading: boolean,
    list: BasicListItemDataType[],
    paginationProps: PaginationProps,

    open: boolean,
    done: boolean,
    confirmLoading: boolean,
    title: string,
    form: Pick<Partial<BasicListItemDataType>, 'id' | 'title' | 'owner' | 'subDescription'> & { createdAt: string | null | Dayjs },
}

const state = reactive<FormState>({
    value: 'all',
    loading: false,
    list: [],
    paginationProps: {
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 5,
        total: 0,
    },
    open: false,
    done: true,
    confirmLoading: false,
    title: '',
    form: {
        title: undefined,
        createdAt: null,
        owner: undefined,
        subDescription: undefined,
    },
})

const formRef = ref()
const { value, loading, list, paginationProps, open, done, confirmLoading, title, form } = toRefs(state)

// 重置表单
function reset() {
    done.value = true;
    form.value = {
        id: undefined,
        title: undefined,
        createdAt: null,
        owner: undefined,
        subDescription: undefined,
    }

    formRef.value && formRef.value.resetFields()
}

function handleAdd() {
    reset()
    title.value = '任务添加'
    open.value = true
}

function handleEdit(item: BasicListItemDataType) {
    reset()
    title.value = '任务编辑'
    open.value = true

    form.value = item as any
    form.value.createdAt = dayjs(new Date(item.createdAt))
}

async function handleOk() {
    confirmLoading.value = true;
    try {
        const valid = await formRef.value.validate()
        const createdAt = new Date(valid.createdAt!).getTime()

        let err, resp;

        if (form.value.id) {
            [err, resp] = await updateFakeList({ ...form.value, ...valid, createdAt } as BasicListItemDataType)
        } else {
            [err, resp] = await addFakeList({ ...valid, createdAt } as BasicListItemDataType)
        }

        if (!err) {
            list.value = resp?.list!
        }

        done.value = false
        confirmLoading.value = false;

    } catch (error) {
        console.log(error)
        confirmLoading.value = false;
    }

}

function editAndDelete(key: 'edit' | 'delete', item: BasicListItemDataType) {
    if (key === 'edit') {
        handleEdit(item)
    }

    if (key === 'delete') {
        Modal.confirm({
            title: '删除任务',
            content: '确定删除该任务吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                const [err, resp] = await removeFakeList(item.id!)
                if (!err) {
                    list.value = resp?.list!
                }
            },
        });
    }
}

function onDone() {
    open.value = false;
}

async function getData() {
    loading.value = true
    const [err, resp] = await queryFakeList(50)
    if (!err) {
        list.value = resp?.list!
        paginationProps.value.total = list.value.length
    }

    loading.value = false
}

getData()

</script>
<style scoped>
.headerInfo {
    position: relative;
    text-align: center;
}

.headerInfo>span {
    display: inline-block;
    margin-bottom: 4px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 22px;
}

.headerInfo>p {
    margin: 0;
    color: rgba(0, 0, 0, 0.88);
    font-size: 24px;
    line-height: 32px;
}

.headerInfo>em {
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 56px;
    background-color: rgba(5, 5, 5, 0.06);
}

.extraContentSearch {
    width: 272px;
    margin-left: 16px;
}

.listContentItem {
    display: inline-block;
    margin-left: 40px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    vertical-align: middle;
}
</style>