<template>
    <ProPageHeader>
        <a-row class="content">
            <div class="page-header-content">
                <p>
                    段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
                    提供跨越设计与开发的体验解决方案。
                </p>
                <!-- <div class="content-link">
                    <a>
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />
                        快速开始
                    </a>
                    <a>
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />
                        产品简介
                    </a>
                    <a>
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />
                        产品文档
                    </a>
                </div> -->

                <div class="content-link svg-list">
                    <a>
                        <Start :fill="permission.themeColor.value" class="svg"></Start>
                        快速开始
                    </a>
                    <a>
                        <Profile :fill="permission.themeColor.value" class="svg"></Profile>
                        产品简介
                    </a>
                    <a>
                        <Document :fill="permission.themeColor.value" class="svg"></Document>
                        产品文档
                    </a>
                </div>
            </div>
            <div class="extra-img">
                <img alt="这是一个标题" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" />
            </div>
        </a-row>
    </ProPageHeader>

    <div class="cardList">
        <a-list :loading="loading" item-layout="hoverable"
            :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }" :data-source="[{}, ...data]">
            <template #renderItem="{ item }">
                <a-list-item :key="item.id" style="padding-inline: 0;">

                    <a-button type="dashed" class="newButton" v-if="!item.id">
                        <PlusOutlined /> 新增产品
                    </a-button>

                    <a-card hoverable class="card" v-else>

                        <template #actions>
                            <a key="option1">操作一</a>
                            <a key="option2">操作二</a>
                        </template>

                        <a-card-meta>
                            <template #title>
                                <a>{{ item.title }}</a>
                            </template>
                            <template #avatar>
                                <img alt="" class="cardAvatar" :src="item.avatar" />
                            </template>

                            <template #description>
                                <a-typography-paragraph :ellipsis="{ rows: 3, }" :content="item.description" />
                            </template>
                        </a-card-meta>
                    </a-card>
                </a-list-item>

            </template>

        </a-list>
    </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';

import ProPageHeader from '@/components/ProPageHeader';

import { usePermission } from '@/store/permission';

import { Start, Profile, Document } from './components';

import { queryCardFakeList } from './service';
import { CardListItemDataType } from './data.d';

const permission = usePermission()

const state = reactive<{ loading: boolean, data: CardListItemDataType[] }>({
    loading: false,
    data: []
})

const { loading, data } = toRefs(state)

async function getData() {
    loading.value = true
    const [err, resp] = await queryCardFakeList(8)
    if (!err) {
        // console.log(resp?.list)
        data.value = resp?.list || []
    }

    loading.value = false
}

getData()
</script>
<style scoped>
p {
    margin-top: 0;
    margin-bottom: 1em;
}

.content .extra-img {
    width: 155px;
    margin-top: -20px;
    text-align: center;
}

.content .extra-img img {
    width: 100%;
}

.content .page-header-content {
    flex: 1;
}

.content .content-link a {
    margin-right: 32px;
}

.content .content-link img {
    margin-right: 8px;
    vertical-align: middle;
    margin-top: -3px;
    width: 24px;
}

.content .svg-list {
    display: flex;
    justify-items: center;
}

.content .svg-list a {
    display: flex;
    margin-right: 36px;
}

.content .svg-list a .svg {
    margin-right: 12px;
}

.cardAvatar {
    width: 48px;
    height: 48px;
    border-radius: 48px;
}

.newButton {
    width: 100%;
    height: 201px;
    color: rgba(0, 0, 0, 0.65);
    background-color: #ffffff;
    border-color: #d9d9d9;
}
</style>