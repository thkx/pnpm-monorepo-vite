<template>
    <ProPageHeader>
        <template #footer>
            <a-tabs class="tabs" v-model:activeKey="activeKey" @change="tabChange">
                <a-tab-pane key="articles" tab="文章" />
                <a-tab-pane key="projects" tab="项目" />
                <a-tab-pane key="applications" tab="应用" />
            </a-tabs>
        </template>
        <div class="content">
            <a-input-search v-model:value="value" placeholder="请输入" enter-button="搜 索" size="large"
                style="max-width: 522px; width: 100%;" @search="handleFormSubmit" />
        </div>
    </ProPageHeader>

    <a-card :bordered="false">

        <a-form :model="formState">
            <StandardFormRow title="所属类目">
                <a-form-item name="tagsData">
                    <TagSelect v-model:value="formState.tagsData" expandable></TagSelect>
                </a-form-item>
            </StandardFormRow>

            <StandardFormRow title="其它选项" style="margin-bottom: 0;border: 0;padding-bottom: 0;">
                <a-row :gutter="16">
                    <a-col :xl="8" :lg="10" :md="12" :sm="24" :xs="24">
                        <a-form-item label="作者" name="user">
                            <a-select placeholder="不限" v-model:value="formState.user"
                                style="max-width: 200px;width: 100%;"
                                :options="[{ label: '王昭君', value: 'lisa', }]"></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :xl="8" :lg="10" :md="12" :sm="24" :xs="24">
                        <a-form-item label="好评度" name="rate">
                            <a-select placeholder="不限" v-model:value="formState.rate"
                                style="max-width: 200px;width: 100%;"
                                :options="[{ label: '优秀', value: 'good' }, { label: '普通', value: 'normal' }]"></a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            </StandardFormRow>
        </a-form>
    </a-card>

    <a-list item-layout="horizontal" class="projectsList" rowKey="id"
        :grid="{  gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }" :data-source="data">
        <template #renderItem="{ item }">
            <a-list-item>

                <a-card class="card" hoverable>
                    <template #cover>
                        <img :alt="item.title" :src="item.cover" />
                    </template>

                    <a-card-meta :title="h('a', item.title)" :description="item.subDescription">
                    </a-card-meta>

                    <div class="cardItemContent">
                        <span>{{ dayjs(item.updatedAt).locale("zh-cn").fromNow() }}</span>
                        <div class="avatarList">
                            <div style="display: inline-block;">
                                <a-avatar-group>
                                    <template v-for="member in item.members" :key='`${item.id}-avatar-${member.id}`'>
                                        <a-tooltip :title="member.name" placement="top">
                                            <a-avatar size="small" :src="member.avatar" />
                                        </a-tooltip>
                                    </template>
                                </a-avatar-group>
                            </div>
                        </div>
                    </div>

                </a-card>
            </a-list-item>
        </template>
    </a-list>

</template>
<script lang="ts" setup>
import { reactive, toRefs, h } from 'vue'
import { useRouter } from 'vue-router'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn.js'

dayjs.extend(relativeTime);

import StandardFormRow from './components/StandardFormRow/index.vue'
import TagSelect from './components/TagSelect/index.vue'

import type { ListItemDataType } from './data.d';
import { fakeListDetail } from './service';

const router = useRouter()

const categoryOptions = Array.from({ length: 12 }).map((_, index) => ({
    key: `cat${index + 1}`,
    value: false,
    label: `类目${index + 1}`,
}));

const state = reactive({
    value: '',
    activeKey: 'projects',
    data: [] as ListItemDataType[],

    formState: {
        tagsData: categoryOptions,
        user: '',
        rate: '',
    },
    loading: false,
})

const { value, activeKey, data, formState, loading } = toRefs(state)

async function getList() {
    loading.value = true
    const [err, resp] = await fakeListDetail({ count: 8 })
    if (!err) {
        data.value = resp!
    }

    loading.value = false
}

const handleFormSubmit = (value: string) => {
    console.log(value);
};

function tabChange(activeKey: string) {
    // console.log(activeKey)
    router.push('/list/search/' + activeKey)
}

getList()

</script>

<style>
.projectsList {
    margin-block-start: 16px;
}

.projectsList .ant-list-item {
    padding-inline: 0;
}

.projectsList .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
}

.projectsList .cardItemContent {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;
}

.projectsList .cardItemContent>span {
    flex: 1;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
}

.projectsList .cardItemContent .avatarList {
    flex: 0 1 auto;
}

.projectsList .card .ant-card-meta-title>a {
    display: inline-block;
    max-width: 100%;
    color: rgba(0, 0, 0, 0.88);
}

.projectsList .card:hover .ant-card-meta-title>a {
    color: #1890ff;
}
</style>

<style scoped>
.tabs {
    margin-block-start: -12px;
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    margin-block-end: 16px;
}

.content {
    text-align: center;
}

.ant-form-item {
    margin-bottom: 0px !important;
}
</style>