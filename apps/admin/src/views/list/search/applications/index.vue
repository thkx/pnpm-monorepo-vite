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

    <a-list class="applicationsList" item-layout="hoverable"
        :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }" :data-source="data" :loading="loading">
        
        <template #renderItem="{ item }">
            <a-list-item>
                <a-card hoverable :bodyStyle="{ paddingBottom: 20 }">
                    <template #actions>
                        <a-tooltip key="download" title="下载">
                            <DownloadOutlined />
                        </a-tooltip>
                        <a-tooltip title="编辑" key="edit">
                            <EditOutlined />
                        </a-tooltip>
                        <a-tooltip title="分享" key="share">
                            <ShareAltOutlined />
                        </a-tooltip>
                        <a-dropdown>
                            <EllipsisOutlined />
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item>
                                        <a href="javascript:;">1st menu item</a>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a href="javascript:;">2nd menu item</a>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a href="javascript:;">3rd menu item</a>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </template>

                    <a-card-meta :title="item.title" description="">
                        <template #avatar>
                            <a-avatar size="small" :src="item.avatar" />
                        </template>
                    </a-card-meta>

                    <div class="cardInfo">
                        <div>
                            <p>活跃用户</p>
                            <p>{{ item.activeUser }}</p>
                        </div>
                        <div>
                            <p>新增用户</p>
                            <p>{{ item.newUser }}</p>
                        </div>
                    </div>
                </a-card>
            </a-list-item>
        </template>
    </a-list>

</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import { DownloadOutlined, EditOutlined, ShareAltOutlined, EllipsisOutlined } from '@ant-design/icons-vue'

import StandardFormRow from './components/StandardFormRow/index.vue'
import TagSelect from './components/TagSelect/index.vue'

import type { ListItemDataType } from './data.d';
import { queryFakeList } from './service';

const router = useRouter()

const categoryOptions = Array.from({ length: 12 }).map((_, index) => ({
    key: `cat${index + 1}`,
    value: false,
    label: `类目${index + 1}`,
}));

const state = reactive({
    value: '',
    activeKey: 'applications',
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
    const [err, resp] = await queryFakeList({ count: 8 })
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
.applicationsList {
    margin-block-start: 16px;
}

.applicationsList .ant-list-item {
    padding-inline: 0;
}

.applicationsList .ant-card-meta-content {
    margin-top: 0;
}

.applicationsList .ant-card-meta-avatar {
    font-size: 0;
}

.applicationsList .ant-list .ant-list-item-content-single {
    max-width: 100%;
}

.applicationsList .cardInfo {
    margin-top: 16px;
    margin-left: 40px;
    zoom: 1;
}

.applicationsList .cardInfo::before,
.applicationsList .cardInfo::after {
    display: table;
    content: ' ';
}

.applicationsList .cardInfo::after {
    clear: both;
    height: 0;
    font-size: 0;
    visibility: hidden;
}

.applicationsList .cardInfo>div {
    position: relative;
    float: left;
    width: 50%;
    text-align: left;
}

.applicationsList .cardInfo>div p {
    margin: 0;
    font-size: 24px;
    line-height: 32px;
}

.applicationsList .cardInfo>div p:first-child {
    margin-bottom: 4px;
    font-size: 12px;
    line-height: 20px;
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