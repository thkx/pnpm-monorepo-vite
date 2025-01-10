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
            <StandardFormRow title="owner">
                <div style="display: flex;align-items: center;">
                    <a-form-item name="owner" style="display: inline-block;">
                        <a-select v-model:value="formState.owner" :options="options" mode="multiple"
                            style="min-width: 6rem;" placeholder="请选择"></a-select>
                    </a-form-item>
                    <a class="selfTrigger" @click="setOwner">只看自己的</a>
                </div>

            </StandardFormRow>
            <StandardFormRow title="其它选项" style="margin-bottom: 0;border: 0;padding-bottom: 0;">
                <a-row :gutter="16">
                    <a-col :xl="8" :lg="10" :md="12" :sm="24" :xs="24">
                        <a-form-item label="活跃用户" name="user">
                            <a-select placeholder="不限" v-model:value="formState.user"
                                style="max-width: 200px;width: 100%;"
                                :options="[{ label: '李三', value: 'lisa', }]"></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :xl="8" :lg="10" :md="12" :sm="24" :xs="24">
                        <a-form-item label="好评度" name="rate">
                            <a-select placeholder="不限" v-model:value="formState.rate"
                                style="max-width: 200px;width: 100%;"
                                :options="[{ label: '优秀', value: 'good', }]"></a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            </StandardFormRow>
        </a-form>

    </a-card>

    <a-card :bordered="false" style="margin-top: 24px;" :bodyStyle="{ padding: '8px 32px 32px 32px' }">
        <a-list item-layout="vertical" size="default" class="articlesList" rowKey="id" :data-source="data"
            :loading="initLoading">
            <template #loadMore>
                <!-- v-if="!initLoading && !loading" -->
                <div :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
                    <a-button :loading="loading" @click="onLoadMore">加载更多</a-button>
                </div>
            </template>
            <template #renderItem="{ item }">
                <a-list-item :key="item.id" class="">
                    <template #actions>
                        <span>
                            <StarOutlined /> {{ item.star }}
                        </span>
                        <span>
                            <LikeOutlined /> {{ item.like }}
                        </span>
                        <span>
                            <MessageOutlined /> {{ item.message }}
                        </span>
                    </template>

                    <template #extra>
                        <!-- <img width="272" alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" /> -->
                    </template>

                    <a-skeleton avatar :title="false" :loading="!!item.loading" active>
                        <a-list-item-meta>
                            <template #title>
                                <a class="title">{{ item.title }}</a>
                            </template>
                            <!-- <template #avatar><a-avatar :src="item.avatar" /></template> -->
                            <template #description>
                                <span>
                                    <a-tag>Ant Design</a-tag>
                                    <a-tag>设计语言</a-tag>
                                    <a-tag>蚂蚁金服</a-tag>
                                </span>
                            </template>
                        </a-list-item-meta>

                        <ArticleListContent v-bind="item" />
                    </a-skeleton>

                </a-list-item>
            </template>
        </a-list>
    </a-card>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, nextTick } from 'vue'
import { useRouter } from 'vue-router'

import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue'

import ProPageHeader from '@/components/ProPageHeader';

import StandardFormRow from './components/StandardFormRow/index.vue'
import TagSelect from './components/TagSelect/index.vue'
import ArticleListContent from './components/ArticleListContent/index.vue'

import type { ListItemDataType } from './data.d';
import { fakeListDetail } from './service'

const router = useRouter()

const categoryOptions = Array.from({ length: 12 }).map((_, index) => ({
    key: `cat${index + 1}`,
    value: false,
    label: `类目${index + 1}`,
}));

const owners = [
    {
        id: 'wzj',
        name: '我自己',
    },
    {
        id: 'wjh',
        name: '吴家豪',
    },
    {
        id: 'zxx',
        name: '周星星',
    },
    {
        id: 'zly',
        name: '赵丽颖',
    },
    {
        id: 'ym',
        name: '姚明',
    },
];

const tagsData = ref(categoryOptions)

const state = reactive({
    value: '',
    activeKey: 'articles',
    options: owners.map(item => ({ label: item.name, value: item.id })),
    data: [] as ListItemDataType[],
    list: [] as ListItemDataType[],
    initLoading: true,
    loading: false,
    count: 5,
})

const formState = reactive({
    tagsData,
    owner: ['wjh', 'zly'],
    user: '',
    rate: '',
})

const { value, activeKey, options, data, list, initLoading, loading, count } = toRefs(state)


const handleFormSubmit = (value: string) => {
    console.log(value);
};

function tabChange(activeKey: string) {
    // console.log(activeKey)
    router.push('/list/search/' + activeKey)
}

function setOwner() {
    formState.owner = ['wzj']
}

async function getList() {
    loading.value = true;
    initLoading.value = true;
    list.value = data.value.concat(
        [...new Array(count)].map(() => ({ loading: true, } as ListItemDataType)),
    );
    const [err, resp] = await fakeListDetail({ count: count.value })

    if (!err) {
        const newData = data.value.concat(resp!);
        data.value = newData
        list.value = newData
    }
    initLoading.value = false;
    loading.value = false;

    nextTick(() => {
        window.dispatchEvent(new Event('resize'));
    })
}

function onLoadMore() {
    getList()
}

getList()

</script>
<style scoped>
.tabs {
    margin-block-start: -12px;
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    margin-block-end: 16px;
}

.content {
    text-align: center;
}

.selfTrigger {
    margin-left: 12px;
}

.ant-form-item {
    margin-bottom: 0px !important;
}
</style>